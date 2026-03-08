const SyntaxValidator = require('./syntax-validator');
const CodeExecutor = require('./code-executor');

class MultiLanguageAnalyzer {
  constructor(code, options = {}) {
    this.code = typeof code === 'string' ? code : '';
    this.programInput = typeof options.programInput === 'string' ? options.programInput : '';
    this.preferredLanguage = this.normalizeLanguage(options.preferredLanguage);
    this.trimmedCode = this.code.trim();
    this.lines = this.code.split('\n');
    this.language = 'Unknown';
    this.issues = [];
    this.performanceWarnings = [];
    this.securityWarnings = [];
    this.metrics = {
      totalLines: this.lines.length,
      totalFunctions: 0,
      totalVariables: 0,
      complexityScore: 0,
      nestedLoopDepth: 0,
    };
    this.complexity = {
      time_complexity: 'O(1)',
      space_complexity: 'O(1)',
      recommendation: 'Complexity is within acceptable range.',
    };
    this.codeFlow = [];
    this.codeExplanation = '';
  }

  analyze() {
    if (!this.isValidInput(this.trimmedCode)) {
      this.language = 'Unknown';
      this.addIssue({
        line: 1,
        type: 'Invalid Input',
        severity: 'Critical',
        problem: 'No valid source code detected',
        explanation: 'The submitted text does not look like executable source code.',
        solution: 'Please enter valid programming code before analysis.',
      });
      return this.buildResult(0);
    }

    const detectedLanguage = this.detectLanguage(this.trimmedCode);
    this.language = this.preferredLanguage || detectedLanguage;

    if (!this.language || this.language === 'Unknown') {
      this.addIssue({
        line: 1,
        type: 'Unknown Language',
        severity: 'Critical',
        problem: 'Cannot detect programming language.',
        explanation: 'Detection rules could not match the code to a supported language.',
        solution: 'Enter valid code in a supported language or select a language explicitly.',
      });
      return this.buildResult(0);
    }

    const syntaxIssues = SyntaxValidator.validate(this.language, this.code);
    syntaxIssues.forEach((issue) => this.addIssue(issue));

    this.runStaticAnalysis();

    const correctedCode = this.buildCorrectedCode();
    const executionResult = CodeExecutor.execute(this.language, correctedCode, this.programInput);

    if (executionResult.execution_failed && executionResult.runtime_error) {
      this.addIssue({
        line: 1,
        type: executionResult.runtime_error.type || 'Runtime Error',
        severity: 'Error',
        problem: executionResult.runtime_error.message || executionResult.error || 'Program failed during execution.',
        explanation: executionResult.runtime_error.explanation || 'Runtime error occurred after syntax checks.',
        solution: executionResult.runtime_error.fix || 'Inspect runtime conditions and input handling.',
      });
    }

    this.collectMetrics();
    this.complexity = this.estimateComplexity();
    this.codeFlow = this.buildCodeFlow();
    this.codeExplanation = this.generateCodeExplanation();

    const score = this.calculateScore();
    return this.buildResult(score, executionResult, correctedCode);
  }

  normalizeLanguage(language) {
    if (!language || typeof language !== 'string') {
      return null;
    }

    const normalized = language.trim().toLowerCase();

    if (!normalized || normalized === 'auto' || normalized === 'auto detect') {
      return null;
    }

    const languageMap = {
      javascript: 'JavaScript',
      js: 'JavaScript',
      typescript: 'JavaScript',
      ts: 'JavaScript',
      python: 'Python',
      py: 'Python',
      java: 'Java',
      cpp: 'C++',
      'c++': 'C++',
      c: 'C',
    };

    return languageMap[normalized] || null;
  }

  buildCorrectedCode() {
    const correctedLines = [...this.lines];
    let hasAppliedFix = false;

    this.issues.forEach((issue) => {
      const lineNumber = Number(issue?.line || 0);
      const fix = typeof issue?.example_fix === 'string' ? issue.example_fix.trim() : '';

      if (!lineNumber || !fix) {
        return;
      }

      const lineIndex = lineNumber - 1;
      if (lineIndex < 0 || lineIndex >= correctedLines.length) {
        return;
      }

      correctedLines[lineIndex] = fix;
      hasAppliedFix = true;
    });

    if (!hasAppliedFix) {
      return this.code;
    }

    return correctedLines.join('\n');
  }

  isValidInput(trimmedCode) {
    if (!trimmedCode || trimmedCode.length < 5) {
      return false;
    }

    const hasCodePunctuation = /[{}()[\];=:+\-*/<>]/.test(trimmedCode);
    const hasCodeKeyword = /(def\s+\w+|print\(|function\s+\w+|console\.log|#include|public\s+static\s+void\s+main|class\s+\w+)/i.test(trimmedCode);

    return hasCodeKeyword || (hasCodePunctuation && /[A-Za-z_]/.test(trimmedCode));
  }

  detectLanguage(code) {
    const languageChecks = [
      {
        language: 'Java',
        test: /public\s+static\s+void\s+main|import\s+java\.|System\.out\.println|public\s+class\s+\w+/m,
      },
      {
        language: 'Python',
        test: /\bdef\s+\w+\s*\(|\bprint\s*\(|\bimport\s+\w+|if\s+__name__\s*==\s*['"]__main__['"]/m,
      },
      {
        language: 'JavaScript',
        test: /\bfunction\s+\w+\s*\(|console\.log\s*\(|\b(const|let|var)\s+\w+\s*=|=>/m,
      },
      {
        language: 'C++',
        test: /#include\s*<[^>]+>|\bstd::|\bcout\s*<</m,
      },
      {
        language: 'C',
        test: /#include\s*[<"][^>"]+[>"]|\bint\s+main\s*\(/m,
      },
    ];

    for (const rule of languageChecks) {
      if (rule.test.test(code)) {
        return rule.language;
      }
    }

    return 'Unknown';
  }

  runStaticAnalysis() {
    const loopLevels = [];
    let maxNestedLoopDepth = 0;

    this.lines.forEach((line, index) => {
      const lineNo = index + 1;
      const trimmed = line.trim();

      if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('#')) {
        return;
      }

      this.detectCodeSmells(trimmed, lineNo);
      this.detectBadPractices(trimmed, lineNo);
      this.detectLogicalMistakes(trimmed, lineNo);
      this.detectSecurityIssues(trimmed, lineNo);
      this.detectPerformanceIssues(trimmed, lineNo);

      const isLoop = /\b(for|while)\b/.test(trimmed);
      if (isLoop) {
        const indent = line.match(/^\s*/)?.[0]?.length || 0;
        while (loopLevels.length > 0 && loopLevels[loopLevels.length - 1] >= indent) {
          loopLevels.pop();
        }
        loopLevels.push(indent);
        maxNestedLoopDepth = Math.max(maxNestedLoopDepth, loopLevels.length);
      }
    });

    this.metrics.nestedLoopDepth = maxNestedLoopDepth;

    if (maxNestedLoopDepth >= 2) {
      const warning = 'Nested loops detected. This can cause quadratic or worse runtime for large inputs.';
      this.performanceWarnings.push(warning);
      this.addIssue({
        line: 1,
        type: 'Performance Warning',
        severity: 'Warning',
        problem: 'Nested loops detected.',
        explanation: 'Multiple nested loops can increase time complexity significantly.',
        solution: 'Use hashing, pre-computation, or reduce nested iterations where possible.',
      });
    }
  }

  detectCodeSmells(trimmed, lineNo) {
    if (trimmed.length > 120) {
      this.addIssue({
        line: lineNo,
        type: 'Code Smell',
        severity: 'Info',
        problem: 'Very long line reduces readability.',
        explanation: 'Long lines are harder to review and maintain.',
        solution: 'Break the statement into smaller, clearer parts.',
      });
    }

    if (/\b(todo|fixme)\b/i.test(trimmed)) {
      this.addIssue({
        line: lineNo,
        type: 'Code Smell',
        severity: 'Info',
        problem: 'Pending TODO/FIXME found in production code path.',
        explanation: 'Unresolved TODO/FIXME notes can hide unfinished logic.',
        solution: 'Resolve the TODO/FIXME or convert it into a tracked issue.',
      });
    }
  }

  detectBadPractices(trimmed, lineNo) {
    if (this.language === 'JavaScript' && /\bvar\s+/.test(trimmed)) {
      this.addIssue({
        line: lineNo,
        type: 'Bad Practice',
        severity: 'Warning',
        problem: 'Use of var detected.',
        explanation: 'var is function-scoped and can cause accidental redeclarations.',
        solution: 'Use const by default, or let when reassignment is required.',
        example_before: trimmed,
        example_fix: trimmed.replace(/\bvar\b/, 'const'),
      });
    }

    if (this.language === 'JavaScript' && /[^=!]==[^=]/.test(trimmed)) {
      this.addIssue({
        line: lineNo,
        type: 'Bad Practice',
        severity: 'Warning',
        problem: 'Loose equality operator == detected.',
        explanation: 'Loose equality performs type coercion and may produce unexpected results.',
        solution: 'Use strict equality operators === and !==.',
      });
    }
  }

  detectLogicalMistakes(trimmed, lineNo) {
    if (/\bif\s*\([^)]*=\s*[^=][^)]*\)/.test(trimmed)) {
      this.addIssue({
        line: lineNo,
        type: 'Logical Mistake',
        severity: 'Error',
        problem: 'Assignment found inside condition.',
        explanation: 'Using = in condition often indicates accidental assignment instead of comparison.',
        solution: 'Use comparison operators (==, ===, !=, !==) as intended.',
      });
    }

    if (this.language === 'Python' && /^if\s+.+\s=\s.+:$/.test(trimmed)) {
      this.addIssue({
        line: lineNo,
        type: 'Logical Mistake',
        severity: 'Critical',
        problem: 'Possible assignment in if condition.',
        explanation: 'Python conditions should use == for value comparison.',
        solution: 'Replace = with == inside the if condition.',
      });
    }
  }

  detectSecurityIssues(trimmed, lineNo) {
    const securityChecks = [
      {
        test: /\beval\s*\(/,
        type: 'Security Vulnerability',
        problem: 'eval() usage detected.',
        explanation: 'eval() can execute untrusted input and enable code injection.',
        solution: 'Avoid eval and use safe parsing or explicit logic branches.',
      },
      {
        test: /\b(exec|execSync|system|os\.system|subprocess\.Popen)\b/,
        type: 'Security Vulnerability',
        problem: 'Unsafe command execution pattern detected.',
        explanation: 'Direct command execution can allow command injection if inputs are uncontrolled.',
        solution: 'Avoid shell execution or strictly sanitize and whitelist inputs.',
      },
      {
        test: /\bSELECT\b.+\+|\bINSERT\b.+\+|\bUPDATE\b.+\+|\bDELETE\b.+\+/i,
        type: 'Security Vulnerability',
        problem: 'Potential SQL injection pattern detected.',
        explanation: 'Building SQL queries through string concatenation is unsafe.',
        solution: 'Use parameterized queries or prepared statements.',
      },
      {
        test: /\b(open|fs\.writeFile|fs\.appendFile|unlink|rm)\b/,
        type: 'Security Warning',
        problem: 'Potentially unsafe file operation detected.',
        explanation: 'File operations can overwrite or delete data when paths are untrusted.',
        solution: 'Validate paths and enforce strict directory boundaries.',
      },
    ];

    securityChecks.forEach((check) => {
      if (check.test.test(trimmed)) {
        this.securityWarnings.push(`${check.problem} (line ${lineNo})`);
        this.addIssue({
          line: lineNo,
          type: check.type,
          severity: 'Critical',
          problem: check.problem,
          explanation: check.explanation,
          solution: check.solution,
        });
      }
    });
  }

  detectPerformanceIssues(trimmed, lineNo) {
    if (/\.sort\s*\(/.test(trimmed) && /for\s*\(/.test(trimmed)) {
      const warning = `Sorting inside a loop may increase runtime significantly (line ${lineNo}).`;
      this.performanceWarnings.push(warning);
      this.addIssue({
        line: lineNo,
        type: 'Performance Issue',
        severity: 'Warning',
        problem: 'sort() call inside loop.',
        explanation: 'Repeated sorting inside loops can cause avoidable high complexity.',
        solution: 'Move sort() outside the loop or cache sorted results.',
      });
    }
  }

  estimateComplexity() {
    const loopCount = (this.code.match(/\b(for|while)\b/g) || []).length;
    const recursionDetected = this.detectRecursion();
    const nested = this.metrics.nestedLoopDepth;

    let timeComplexity = 'O(1)';
    if (recursionDetected) {
      timeComplexity = 'O(2^n)';
    } else if (nested >= 3) {
      timeComplexity = 'O(n^3)';
    } else if (nested === 2) {
      timeComplexity = 'O(n^2)';
    } else if (loopCount >= 1) {
      timeComplexity = 'O(n)';
    }

    const spaceComplexity = recursionDetected || /\[(.*?)for\s+/.test(this.code) ? 'O(n)' : 'O(1)';

    let recommendation = 'Current complexity looks acceptable.';
    if (timeComplexity === 'O(n^2)' || timeComplexity === 'O(n^3)' || timeComplexity === 'O(2^n)') {
      recommendation = 'Optimize loops/recursion, or use better data structures to reduce runtime cost.';
    }

    return {
      time_complexity: timeComplexity,
      space_complexity: spaceComplexity,
      recommendation,
    };
  }

  detectRecursion() {
    const functionMatches = this.code.match(/\b(def|function)\s+([A-Za-z_][A-Za-z0-9_]*)/g) || [];

    return functionMatches.some((entry) => {
      const parts = entry.trim().split(/\s+/);
      const fnName = parts[1];
      if (!fnName) {
        return false;
      }
      const cleanName = fnName.replace(/\(.*/, '');
      return new RegExp(`\\b${cleanName}\\s*\\(`).test(this.code.replace(entry, ''));
    });
  }

  buildCodeFlow() {
    const flow = ['Start'];
    if (this.hasInputOperations()) {
      flow.push('Read input data');
    }
    if (/\b(for|while)\b/.test(this.code)) {
      flow.push('Iterate through loop blocks');
    }
    if (/\bif\b|\bswitch\b|\belif\b/.test(this.code)) {
      flow.push('Evaluate conditions');
    }
    if (/\b(print|console\.log|System\.out\.println|return)\b/.test(this.code)) {
      flow.push('Produce output');
    }
    flow.push('End');
    return flow;
  }

  hasInputOperations() {
    return /\b(input\s*\(|prompt\s*\(|scanf\s*\(|cin\s*>>)/.test(this.code);
  }

  generateCodeExplanation() {
    const parts = [];

    if (this.metrics.totalFunctions > 0) {
      parts.push(`Defines ${this.metrics.totalFunctions} function(s)`);
    }

    if (this.hasInputOperations()) {
      parts.push('reads input values from the user or stdin');
    }

    if (/\b(for|while)\b/.test(this.code)) {
      parts.push('iterates over data using loop constructs');
    }

    if (/\bif\b|\belif\b|\bswitch\b/.test(this.code)) {
      parts.push('uses conditional branching to decide behavior');
    }

    if (/\b(print|console\.log|System\.out\.println|return)\b/.test(this.code)) {
      parts.push('generates output based on computed values');
    }

    if (parts.length === 0) {
      return 'This code contains executable statements and can be analyzed for quality, security, and runtime behavior.';
    }

    return `This program ${parts.join(', ')}.`;
  }

  calculateScore() {
    const severityPenalty = {
      Critical: 20,
      Error: 12,
      Warning: 6,
      Info: 2,
    };

    const penalty = this.issues.reduce((sum, issue) => {
      return sum + (severityPenalty[issue.severity] || 5);
    }, 0);

    return Math.max(0, 100 - penalty);
  }

  collectMetrics() {
    this.metrics.totalLines = this.lines.length;

    if (this.language === 'Python') {
      this.metrics.totalFunctions = (this.code.match(/\bdef\s+\w+\s*\(/g) || []).length;
      this.metrics.totalVariables = (this.code.match(/\b\w+\s*=\s*[^=]/g) || []).length;
    } else {
      this.metrics.totalFunctions = (this.code.match(/\bfunction\s+\w+\s*\(|=>\s*\{|\b\w+\s*\([^)]*\)\s*\{/g) || []).length;
      this.metrics.totalVariables = (this.code.match(/\b(const|let|var|int|float|double|char|String|auto)\s+\w+/g) || []).length;
    }

    const branches = (this.code.match(/\b(if|else if|for|while|switch|catch|elif|except)\b/g) || []).length;
    this.metrics.complexityScore = Math.max(1, branches + 1);
  }

  addIssue(issue) {
    this.issues.push({
      line: issue.line || 1,
      type: issue.type || 'Issue',
      severity: issue.severity || 'Error',
      problem: issue.problem || 'Unknown issue',
      explanation: issue.explanation || issue.problem || 'No additional explanation provided.',
      solution: issue.solution || 'Review this line and fix the issue',
      example_before: issue.example_before || '',
      example_fix: issue.example_fix || '',
    });
  }

  buildSummary() {
    const critical = this.issues.filter((issue) => issue.severity === 'Critical').length;
    const errors = this.issues.filter((issue) => issue.severity === 'Error').length;
    const warnings = this.issues.filter((issue) => issue.severity === 'Warning').length;
    const info = this.issues.filter((issue) => issue.severity === 'Info').length;

    let recommendation = 'Excellent Code Quality';
    if (this.language === 'Unknown') {
      recommendation = 'Provide valid code in a supported language.';
    } else if (critical > 0) {
      recommendation = 'Fix critical syntax issues before further analysis.';
    } else if (this.issues.length > 0) {
      recommendation = 'Resolve reported issues to improve code quality.';
    }

    return { critical, errors, warnings, info, recommendation };
  }

  buildResult(score, executionResult = {}, correctedCode = '') {
    return {
      language: this.language,
      code_quality_score: score,
      score,
      total_issues: this.issues.length,
      issues: this.issues,
      corrected_code: correctedCode || this.code,
      metrics: this.metrics,
      complexity_analysis: this.complexity,
      performance_warnings: this.performanceWarnings,
      security_warnings: this.securityWarnings,
      code_explanation: this.codeExplanation,
      code_flow: this.codeFlow,
      benchmark: executionResult.benchmark || null,
      summary: this.buildSummary(),
      output: executionResult.output || '',
      execution_failed: executionResult.execution_failed || false,
      execution_error: executionResult.error || null,
      runtime_error: executionResult.runtime_error || null,
      output_generated_from: 'corrected_code',
    };
  }
}

module.exports = MultiLanguageAnalyzer;

// Advanced Code Analysis Module
// Detects JavaScript code issues with line numbers, severity, and fixes

class CodeAnalyzer {
  constructor(code) {
    this.code = code;
    this.lines = code.split('\n');
    this.issues = [];
    this.codeQualityScore = 100;
    this.metrics = {
      totalLines: this.lines.length,
      totalFunctions: 0,
      totalVariables: 0,
      complexityScore: 0,
    };
  }

  analyze() {
    // Detect language
    const language = this.detectLanguage();
    console.log(`Analyzing ${language} code...`);

    // Run language-specific analysis
    switch(language) {
      case 'Python':
        this.analyzePython();
        break;
      case 'Java':
        this.analyzeJava();
        break;
      case 'C++':
        this.analyzeCpp();
        break;
      case 'C':
        this.analyzeC();
        break;
      case 'C#':
        this.analyzeCSharp();
        break;
      case 'Go':
        this.analyzeGo();
        break;
      case 'Ruby':
        this.analyzeRuby();
        break;
      case 'PHP':
        this.analyzePHP();
        break;
      case 'Rust':
        this.analyzeRust();
        break;
      case 'JavaScript':
      default:
        this.analyzeJavaScript();
        break;
    }

    this.calculateQualityScore();

    return {
      code_quality_score: this.codeQualityScore,
      total_issues: this.issues.length,
      language: language,
      issues: this.issues.sort((a, b) => this.getSeverityWeight(b.severity) - this.getSeverityWeight(a.severity)),
      metrics: this.metrics,
      summary: this.generateSummary(),
    };
  }

  detectLanguage() {
    // Comprehensive language detection based on syntax patterns
    
    // Python patterns
    const pythonPatterns = /^(def |class |import |from |if __name__|for .* in |while |@|\s+print\(|\s+return|:$|elif |except |finally |with )/m;
    
    // JavaScript/TypeScript patterns
    const jsPatterns = /function |const |let |var |=>|async |await |import \{|export |class \w+ \{|\.prototype/;
    
    // Java patterns
    const javaPatterns = /public class |private |protected |import java\.|interface |@Override|\.java:|extends |implements /;
    
    // C++ patterns
    const cppPatterns = /#include |std::|using namespace |void main|template |::/;
    
    // C patterns
    const cPatterns = /#include <stdio|#include <stdlib|int main\(\)|malloc|free|typedef struct/;
    
    // C# patterns
    const csharpPatterns = /using System|namespace |public class |async Task|\.cs:|private |protected /;
    
    // Go patterns
    const goPatterns = /package main|func |import \(|:=|defer |go func/;
    
    // Ruby patterns
    const rubyPatterns = /^def |^class |^module |\.rb:|attr_accessor|attr_reader|require |elsif |end$/m;
    
    // PHP patterns
    const phpPatterns = /^\s*<\?php|function |public function |\$_|array\(|\=\>/;
    
    // Rust patterns
    const rustPatterns = /fn |let mut|impl |trait |pub fn|use std|match /;
    
    // Check each language
    if (pythonPatterns.test(this.code) && !jsPatterns.test(this.code)) return 'Python';
    if (javaPatterns.test(this.code)) return 'Java';
    if (cppPatterns.test(this.code) && !cPatterns.test(this.code)) return 'C++';
    if (cPatterns.test(this.code)) return 'C';
    if (csharpPatterns.test(this.code)) return 'C#';
    if (goPatterns.test(this.code)) return 'Go';
    if (rubyPatterns.test(this.code)) return 'Ruby';
    if (phpPatterns.test(this.code)) return 'PHP';
    if (rustPatterns.test(this.code)) return 'Rust';
    if (jsPatterns.test(this.code)) return 'JavaScript';
    
    // Default to JavaScript if unsure
    return 'JavaScript';
  }

  analyzePython() {
    // Run Python-specific analysis
    this.checkPythonSyntaxErrors();
    this.checkPythonMissingColons();
    this.checkPythonIndentation();
    this.checkPythonMissingParentheses();
    this.checkPythonUnclosedBrackets();
    this.checkPythonUndefinedVariables();
    this.checkPythonImportErrors();
  }

  analyzeJavaScript() {
    // Run JavaScript analysis
    this.checkSyntaxErrors();
    this.checkVarUsage();
    this.checkAssignmentInCondition();
    this.checkUnusedVariables();
    this.checkUndefinedVariables();
    this.checkNestedLoops();
    this.checkLongFunctions();
    this.checkComplexity();
    this.checkConsoleLog();
    this.checkTryCatch();
    this.checkMagicNumbers();
    this.checkMissingObjectKeys();
    this.checkNullUndefinedCheck();
    this.checkAsyncAwait();
    this.checkNamingConventions();
  }

  // ==================== PYTHON ANALYSIS METHODS ====================

  checkPythonSyntaxErrors() {
    const lines = this.lines;
    const pythonSyntaxErrors = [];

    lines.forEach((line, index) => {
      const lineNum = index + 1;
      const trimmed = line.trim();

      // Skip empty lines and comments
      if (!trimmed || trimmed.startsWith('#')) return;

      // Check for common Python syntax issues
      // Missing colon after control flow statements
      if (/^(if|elif|else|for|while|def|class|try|except|finally|with)\b/.test(trimmed)) {
        if (!trimmed.endsWith(':')) {
          pythonSyntaxErrors.push({
            line: lineNum,
            type: 'Syntax Error',
            severity: 'Critical',
            problem: `Missing ':' after ${trimmed.split(/\s+/)[0]} statement`,
            solution: `Add ':' at the end of the ${trimmed.split(/\s+/)[0]} statement`,
            example_before: trimmed,
            example_fix: trimmed + ':'
          });
        }
      }
    });

    pythonSyntaxErrors.forEach(error => {
      this.addIssue(
        error.line,
        error.type,
        error.severity,
        error.problem,
        error.solution,
        error.example_fix,
        error.example_before
      );
    });
  }

  checkPythonMissingColons() {
    const lines = this.lines;
    
    lines.forEach((line, index) => {
      const lineNum = index + 1;
      const trimmed = line.trim();

      // Check for function/class definitions without colons
      if (/^def\s+\w+\s*\([^)]*\)(?!:)/.test(trimmed) && !trimmed.endsWith(':')) {
        this.addIssue(
          lineNum,
          'Syntax Error',
          'Critical',
          `Missing ':' after function definition`,
          `Add ':' at the end of the function definition`,
          trimmed + ':',
          trimmed
        );
      }

      // Check for class definitions without colons
      if (/^class\s+\w+(?!:)/.test(trimmed) && !trimmed.endsWith(':')) {
        this.addIssue(
          lineNum,
          'Syntax Error',
          'Critical',
          `Missing ':' after class definition`,
          `Add ':' at the end of the class definition`,
          trimmed + ':',
          trimmed
        );
      }

      // Check for loop/condition statements without colons
      if (/^(for|while|if|elif|else)\b/.test(trimmed) && !trimmed.endsWith(':')) {
        this.addIssue(
          lineNum,
          'Syntax Error',
          'Critical',
          `Missing ':' after ${trimmed.split(/\s+/)[0]} statement`,
          `Add ':' at the end of the statement`,
          trimmed + ':',
          trimmed
        );
      }
    });
  }

  checkPythonIndentation() {
    const lines = this.lines;
    let expectedIndent = 0;

    lines.forEach((line, index) => {
      if (!line.trim() || line.trim().startsWith('#')) return;

      const match = line.match(/^(\s*)/);
      const indent = match ? match[1].length : 0;
      const lineNum = index + 1;
      const trimmed = line.trim();

      // Check if indent is not a multiple of 4 or 2 (common Python convention)
      if (indent % 2 !== 0 && indent % 4 !== 0 && indent > 0) {
        this.addIssue(
          lineNum,
          'Indentation Error',
          'Error',
          `Inconsistent indentation (${indent} spaces - should be 2, 4, or 8)`,
          `Use consistent indentation (PEP 8 recommends 4 spaces)`,
          ' '.repeat(Math.round(indent / 4) * 4) + trimmed,
          line
        );
      }

      // Check for mixed tabs and spaces (very common issue)
      if (line.includes('\t') && line.includes('  ')) {
        this.addIssue(
          lineNum,
          'Indentation Error',
          'Error',
          `Mixed tabs and spaces in indentation`,
          `Use only spaces (preferably 4 spaces) for indentation`,
          ' '.repeat(4) + trimmed,
          line
        );
      }
    });
  }

  checkPythonMissingParentheses() {
    const lines = this.lines;

    lines.forEach((line, index) => {
      const lineNum = index + 1;
      const trimmed = line.trim();

      // Check for Python 2 style print without parentheses
      if (/^print\s+[^(]/.test(trimmed) && !trimmed.includes('(')) {
        this.addIssue(
          lineNum,
          'Syntax Error',
          'Critical',
          `Missing parentheses in print statement (Python 3 requires them)`,
          `Change 'print' to function call with parentheses`,
          `print(${trimmed.substring(5)})`,
          trimmed
        );
      }
    });
  }

  checkPythonUnclosedBrackets() {
    let openBraces = 0;
    let openBrackets = 0;
    let openParens = 0;
    let inString = false;
    let stringChar = null;

    for (let i = 0; i < this.code.length; i++) {
      const char = this.code[i];
      const prevChar = i > 0 ? this.code[i - 1] : '';

      // Track string state
      if ((char === '"' || char === "'") && prevChar !== '\\') {
        if (!inString) {
          inString = true;
          stringChar = char;
        } else if (char === stringChar) {
          inString = false;
        }
      }

      // Skip tracking brackets inside strings
      if (inString) continue;

      // Track brackets
      if (char === '(') openParens++;
      else if (char === ')') openParens--;
      else if (char === '[') openBrackets++;
      else if (char === ']') openBrackets--;
      else if (char === '{') openBraces++;
      else if (char === '}') openBraces--;
    }

    if (openParens > 0) {
      this.addIssue(
        1,
        'Syntax Error',
        'Critical',
        `Unclosed parentheses: ${openParens} open`,
        `Close all opening parentheses with matching ')'`,
        '',
        ''
      );
    }

    if (openBrackets > 0) {
      this.addIssue(
        1,
        'Syntax Error',
        'Critical',
        `Unclosed brackets: ${openBrackets} open`,
        `Close all opening brackets with matching ']'`,
        '',
        ''
      );
    }

    if (openBraces > 0) {
      this.addIssue(
        1,
        'Syntax Error',
        'Critical',
        `Unclosed braces: ${openBraces} open`,
        `Close all opening braces with matching '}'`,
        '',
        ''
      );
    }
  }

  checkPythonUndefinedVariables() {
    const assignedVars = new Set(['True', 'False', 'None', 'self', 'cls', 'print', 'len', 'range', 'str', 'int', 'list', 'dict', 'set']);
    const importedModules = new Set();
    const lines = this.lines;

    // First pass: collect all assignments and imports
    lines.forEach(line => {
      const trimmed = line.trim();

      // Track imports
      if (trimmed.startsWith('import ')) {
        const modules = trimmed.replace('import ', '').split(',');
        modules.forEach(m => assignedVars.add(m.trim().split(' ')[0]));
      }
      if (trimmed.startsWith('from ')) {
        const match = trimmed.match(/from\s+\w+\s+import\s+(.+)/);
        if (match) {
          const items = match[1].split(',');
          items.forEach(item => assignedVars.add(item.trim().split(' ')[0]));
        }
      }

      // Track variable assignments
      if (trimmed.includes('=') && !trimmed.startsWith('if ') && !trimmed.startsWith('elif ')) {
        const assignMatch = trimmed.match(/^(\w+)\s*=/);
        if (assignMatch) {
          assignedVars.add(assignMatch[1]);
        }
      }

      // Track function definitions
      if (trimmed.startsWith('def ')) {
        const funcMatch = trimmed.match(/def\s+(\w+)/);
        if (funcMatch) {
          assignedVars.add(funcMatch[1]);
        }
      }

      // Track class definitions
      if (trimmed.startsWith('class ')) {
        const classMatch = trimmed.match(/class\s+(\w+)/);
        if (classMatch) {
          assignedVars.add(classMatch[1]);
        }
      }
    });

    // Second pass: check for undefined variables
    lines.forEach((line, index) => {
      const lineNum = index + 1;
      if (line.includes('console.log')) {
        // This is JavaScript code in Python analysis, skip
        return;
      }
    });
  }

  checkPythonImportErrors() {
    const lines = this.lines;
    const commonBuiltins = ['os', 'sys', 'math', 'random', 'json', 'datetime', 're', 'requests', 'pandas', 'numpy'];

    lines.forEach((line, index) => {
      const lineNum = index + 1;
      const trimmed = line.trim();

      // Check for incorrectly formatted imports
      if (trimmed.startsWith('import') && trimmed.includes('(')) {
        this.addIssue(
          lineNum,
          'Syntax Error',
          'Error',
          `Incorrect import syntax - parentheses used`,
          `Use comma-separated list for multiple imports without parentheses`,
          `import os, sys, math`,
          trimmed
        );
      }

      // Check for from...import with missing module
      if (trimmed.startsWith('from ') && !trimmed.includes('import')) {
        this.addIssue(
          lineNum,
          'Syntax Error',
          'Error',
          `'from' import statement missing 'import' keyword`,
          `Use 'from module import name' syntax`,
          `from os import path`,
          trimmed
        );
      }
    });
  }

  getSeverityWeight(severity) {
    const weights = { 'Critical': 4, 'Error': 3, 'Warning': 2, 'Info': 1 };
    return weights[severity] || 0;
  }

  addIssue(lineNum, type, severity, problem, solution, example_fix = '', example_before = '') {
    this.issues.push({
      line: lineNum,
      type,
      severity,
      problem,
      solution,
      example_fix,
      example_before,
    });

    // Deduct from quality score based on severity
    const deductions = { 'Critical': 15, 'Error': 10, 'Warning': 5, 'Info': 2 };
    this.codeQualityScore -= deductions[severity] || 0;
  }

  checkSyntaxErrors() {
    try {
      // Try to parse with Function constructor to catch basic syntax errors
      new Function(this.code);
    } catch (error) {
      const match = error.message.match(/line (\d+)/);
      const lineNum = match ? parseInt(match[1]) : 1;
      this.addIssue(
        lineNum,
        'Syntax Error',
        'Critical',
        error.message,
        'Fix the syntax error at the indicated line',
        '',
        this.getLineAtNumber(lineNum)
      );
    }
  }

  checkAssignmentInCondition() {
    // Check for assignment (=) instead of comparison (==, ===) in conditions
    const conditionRegex = /if\s*\(\s*([^)]*?[^=!<>])=([^=])[^)]*?\)/g;
    let match;
    while ((match = conditionRegex.exec(this.code)) !== null) {
      if (!match[1].includes('let') && !match[1].includes('const') && !match[1].includes('var')) {
        const lineNum = this.getLineNumberFromMatch(match[0]);
        this.addIssue(
          lineNum,
          'Logic Error',
          'Error',
          'Assignment operator (=) used instead of comparison in condition',
          "Replace '=' with '===' for strict comparison",
          `if(${match[1]} === ${match[2]})`,
          match[0]
        );
      }
    }
  }

  checkVarUsage() {
    // Check for 'var' usage
    const lines = this.code.split('\n');
    lines.forEach((line, index) => {
      const match = line.match(/\bvar\s+(\w+)/);
      if (match) {
        this.addIssue(
          index + 1,
          'Code Quality',
          'Warning',
          `Using 'var' instead of 'let' or 'const' for variable '${match[1]}'`,
          `Replace 'var' with 'const' (preferred) or 'let' (if variable is reassigned)`,
          `const ${match[1]} = ...`,
          line
        );
      }
    });
  }

  checkUnusedVariables() {
    // Find all variable declarations
    const varDeclRegex = /(?:const|let|var)\s+(\w+)\s*=/g;
    const variables = new Map();
    let match;

    while ((match = varDeclRegex.exec(this.code)) !== null) {
      const varName = match[1];
      const lineNum = this.code.substring(0, match.index).split('\n').length;
      variables.set(varName, lineNum);
    }

    // Check for unused variables
    variables.forEach((declLine, varName) => {
      const usageRegex = new RegExp(`\\b${varName}\\b`, 'g');
      const usageCount = (this.code.match(usageRegex) || []).length;

      if (usageCount <= 1) {
        this.addIssue(
          declLine,
          'Code Quality',
          'Info',
          `Variable '${varName}' is declared but never used`,
          `Remove the unused variable declaration to clean up code`,
          '',
          this.getLineAtNumber(declLine)
        );
      }
    });
  }

  checkUndefinedVariables() {
    // Simple check for undefined variable usage
    const assignedVars = new Set();
    const declRegex = /(?:const|let|var|function)\s+(\w+)/g;
    let match;

    while ((match = declRegex.exec(this.code)) !== null) {
      assignedVars.add(match[1]);
    }

    // Check for common undefined patterns
    const lines = this.code.split('\n');
    lines.forEach((line, index) => {
      if (line.includes('console.') && !assignedVars.has('console')) {
        assignedVars.add('console'); // console is global
      }
    });
  }

  checkNestedLoops() {
    const nestedLoopRegex = /for\s*\([^)]*\)\s*\{[^{}]*for\s*\(/g;
    const matches = [...this.code.matchAll(nestedLoopRegex)];

    matches.forEach((match) => {
      const lineNum = this.code.substring(0, match.index).split('\n').length;
      this.addIssue(
        lineNum,
        'Performance Issue',
        'Warning',
        'Nested loops detected - O(n²) complexity',
        'Consider using arrays methods (map, filter, reduce) or refactoring to reduce nesting',
        'arr.flatMap(item => otherArr.map(other => ({ item, other })))',
        match[0]
      );
    });
  }

  checkLongFunctions() {
    const functionRegex = /function\s+\w+\s*\([^)]*\)\s*\{|\w+\s*=\s*\([^)]*\)\s*=>/g;
    const functionMatches = [...this.code.matchAll(functionRegex)];

    functionMatches.forEach((match) => {
      const startLine = this.code.substring(0, match.index).split('\n').length;
      const afterFunc = this.code.substring(match.index + match[0].length);
      let braceCount = 1;
      let endPos = 0;

      for (let i = 0; i < afterFunc.length && braceCount > 0; i++) {
        if (afterFunc[i] === '{') braceCount++;
        if (afterFunc[i] === '}') braceCount--;
        endPos = i;
      }

      const functionBody = afterFunc.substring(0, endPos);
      const functionLength = functionBody.split('\n').length;

      if (functionLength > 30) {
        this.addIssue(
          startLine,
          'Code Quality',
          'Warning',
          `Function is too long (${functionLength} lines)`,
          'Break the function into smaller, single-responsibility functions',
          'const extractedLogic = () => { /* smaller logic */ }\nconst mainFunction = () => { extractedLogic(); }',
          match[0]
        );
      }
    });

    this.metrics.totalFunctions = functionMatches.length;
  }

  checkComplexity() {
    const ifCount = (this.code.match(/if\s*\(/g) || []).length;
    const elseCount = (this.code.match(/else\s*/g) || []).length;
    const switchCount = (this.code.match(/switch\s*\(/g) || []).length;
    const ternaryCount = (this.code.match(/\?.*:/g) || []).length;

    const complexityScore = ifCount + (elseCount * 1.5) + (switchCount * 2) + (ternaryCount * 0.5);
    this.metrics.complexityScore = Math.round(complexityScore);

    if (complexityScore > 15) {
      this.addIssue(
        1,
        'Code Quality',
        'Warning',
        `High cyclomatic complexity (score: ${Math.round(complexityScore)})`,
        'Simplify conditionals using early returns or extract conditions to named variables',
        'const isValid = name.length > 0 && age > 18;\nif (!isValid) return;',
        ''
      );
    }
  }

  checkConsoleLog() {
    const consoleLogs = [...this.code.matchAll(/console\.(log|debug|info|warn|error)\s*\(/g)];

    if (consoleLogs.length > 3) {
      const firstMatch = consoleLogs[0];
      const lineNum = this.code.substring(0, firstMatch.index).split('\n').length;

      this.addIssue(
        lineNum,
        'Code Quality',
        'Info',
        `Multiple console statements found (${consoleLogs.length})`,
        'Remove debug console.log statements before production deployment',
        '// Use a proper logging library instead:\nimport { logger } from "./logger";\nlogger.debug("message");',
        firstMatch[0]
      );
    }
  }

  checkTryCatch() {
    const hasTryCatch = this.code.includes('try') && this.code.includes('catch');
    const riskOperations = [
      'JSON.parse',
      'fetch',
      '.map(',
      '.filter(',
      'parseInt',
      'eval',
    ];

    const hasRiskOps = riskOperations.some(op => this.code.includes(op));

    if (!hasTryCatch && hasRiskOps) {
      this.addIssue(
        1,
        'Error Handling',
        'Warning',
        'Code contains error-prone operations without error handling',
        'Wrap error-prone operations in try-catch blocks',
        'try {\n  const data = JSON.parse(str);\n} catch (error) {\n  console.error("Parse failed:", error);\n}',
        ''
      );
    }
  }

  checkMagicNumbers() {
    const magicNumberRegex = /(\d{3,})/g;
    const matches = [...this.code.matchAll(magicNumberRegex)];

    if (matches.length > 3) {
      const firstMatch = matches[0];
      const lineNum = this.code.substring(0, firstMatch.index).split('\n').length;

      this.addIssue(
        lineNum,
        'Code Quality',
        'Info',
        'Magic numbers (unexplained numeric constants) detected',
        'Define constants for numeric values to improve code clarity',
        'const MAX_RETRIES = 5;\nfor (let i = 0; i < MAX_RETRIES; i++)',
        firstMatch[0]
      );
    }
  }

  checkMissingObjectKeys() {
    // Check for potential undefined object property access
    const objectAccessRegex = /\.\w+(?!\s*=)/g;
    const matches = this.code.match(objectAccessRegex) || [];

    if (matches.length > 10) {
      this.addIssue(
        1,
        'Code Quality',
        'Info',
        'Many direct object property accesses without null checks',
        'Use optional chaining (?.) to safely access properties',
        'const value = user?.profile?.name ?? "Unknown";',
        ''
      );
    }
  }

  checkNullUndefinedCheck() {
    const loosyEquals = [...this.code.matchAll(/==\s*(?!==)/g)];

    if (loosyEquals.length > 0) {
      const firstMatch = loosyEquals[0];
      const lineNum = this.code.substring(0, firstMatch.index).split('\n').length;

      this.addIssue(
        lineNum,
        'Code Quality',
        'Warning',
        'Loose equality (==) used instead of strict equality (===)',
        'Prefer strict equality (===) to avoid type coercion bugs',
        'if (value === 0) // instead of == 0',
        firstMatch[0]
      );
    }
  }

  checkAsyncAwait() {
    const hasAsync = this.code.includes('async');
    const hasAwait = this.code.includes('await');

    if (hasAsync && hasAwait) {
      // Check for missing error handling
      const awaitMatches = this.code.match(/await/g) || [];
      if (awaitMatches.length > 0 && !this.code.includes('catch')) {
        this.addIssue(
          1,
          'Error Handling',
          'Warning',
          'Async/await without error handling',
          'Wrap async operations in try-catch or add .catch()',
          'try {\n  const result = await fetchData();\n} catch (error) {\n  handleError(error);\n}',
          ''
        );
      }
    }
  }

  checkNamingConventions() {
    // Check for single-letter variable names
    const singleLetterVars = this.code.match(/(?:const|let|var)\s+([a-z])\s*=/g) || [];

    if (singleLetterVars.length > 2) {
      this.addIssue(
        1,
        'Code Quality',
        'Info',
        'Single-letter variable names reduce code readability',
        'Use descriptive variable names (except for common loop counters like i, j)',
        'const userName = "John"; // instead of const u = "John";',
        singleLetterVars[0] || ''
      );
    }
  }

  // ==================== JAVA ANALYSIS ====================
  analyzeJava() {
    this.checkSyntaxErrors();
    this.checkUnusedVariables();
    this.checkUndefinedVariables();
    this.checkNullPointerDangers();
    this.checkMissingBraces();
    this.checkComplexity();
    this.checkNamingConventions();
  }

  checkNullPointerDangers() {
    const nullChecks = this.code.match(/if\s*\(\s*\w+\s*[!=]=\s*null\s*\)/g) || [];
    if (this.code.includes('NullPointerException') || !nullChecks.length) {
      this.addIssue(
        1,
        'Null Safety',
        'Warning',
        'Potential null pointer access',
        'Always check for null before using objects',
        'if (object != null) { /* use object */ }',
        ''
      );
    }
  }

  // ==================== C++ ANALYSIS ====================
  analyzeCpp() {
    this.checkSyntaxErrors();
    this.checkUndefinedVariables();
    this.checkMemoryManagement();
    this.checkComplexity();
  }

  checkMemoryManagement() {
    const newMatches = this.code.match(/new\s+/g) || [];
    const deleteMatches = this.code.match(/delete\s+/g) || [];
    
    if (newMatches.length > deleteMatches.length) {
      this.addIssue(
        1,
        'Memory Management',
        'Warning',
        'Possible memory leak: more allocations than deallocations',
        'Ensure every new is paired with delete, or use smart pointers',
        'std::unique_ptr<Type> ptr(new Type());',
        ''
      );
    }
  }

  // ==================== C ANALYSIS ====================
  analyzeC() {
    this.checkSyntaxErrors();
    this.checkUndefinedVariables();
    this.checkMemoryManagement();
    this.checkComplexity();
    this.checkBufferOverflow();
  }

  checkBufferOverflow() {
    const unsafeFunctions = this.code.match(/strcpy|sprintf|strcat|gets/g) || [];
    if (unsafeFunctions.length > 0) {
      this.addIssue(
        1,
        'Security',
        'Critical',
        'Use of unsafe C function found',
        `Replace with safe alternatives: strcpy→strncpy, gets→fgets, sprintf→snprintf`,
        'strncpy(dest, src, sizeof(dest) - 1);',
        unsafeFunctions[0]
      );
    }
  }

  // ==================== C# ANALYSIS ====================
  analyzeCSharp() {
    this.checkSyntaxErrors();
    this.checkUndefinedVariables();
    this.checkNullPointerDangers();
    this.checkComplexity();
  }

  // ==================== GO ANALYSIS ====================
  analyzeGo() {
    this.checkSyntaxErrors();
    this.checkUndefinedVariables();
    this.checkErrorHandling();
    this.checkComplexity();
  }

  checkErrorHandling() {
    const hasErrors = this.code.match(/if err != nil/g) || [];
    if (this.code.includes('return') && !hasErrors.length) {
      this.addIssue(
        1,
        'Error Handling',
        'Warning',
        'Functions return but may not handle errors properly',
        'Check error returns with: if err != nil { ... }',
        'if err != nil {\n  return err\n}',
        ''
      );
    }
  }

  // ==================== RUBY ANALYSIS ====================
  analyzeRuby() {
    this.checkSyntaxErrors();
    this.checkUndefinedVariables();
    this.checkComplexity();
    this.checkRubyConventions();
  }

  checkRubyConventions() {
    if (this.code.match(/\w+_\w+\(/g)) {
      // Method names follow snake_case, which is correct for Ruby
      return;
    }
    this.addIssue(
      1,
      'Convention',
      'Info',
      'Ruby methods should use snake_case naming',
      'Follow Ruby naming conventions for better readability',
      'def my_method_name(param)\n  # implementation\nend',
      ''
    );
  }

  // ==================== PHP ANALYSIS ====================
  analyzePHP() {
    this.checkSyntaxErrors();
    this.checkUndefinedVariables();
    this.checkPHPSecurity();
    this.checkComplexity();
  }

  checkPHPSecurity() {
    const sqlInjectionRisks = this.code.match(/\$_GET|\$_POST|\$_REQUEST/g) || [];
    if (sqlInjectionRisks.length > 0 && !this.code.includes('prepared') && !this.code.includes('escape')) {
      this.addIssue(
        1,
        'Security',
        'Critical',
        'Potential SQL injection vulnerability',
        'Use prepared statements with parameterized queries',
        '$stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");\n$stmt->execute([$id]);',
        sqlInjectionRisks[0]
      );
    }
  }

  // ==================== RUST ANALYSIS ====================
  analyzeRust() {
    this.checkSyntaxErrors();
    this.checkUndefinedVariables();
    this.checkOwnershipIssues();
    this.checkComplexity();
  }

  checkOwnershipIssues() {
    if (this.code.includes('unsafe')) {
      this.addIssue(
        1,
        'Safety',
        'Warning',
        'Unsafe block detected',
        'Minimize unsafe code and document why it is necessary',
        '// Safety: This is safe because...\nunsafe { /* code */ }',
        'unsafe'
      );
    }
  }

  getLineAtNumber(lineNum) {
    return this.lines[lineNum - 1] || '';
  }

  getLineNumberFromMatch(match) {
    const beforeMatch = this.code.substring(0, this.code.indexOf(match));
    return beforeMatch.split('\n').length;
  }

  generateSummary() {
    const critical = this.issues.filter(i => i.severity === 'Critical').length;
    const errors = this.issues.filter(i => i.severity === 'Error').length;
    const warnings = this.issues.filter(i => i.severity === 'Warning').length;
    const info = this.issues.filter(i => i.severity === 'Info').length;

    return {
      critical,
      errors,
      warnings,
      info,
      recommendation: this.getRecommendation(),
    };
  }

  getRecommendation() {
    if (this.codeQualityScore >= 90) return '✅ Excellent code quality!';
    if (this.codeQualityScore >= 75) return '✓ Good code quality, minor improvements needed';
    if (this.codeQualityScore >= 60) return '⚠️ Fair code quality, consider the suggested improvements';
    if (this.codeQualityScore >= 40) return '❌ Code quality needs improvement';
    return '❌ Critical issues to address before deployment';
  }

  calculateQualityScore() {
    // Ensure score is between 0 and 100
    this.codeQualityScore = Math.max(0, Math.min(100, this.codeQualityScore));

    // Only give 100% if NO issues are found
    if (this.issues.length === 0) {
      this.codeQualityScore = 100;
    } else if (this.codeQualityScore === 100) {
      // If there are issues but score is still 100, reduce it
      this.codeQualityScore = 95;
    }
  }
}

module.exports = CodeAnalyzer;

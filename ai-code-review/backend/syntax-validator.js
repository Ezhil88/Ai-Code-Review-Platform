const { spawnSync } = require('child_process');

class SyntaxValidator {
  static validate(language, code) {
    switch (language) {
      case 'Python':
        return this.validatePythonSyntax(code);
      case 'JavaScript':
        return this.validateJavaScriptSyntax(code);
      case 'Java':
        return this.validateJavaSyntax(code);
      case 'C++':
      case 'C/C++':
        return this.validateCSyntax(code);
      default:
        return [];
    }
  }

  static validatePythonSyntax(code) {
    const script = [
      'import ast, json, sys',
      'code = sys.stdin.read()',
      'try:',
      '    ast.parse(code)',
      "    print(json.dumps({'valid': True, 'errors': []}))",
      'except SyntaxError as e:',
      "    print(json.dumps({'valid': False, 'errors': [{'line': e.lineno or 1, 'msg': e.msg, 'text': (e.text or '').strip()}]}))",
    ].join('\n');

    const run = (command, args) => spawnSync(command, args, {
      input: code,
      encoding: 'utf8',
      timeout: 5000,
    });

    const attempts = [
      run('python', ['-c', script]),
      run('py', ['-3', '-c', script]),
    ];

    for (const result of attempts) {
      if (!result || result.error || result.status !== 0 || !result.stdout) {
        continue;
      }

      try {
        const parsed = JSON.parse(result.stdout.trim());
        if (parsed.valid) {
          return [];
        }

        return (parsed.errors || []).map((error) => ({
          line: error.line || 1,
          type: 'Syntax Error',
          severity: 'Critical',
          problem: error.msg || 'Invalid Python syntax',
          solution: 'Fix the syntax near this line (for example, missing colon, parenthesis, or indentation).',
          example_before: error.text || '',
          example_fix: '',
        }));
      } catch (_parseError) {
        // Ignore malformed parser output and continue to fallback.
      }
    }

    return this.fallbackPythonValidation(code);
  }

  static fallbackPythonValidation(code) {
    const issues = [];
    const lines = code.split('\n');

    lines.forEach((line, index) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) {
        return;
      }

      if (/^(if|elif|else|for|while|def|class|try|except|finally|with)\b/.test(trimmed) && !trimmed.endsWith(':')) {
        issues.push({
          line: index + 1,
          type: 'Syntax Error',
          severity: 'Critical',
          problem: `Missing ':' after ${trimmed.split(/\s+/)[0]} statement`,
          solution: 'Add a colon at the end of the statement.',
          example_before: trimmed,
          example_fix: `${trimmed}:`,
        });
      }
    });

    return issues;
  }

  static validateJavaScriptSyntax(code) {
    try {
      // Parsing via Function catches syntax-level JS errors.
      // eslint-disable-next-line no-new-func
      new Function(code);
      return [];
    } catch (error) {
      return [{
        line: this.extractLineNumber(error.message),
        type: 'Syntax Error',
        severity: 'Critical',
        problem: error.message || 'Invalid JavaScript syntax',
        solution: 'Fix the syntax near this line and ensure braces/parentheses are balanced.',
        example_before: '',
        example_fix: '',
      }];
    }
  }

  static validateJavaSyntax(code) {
    const issues = [];
    const lines = code.split('\n');

    if (!/class\s+\w+/.test(code)) {
      issues.push({
        line: 1,
        type: 'Syntax Error',
        severity: 'Error',
        problem: 'Java class declaration not found.',
        solution: 'Declare a class, for example: public class Main { ... }',
      });
    }

    const braceIssue = this.validateBalancedPairs(code, '{', '}');
    if (braceIssue) {
      issues.push({
        line: braceIssue,
        type: 'Syntax Error',
        severity: 'Critical',
        problem: 'Unmatched braces in Java code.',
        solution: 'Ensure every opening brace has a matching closing brace.',
      });
    }

    lines.forEach((line, index) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('//') || trimmed.endsWith('{') || trimmed.endsWith('}') || trimmed.endsWith(';')) {
        return;
      }

      if (/^(public|private|protected|class|if|for|while|switch|else|try|catch)\b/.test(trimmed)) {
        return;
      }

      issues.push({
        line: index + 1,
        type: 'Syntax Error',
        severity: 'Error',
        problem: 'Possible missing semicolon.',
        solution: 'Add a semicolon at the end of the statement.',
        example_before: trimmed,
        example_fix: `${trimmed};`,
      });
    });

    return issues;
  }

  static validateCSyntax(code) {
    const issues = [];

    if (!/#include\s*[<"][^>"]+[>"]/.test(code)) {
      issues.push({
        line: 1,
        type: 'Syntax Error',
        severity: 'Warning',
        problem: 'No include directive detected.',
        solution: 'Add required includes like #include <stdio.h> or #include <iostream>.',
      });
    }

    const braceIssue = this.validateBalancedPairs(code, '{', '}');
    if (braceIssue) {
      issues.push({
        line: braceIssue,
        type: 'Syntax Error',
        severity: 'Critical',
        problem: 'Unmatched braces in C/C++ code.',
        solution: 'Ensure every opening brace has a matching closing brace.',
      });
    }

    const parenIssue = this.validateBalancedPairs(code, '(', ')');
    if (parenIssue) {
      issues.push({
        line: parenIssue,
        type: 'Syntax Error',
        severity: 'Critical',
        problem: 'Unmatched parentheses in C/C++ code.',
        solution: 'Ensure every opening parenthesis has a matching closing parenthesis.',
      });
    }

    return issues;
  }

  static validateBalancedPairs(code, openChar, closeChar) {
    let count = 0;
    const lines = code.split('\n');

    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i];
      for (let j = 0; j < line.length; j += 1) {
        const char = line[j];
        if (char === openChar) {
          count += 1;
        }
        if (char === closeChar) {
          count -= 1;
        }
        if (count < 0) {
          return i + 1;
        }
      }
    }

    return count === 0 ? 0 : lines.length;
  }

  static extractLineNumber(message = '') {
    const match = message.match(/line\s*(\d+)/i);
    return match ? Number(match[1]) : 1;
  }
}

module.exports = SyntaxValidator;

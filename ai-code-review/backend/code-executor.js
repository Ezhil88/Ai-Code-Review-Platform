const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

class CodeExecutor {
  static execute(language, code, stdinInput = '') {
    const startedAt = process.hrtime.bigint();
    const memoryStart = process.memoryUsage().heapUsed;
    const sourceCode = typeof code === 'string' ? code : '';
    const normalizedInput = this.normalizeInput(stdinInput);
    const safetyViolation = this.checkSafety(language, sourceCode);

    if (safetyViolation) {
      return this.withBenchmark({
        output: '',
        execution_failed: true,
        error: `Execution blocked for safety: ${safetyViolation}`,
        runtime_error: {
          type: 'SafetyError',
          message: safetyViolation,
          explanation: 'The code contains an unsafe runtime pattern that is blocked by the sandbox.',
          why: 'Potentially dangerous operations can impact files, processes, or environment safety.',
          fix: 'Remove unsafe modules/functions and use safe, deterministic logic for analysis output.',
        },
      }, startedAt, memoryStart);
    }

    try {
      let result;
      switch (language) {
        case 'Python':
          result = this.executePython(sourceCode, normalizedInput);
          break;
        case 'JavaScript':
          result = this.executeJavaScript(sourceCode, normalizedInput);
          break;
        case 'Java':
          result = this.executeJava(sourceCode);
          break;
        case 'C++':
        case 'C/C++':
          result = this.executeCpp(sourceCode);
          break;
        case 'C':
          result = this.executeC(sourceCode);
          break;
        default:
          result = { output: '', execution_failed: true, error: 'Language not supported for execution' };
      }

      return this.withBenchmark(result, startedAt, memoryStart);
    } catch (error) {
      return this.withBenchmark({
        output: '',
        execution_failed: true,
        error: `Execution error: ${error.message}`,
        runtime_error: this.createGenericRuntimeError(error.message),
      }, startedAt, memoryStart);
    }
  }

  static withBenchmark(result, startedAt, memoryStart) {
    const elapsedMs = Number(process.hrtime.bigint() - startedAt) / 1e6;
    const memoryDeltaMb = (process.memoryUsage().heapUsed - memoryStart) / (1024 * 1024);

    let cpuUsage = 'Low';
    if (elapsedMs > 300) {
      cpuUsage = 'High';
    } else if (elapsedMs > 80) {
      cpuUsage = 'Medium';
    }

    return {
      ...result,
      benchmark: {
        execution_time_seconds: Number((elapsedMs / 1000).toFixed(4)),
        execution_time_ms: Number(elapsedMs.toFixed(2)),
        memory_usage_mb: Number(Math.max(0, memoryDeltaMb).toFixed(2)),
        cpu_usage: cpuUsage,
      },
    };
  }

  static normalizeInput(stdinInput) {
    return typeof stdinInput === 'string' ? stdinInput : '';
  }

  static hasInputCalls(language, code) {
    if (language === 'Python') {
      return /\binput\s*\(/.test(code);
    }

    if (language === 'JavaScript') {
      return /\binput\s*\(|\bprompt\s*\(/.test(code);
    }

    return false;
  }

  static getInputRequiredRuntimeError(language) {
    const base = {
      type: 'InputRequiredError',
      message: 'Program input is required but no input was provided.',
      explanation: 'The program is requesting input from stdin, but the Program Input box is empty.',
      why: 'Non-interactive execution does not prompt for manual keyboard input during runtime.',
      fix: 'Enter input values in the Program Input box (one value per line) and run again.',
    };

    if (language === 'Python') {
      return {
        ...base,
        message: 'Program used input() but no stdin input was provided.',
        explanation: 'The Python program expected input using input(), but no values were supplied.',
        fix: 'Provide input values in the Program Input box or replace input() with predefined variables.',
      };
    }

    if (language === 'JavaScript') {
      return {
        ...base,
        message: 'Program used input()/prompt() but no stdin input was provided.',
        explanation: 'The JavaScript program expected values from stdin through input()/prompt() mapping.',
        fix: 'Provide input values in the Program Input box or avoid runtime input dependencies.',
      };
    }

    return base;
  }

  static createGenericRuntimeError(message) {
    return {
      type: 'RuntimeError',
      message: message || 'Execution failed due to an unknown runtime error.',
      explanation: 'The program crashed while running.',
      why: 'A runtime failure happened after syntax validation, during actual execution.',
      fix: 'Check variable values, input handling, and control flow near the failing line.',
    };
  }

  static getErrorKnowledgeBase(language) {
    const common = {
      RuntimeError: {
        explanation: 'The program failed while running.',
        why: 'An execution-time condition was not handled by the code.',
        fix: 'Inspect the stack trace and validate assumptions before each operation.',
      },
      TimeoutError: {
        explanation: 'The program ran longer than the allowed execution limit.',
        why: 'An infinite loop or very heavy computation likely prevented completion.',
        fix: 'Review loops and recursion, and ensure termination conditions are correct.',
      },
      InputRequiredError: {
        explanation: 'The program expected input values but none were provided.',
        why: 'The runtime is non-interactive and stdin input must be supplied explicitly.',
        fix: 'Use the Program Input box to provide required input values.',
      },
    };

    const python = {
      EOFError: {
        explanation: 'The program expected user input using input(), but no input was provided.',
        why: 'The runtime is non-interactive and does not supply console input automatically.',
        fix: 'Provide test input values in code or replace input() with predefined variables.',
      },
      ZeroDivisionError: {
        explanation: 'A number was divided by zero.',
        why: 'The denominator evaluated to 0 at runtime.',
        fix: 'Add a check before division to ensure denominator is not zero.',
      },
      NameError: {
        explanation: 'A variable or function was used before being defined.',
        why: 'The referenced name is missing in the current scope.',
        fix: 'Define the variable/function first and verify spelling and scope.',
      },
      TypeError: {
        explanation: 'An operation was used with an incompatible value type.',
        why: 'The function/operator received values of unexpected types.',
        fix: 'Convert values to expected types or add type checks before operations.',
      },
      ValueError: {
        explanation: 'A function received the right type but an invalid value.',
        why: 'Input value format/content is not acceptable for this operation.',
        fix: 'Validate input values before conversion or processing.',
      },
      IndexError: {
        explanation: 'Code tried to access a list index that does not exist.',
        why: 'The index is outside valid bounds of the sequence.',
        fix: 'Check list length and index boundaries before access.',
      },
      KeyError: {
        explanation: 'Code tried to access a dictionary key that is missing.',
        why: 'The key is not present in the dictionary at runtime.',
        fix: 'Use key existence checks or dict.get() with a fallback value.',
      },
    };

    const javascript = {
      ReferenceError: {
        explanation: 'A variable was used before declaration or is not defined.',
        why: 'The identifier does not exist in the current scope.',
        fix: 'Declare the variable before use and confirm correct variable name.',
      },
      TypeError: {
        explanation: 'An operation was attempted on an incompatible value type.',
        why: 'A method/property was called on undefined/null or wrong type.',
        fix: 'Add null checks and ensure values are of expected type before use.',
      },
      RangeError: {
        explanation: 'A numeric value was outside the valid range.',
        why: 'An operation received invalid range input (for example invalid array length).',
        fix: 'Validate numeric boundaries before passing values to APIs.',
      },
      SyntaxError: {
        explanation: 'JavaScript could not parse part of the code.',
        why: 'A statement format is invalid for the JavaScript parser.',
        fix: 'Fix punctuation/braces and verify the statement structure.',
      },
    };

    if (language === 'Python') {
      return { ...common, ...python };
    }

    if (language === 'JavaScript') {
      return { ...common, ...javascript };
    }

    return common;
  }

  static parseRuntimeError(language, stderr = '') {
    const normalized = String(stderr || '').trim();
    if (!normalized) {
      return this.createGenericRuntimeError('No runtime error details available');
    }

    const lines = normalized.split(/\r?\n/).filter(Boolean);
    const lastLine = lines[lines.length - 1] || normalized;

    let type = 'RuntimeError';
    let message = lastLine;

    const typedMatch = lastLine.match(/^([A-Za-z]+Error):\s*(.*)$/);
    if (typedMatch) {
      type = typedMatch[1];
      message = typedMatch[2] || lastLine;
    } else {
      const jsMatch = normalized.match(/\b([A-Za-z]+Error):\s*([^\n]+)/);
      if (jsMatch) {
        type = jsMatch[1];
        message = jsMatch[2] || jsMatch[0];
      }
    }

    const kb = this.getErrorKnowledgeBase(language);
    const info = kb[type] || kb.RuntimeError;

    return {
      type,
      message,
      explanation: info.explanation,
      why: info.why,
      fix: info.fix,
    };
  }

  static checkSafety(language, code) {
    if (!code || code.trim().length === 0) {
      return 'No executable code provided';
    }

    if (code.length > 20000) {
      return 'Code exceeds safe execution size limit';
    }

    const dangerousPatternsByLanguage = {
      JavaScript: [
        /\brequire\s*\(\s*['"](?:fs|child_process|worker_threads|cluster|net|http|https|dgram|tls)['"]\s*\)/,
        /\b(?:exec|spawn|fork)\s*\(/,
        /\bprocess\.(?:exit|kill|abort|chdir)\b/,
        /\b(?:eval|Function)\s*\(/,
      ],
      Python: [
        /\bimport\s+(?:os|subprocess|socket|ctypes|multiprocessing|shutil|pathlib)\b/,
        /\bfrom\s+(?:os|subprocess|socket|ctypes|multiprocessing|shutil|pathlib)\b/,
        /\b(?:eval|exec|compile|__import__)\s*\(/,
      ],
    };

    const patterns = dangerousPatternsByLanguage[language] || [];
    const matched = patterns.find((pattern) => pattern.test(code));

    if (matched) {
      return 'Detected potentially dangerous runtime pattern';
    }

    return null;
  }

  static executePython(code, stdinInput = '') {
    if (this.hasInputCalls('Python', code) && !stdinInput.trim()) {
      const runtimeError = this.getInputRequiredRuntimeError('Python');
      return {
        output: '',
        execution_failed: true,
        error: runtimeError.message,
        runtime_error: runtimeError,
      };
    }

    const tempDir = os.tmpdir();
    const tempFile = path.join(tempDir, `temp-${Date.now()}.py`);

    try {
      fs.writeFileSync(tempFile, code, 'utf8');

      const result = spawnSync('python', [tempFile], {
        encoding: 'utf8',
        timeout: 5000,
        maxBuffer: 1024 * 1024,
        cwd: tempDir,
        input: stdinInput,
      });

      if (result.error && result.error.code === 'ETIMEDOUT') {
        return {
          output: '',
          execution_failed: true,
          error: 'Program execution timed out',
          runtime_error: {
            type: 'TimeoutError',
            message: 'Program execution timed out',
            ...this.getErrorKnowledgeBase('Python').TimeoutError,
          },
        };
      }

      const output = (result.stdout || '').trim();
      const error = (result.stderr || '').trim();

      if (!output && !error) {
        return { output: '(No output)', execution_failed: false };
      }

      if (error) {
        return {
          output: error,
          execution_failed: true,
          error: 'Program execution resulted in error',
          runtime_error: this.parseRuntimeError('Python', error),
        };
      }

      return { output, execution_failed: false };
    } catch (error) {
      return {
        output: '',
        execution_failed: true,
        error: `Failed to execute Python: ${error.message}`,
        runtime_error: this.createGenericRuntimeError(error.message),
      };
    } finally {
      try {
        if (fs.existsSync(tempFile)) {
          fs.unlinkSync(tempFile);
        }
      } catch (_cleanupError) {
        // Ignore cleanup errors
      }
    }
  }

  static buildJavaScriptExecutionSource(code) {
    const inputShim = [
      "const __stdin = require('fs').readFileSync(0, 'utf8');",
      'const __inputLines = __stdin.split(/\\r?\\n/);',
      'let __inputIndex = 0;',
      'globalThis.input = function input() {',
      '  if (__inputIndex >= __inputLines.length || (__inputIndex === __inputLines.length - 1 && __inputLines[__inputIndex] === "")) {',
      "    throw new Error('InputRequiredError: No more input values available');",
      '  }',
      '  return __inputLines[__inputIndex++];',
      '};',
      'globalThis.prompt = globalThis.input;',
    ].join('\n');

    return `${inputShim}\n\n${code}`;
  }

  static executeJavaScript(code, stdinInput = '') {
    if (this.hasInputCalls('JavaScript', code) && !stdinInput.trim()) {
      const runtimeError = this.getInputRequiredRuntimeError('JavaScript');
      return {
        output: '',
        execution_failed: true,
        error: runtimeError.message,
        runtime_error: runtimeError,
      };
    }

    const tempDir = os.tmpdir();
    const tempFile = path.join(tempDir, `temp-${Date.now()}.js`);

    try {
      const executableCode = this.buildJavaScriptExecutionSource(code);
      fs.writeFileSync(tempFile, executableCode, 'utf8');

      const result = spawnSync('node', ['--disallow-code-generation-from-strings', tempFile], {
        encoding: 'utf8',
        timeout: 5000,
        maxBuffer: 1024 * 1024,
        cwd: tempDir,
        input: stdinInput,
      });

      if (result.error && result.error.code === 'ETIMEDOUT') {
        return {
          output: '',
          execution_failed: true,
          error: 'Program execution timed out',
          runtime_error: {
            type: 'TimeoutError',
            message: 'Program execution timed out',
            ...this.getErrorKnowledgeBase('JavaScript').TimeoutError,
          },
        };
      }

      const output = (result.stdout || '').trim();
      const error = (result.stderr || '').trim();

      if (!output && !error) {
        return { output: '(No output)', execution_failed: false };
      }

      if (error) {
        if (/InputRequiredError/i.test(error)) {
          const inputError = this.getInputRequiredRuntimeError('JavaScript');
          return {
            output: error,
            execution_failed: true,
            error: inputError.message,
            runtime_error: inputError,
          };
        }

        return {
          output: error,
          execution_failed: true,
          error: 'Program execution resulted in error',
          runtime_error: this.parseRuntimeError('JavaScript', error),
        };
      }

      return { output, execution_failed: false };
    } catch (error) {
      return {
        output: '',
        execution_failed: true,
        error: `Failed to execute JavaScript: ${error.message}`,
        runtime_error: this.createGenericRuntimeError(error.message),
      };
    } finally {
      try {
        if (fs.existsSync(tempFile)) {
          fs.unlinkSync(tempFile);
        }
      } catch (_cleanupError) {
        // Ignore cleanup errors
      }
    }
  }

  static executeJava(_code) {
    return {
      output: '',
      execution_failed: true,
      error: 'Java execution requires compilation. Please compile and run manually.',
      runtime_error: {
        type: 'ExecutionNotSupported',
        message: 'Java runtime execution is not enabled in this environment.',
        explanation: 'Java code requires compilation before execution.',
        why: 'The sandbox currently executes interpreted languages only.',
        fix: 'Compile Java code with javac and run with java, or test a Python/JavaScript snippet.',
      },
    };
  }

  static executeCpp(_code) {
    return {
      output: '',
      execution_failed: true,
      error: 'C++ execution requires compilation. Please compile with g++ and run manually.',
      runtime_error: {
        type: 'ExecutionNotSupported',
        message: 'C++ runtime execution is not enabled in this environment.',
        explanation: 'C++ code requires compilation before execution.',
        why: 'The sandbox currently executes interpreted languages only.',
        fix: 'Compile with g++ and run the binary, or test a Python/JavaScript snippet.',
      },
    };
  }

  static executeC(_code) {
    return {
      output: '',
      execution_failed: true,
      error: 'C execution requires compilation. Please compile with gcc and run manually.',
      runtime_error: {
        type: 'ExecutionNotSupported',
        message: 'C runtime execution is not enabled in this environment.',
        explanation: 'C code requires compilation before execution.',
        why: 'The sandbox currently executes interpreted languages only.',
        fix: 'Compile with gcc and run the binary, or test a Python/JavaScript snippet.',
      },
    };
  }
}

module.exports = CodeExecutor;

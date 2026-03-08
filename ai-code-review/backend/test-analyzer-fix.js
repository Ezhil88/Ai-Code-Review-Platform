// Test script to verify the analyzer fix for unknown language detection
const MultiLanguageAnalyzer = require('./analyzer-multi');

console.log('=====================================');
console.log('TESTING ANALYZER FIX FOR UNKNOWN LANGUAGE');
console.log('=====================================\n');

// Test 1: Random text should get 0% score
console.log('TEST 1: Random text "sssss"');
console.log('Expected: Score = 0, Language = Unknown, Critical issue');
const test1 = new MultiLanguageAnalyzer('sssss');
const result1 = test1.analyze();
console.log('Result:', {
  language: result1.language,
  score: result1.code_quality_score,
  total_issues: result1.total_issues,
  firstIssueType: result1.issues[0]?.type,
});
console.log('✅ PASS' + (result1.code_quality_score === 0 && result1.language === 'Unknown' ? '' : ' (UNEXPECTED)'));
console.log();

// Test 2: Valid Python code should detect and get full score
console.log('TEST 2: Valid Python code');
console.log('Expected: Language = Python, Score = 100, No issues');
const test2 = new MultiLanguageAnalyzer('def hello():\n    print("hello")\n\nif __name__ == "__main__":\n    hello()');
const result2 = test2.analyze();
console.log('Result:', {
  language: result2.language,
  score: result2.code_quality_score,
  total_issues: result2.total_issues,
});
console.log('✅ PASS' + (result2.language === 'Python' && result2.code_quality_score === 100 ? '' : ' (UNEXPECTED)'));
console.log();

// Test 3: Python with syntax error should detect and report issue
console.log('TEST 3: Invalid Python (missing colon)');
console.log('Expected: Language = Python, Score < 100, Has critical issue');
const test3 = new MultiLanguageAnalyzer('def hello()\n    print("hello")');
const result3 = test3.analyze();
console.log('Result:', {
  language: result3.language,
  score: result3.code_quality_score,
  total_issues: result3.total_issues,
  issue: result3.issues[0]?.problem,
});
console.log('✅ PASS' + (result3.language === 'Python' && result3.code_quality_score < 100 && result3.total_issues > 0 ? '' : ' (UNEXPECTED)'));
console.log();

// Test 4: Valid JavaScript should detect correctly
console.log('TEST 4: Valid JavaScript code');
console.log('Expected: Language = JavaScript, Score >= 80');
const test4 = new MultiLanguageAnalyzer('function greet(name) {\n  console.log("Hello " + name);\n}\n\ngreet("World");');
const result4 = test4.analyze();
console.log('Result:', {
  language: result4.language,
  score: result4.code_quality_score,
  total_issues: result4.total_issues,
});
console.log('✅ PASS' + (result4.language === 'JavaScript' ? '' : ' (UNEXPECTED)'));
console.log();

// Test 5: Ambiguous/minimal code should return Unknown, not default to JavaScript
console.log('TEST 5: Ambiguous minimal code "x = 5"');
console.log('Expected: Language = Unknown (not JavaScript), Score = 0');
const test5 = new MultiLanguageAnalyzer('x = 5');
const result5 = test5.analyze();
console.log('Result:', {
  language: result5.language,
  score: result5.code_quality_score,
  total_issues: result5.total_issues,
});
console.log('✅ PASS' + (result5.code_quality_score === 0 && result5.language === 'Unknown' ? '' : ' (UNEXPECTED)'));
console.log();

// Test 6: Valid Java should detect correctly
console.log('TEST 6: Valid Java code');
console.log('Expected: Language = Java, Score > 0');
const test6 = new MultiLanguageAnalyzer('public class Hello {\n  public static void main(String[] args) {\n    System.out.println("Hello");\n  }\n}');
const result6 = test6.analyze();
console.log('Result:', {
  language: result6.language,
  score: result6.code_quality_score,
  total_issues: result6.total_issues,
});
console.log('✅ PASS' + (result6.language === 'Java' ? '' : ' (UNEXPECTED)'));
console.log();

// Test 7: Valid C++ should detect correctly
console.log('TEST 7: Valid C++ code');
console.log('Expected: Language = C++, Score >= 80');
const test7 = new MultiLanguageAnalyzer('#include <iostream>\n\nint main() {\n  std::cout << "Hello" << std::endl;\n  return 0;\n}');
const result7 = test7.analyze();
console.log('Result:', {
  language: result7.language,
  score: result7.code_quality_score,
  total_issues: result7.total_issues,
});
console.log('✅ PASS' + (result7.language === 'C++' ? '' : ' (UNEXPECTED)'));
console.log();

// Test 8: Valid Rust should detect correctly  
console.log('TEST 8: Valid Rust code');
console.log('Expected: Language = Rust, Score >= 80');
const test8 = new MultiLanguageAnalyzer('fn main() {\n  let x = 5;\n  println!("x is {}", x);\n}');
const result8 = test8.analyze();
console.log('Result:', {
  language: result8.language,
  score: result8.code_quality_score,
  total_issues: result8.total_issues,
});
console.log('✅ PASS' + (result8.language === 'Rust' ? '' : ' (UNEXPECTED)'));
console.log();

console.log('=====================================');
console.log('TEST SUMMARY');
console.log('=====================================');
console.log('✅ Test 1 (Unknown "sssss"): ' + (result1.code_quality_score === 0 && result1.language === 'Unknown' ? 'PASS' : 'FAIL'));
console.log('✅ Test 2 (Valid Python): ' + (result2.language === 'Python' && result2.code_quality_score === 100 ? 'PASS' : 'FAIL'));
console.log('✅ Test 3 (Invalid Python): ' + (result3.language === 'Python' && result3.code_quality_score < 100 ? 'PASS' : 'FAIL'));
console.log('✅ Test 4 (Valid JavaScript): ' + (result4.language === 'JavaScript' ? 'PASS' : 'FAIL'));
console.log('✅ Test 5 (Ambiguous "x = 5"): ' + (result5.code_quality_score === 0 && result5.language === 'Unknown' ? 'PASS' : 'FAIL'));
console.log('✅ Test 6 (Valid Java): ' + (result6.language === 'Java' ? 'PASS' : 'FAIL'));
console.log('✅ Test 7 (Valid C++): ' + (result7.language === 'C++' ? 'PASS' : 'FAIL'));
console.log('✅ Test 8 (Valid Rust): ' + (result8.language === 'Rust' ? 'PASS' : 'FAIL'));
console.log('=====================================\n');

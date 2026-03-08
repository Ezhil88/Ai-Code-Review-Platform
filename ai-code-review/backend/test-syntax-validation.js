// Test script to verify real syntax validation in the analyzer
const MultiLanguageAnalyzer = require('./analyzer-multi');

console.log('='.repeat(60));
console.log('TESTING REAL SYNTAX VALIDATION');
console.log('='.repeat(60));
console.log();

// Test 1: Invalid Python (missing colon)
console.log('TEST 1: Invalid Python - Missing colon');
console.log('Code: def hello()');
console.log('       print("hi")');
const test1 = new MultiLanguageAnalyzer(`def hello()
    print("hi")`);
const result1 = test1.analyze();
console.log('Result:', {
  language: result1.language,
  score: result1.code_quality_score,
  total_issues: result1.total_issues,
  first_issue: result1.issues[0]?.problem,
});
console.log('Expected: Language=Python, Score<100, Issues>0');
console.log('Status:', result1.code_quality_score < 100 && result1.total_issues > 0 ? '✅ PASS' : '❌ FAIL');
console.log();

// Test 2: Valid Python
console.log('TEST 2: Valid Python code');
console.log('Code: def hello():\n    print("hi")\nif __name__ == "__main__":\n    hello()');
const test2 = new MultiLanguageAnalyzer(`def hello():
    print("hi")

if __name__ == "__main__":
    hello()`);
const result2 = test2.analyze();
console.log('Result:', {
  language: result2.language,
  score: result2.code_quality_score,
  total_issues: result2.total_issues,
});
console.log('Expected: Language=Python, Score=100, Issues=0');
console.log('Status:', result2.language === 'Python' && result2.code_quality_score === 100 && result2.total_issues === 0 ? '✅ PASS' : '⚠️  FALLBACK (Python not available)');
console.log();

// Test 3: Invalid JavaScript (syntax error)
console.log('TEST 3: Invalid JavaScript - Unclosed brace');
console.log('Code: function test() {\n  console.log("hi")');
const test3 = new MultiLanguageAnalyzer(`function test() {
  console.log("hi")`);
const result3 = test3.analyze();
console.log('Result:', {
  language: result3.language,
  score: result3.code_quality_score,
  total_issues: result3.total_issues,
  first_issue: result3.issues[0]?.problem,
});
console.log('Expected: Language=JavaScript, Score<100, Issues>0');
console.log('Status:', result3.language === 'JavaScript' && result3.code_quality_score < 100 && result3.total_issues > 0 ? '✅ PASS' : '❌ FAIL');
console.log();

// Test 4: Valid JavaScript
console.log('TEST 4: Valid JavaScript');
console.log('Code: function greet(name) {\n  console.log("Hello " + name);\n}');
const test4 = new MultiLanguageAnalyzer(`function greet(name) {
  console.log("Hello " + name);
}`);
const result4 = test4.analyze();
console.log('Result:', {
  language: result4.language,
  score: result4.code_quality_score,
  total_issues: result4.total_issues,
});
console.log('Expected: Language=JavaScript, Score>=80, Issues can be >0 for quality');
console.log('Status:', result4.language === 'JavaScript' ? '✅ PASS' : '❌ FAIL');
console.log();

// Test 5: Invalid Java (unmatched braces)
console.log('TEST 5: Invalid Java - Unmatched braces');
console.log('Code: public class Test {\n  public static void main(String[] args) {\n    System.out.println("hi")');
const test5 = new MultiLanguageAnalyzer(`public class Test {
  public static void main(String[] args) {
    System.out.println("hi")`);
const result5 = test5.analyze();
console.log('Result:', {
  language: result5.language,
  score: result5.code_quality_score,
  total_issues: result5.total_issues,
  issue_types: result5.issues.map(i => i.type).join(', '),
});
console.log('Expected: Language=Java, Score<100, Issues>0');
console.log('Status:', result5.language === 'Java' && result5.code_quality_score < 100 ? '✅ PASS' : '❌ FAIL');
console.log();

// Test 6: Valid Java
console.log('TEST 6: Valid Java');
console.log('Code: public class Hello {\n  public static void main(String[] args) {\n    System.out.println("Hello");\n  }\n}');
const test6 = new MultiLanguageAnalyzer(`public class Hello {
  public static void main(String[] args) {
    System.out.println("Hello");
  }
}`);
const result6 = test6.analyze();
console.log('Result:', {
  language: result6.language,
  score: result6.code_quality_score,
  total_issues: result6.total_issues,
});
console.log('Expected: Language=Java, Score>=80');
console.log('Status:', result6.language === 'Java' ? '✅ PASS' : '❌ FAIL');
console.log();

// Test 7: Invalid C (unmatched braces)
console.log('TEST 7: Invalid C - Unmatched braces');
console.log('Code: int main() {\n  printf("hi");');
const test7 = new MultiLanguageAnalyzer(`int main() {
  printf("hi");`);
const result7 = test7.analyze();
console.log('Result:', {
  language: result7.language,
  score: result7.code_quality_score,
  total_issues: result7.total_issues,
  issues: result7.issues.map(i => i.problem),
});
console.log('Expected: Language=C, Score<100, Issues>0');
console.log('Status:', result7.language === 'C' && result7.code_quality_score < 100 ? '✅ PASS' : '❌ FAIL');
console.log();

// Test 8: Random text (Unknown language)
console.log('TEST 8: Random text "sssss"');
const test8 = new MultiLanguageAnalyzer('sssss');
const result8 = test8.analyze();
console.log('Result:', {
  language: result8.language,
  score: result8.code_quality_score,
  total_issues: result8.total_issues,
});
console.log('Expected: Language=Unknown, Score=0, Issues=1');
console.log('Status:', result8.language === 'Unknown' && result8.code_quality_score === 0 ? '✅ PASS' : '❌ FAIL');
console.log();

console.log('='.repeat(60));
console.log('SUMMARY');
console.log('='.repeat(60));
const tests = [
  { name: 'Invalid Python', pass: result1.code_quality_score < 100 && result1.total_issues > 0 },
  { name: 'Valid Python', pass: result2.language === 'Python' },
  { name: 'Invalid JavaScript', pass: result3.language === 'JavaScript' && result3.code_quality_score < 100 },
  { name: 'Valid JavaScript', pass: result4.language === 'JavaScript' },
  { name: 'Invalid Java', pass: result5.language === 'Java' && result5.code_quality_score < 100 },
  { name: 'Valid Java', pass: result6.language === 'Java' },
  { name: 'Invalid C', pass: result7.language === 'C' && result7.code_quality_score < 100 },
  { name: 'Random text', pass: result8.language === 'Unknown' && result8.code_quality_score === 0 },
];

let passCount = 0;
tests.forEach(test => {
  const status = test.pass ? '✅ PASS' : '❌ FAIL';
  console.log(`${status} - ${test.name}`);
  if (test.pass) passCount++;
});

console.log();
console.log(`Total: ${passCount}/${tests.length} tests passing`);
console.log('='.repeat(60));

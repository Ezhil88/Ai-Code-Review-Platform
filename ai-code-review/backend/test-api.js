const http = require('http');

const testCases = [
  { name: 'Invalid "5"', code: '5' },
  { name: 'Random "sssss"', code: 'sssss' },
  { name: 'Python missing colon', code: 'def hello()\n    print("hi")' },
  { name: 'Valid Python', code: 'def hello():\n    print("hello")\nif __name__ == "__main__":\n    hello()' },
  { name: 'Valid JavaScript', code: 'function greet(name) {\n  console.log("Hello " + name);\n}' },
];

async function test(testCase) {
  return new Promise((resolve) => {
    const postData = JSON.stringify({ code: testCase.code });
    const req = http.request('http://localhost:5000/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': postData.length }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          console.log(`\n✅ ${testCase.name}`);
          console.log(`   Language: ${json.language}, Score: ${json.code_quality_score}, Issues: ${json.total_issues}`);
          if (json.issues[0]) {
            console.log(`   Issue: ${json.issues[0].type} - ${json.issues[0].problem}`);
          }
        } catch (e) {
          console.log(`\n❌ ${testCase.name}: ${e.message}`);
        }
        resolve();
      });
    });
    req.on('error', e => { console.log(`\n❌ Error: ${e.message}`); resolve(); });
    req.write(postData);
    req.end();
  });
}

(async () => {
  console.log('🚀 Testing AI Code Review Backend API\n' + '='.repeat(50));
  for (const tc of testCases) {
    await test(tc);
  }
  console.log('\n' + '='.repeat(50) + '\n✅ All tests completed!');
})();

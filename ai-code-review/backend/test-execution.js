const http = require('http');

const tests = [
  { name: 'Python Hello World', code: 'print("Hello from Python!")' },
  { name: 'JavaScript Hello World', code: 'console.log("Hello from JavaScript!");' },
  { name: 'Python with Variables', code: 'x = 5\ny = 10\nprint("Sum:", x + y)' },
  { name: 'JavaScript Calculator', code: 'console.log("2 + 3 =", 2 + 3);' },
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
          console.log(`   Language: ${json.language}, Score: ${json.code_quality_score}`);
          console.log(`   Output: ${json.output || '(no output)'}`);
          if (json.execution_error) {
            console.log(`   Error: ${json.execution_error}`);
          }
        } catch (e) {
          console.log(`\n❌ ${testCase.name}: ${e.message}`);
        }
        resolve();
      });
    });
    req.on('error', e => { console.log(`Error: ${e.message}`); resolve(); });
    req.write(postData);
    req.end();
  });
}

(async () => {
  console.log('🚀 Testing Code Execution Feature\n' + '='.repeat(50));
  for (const tc of tests) {
    await test(tc);
  }
  console.log('\n' + '='.repeat(50) + '\n✅ All tests completed!');
})();

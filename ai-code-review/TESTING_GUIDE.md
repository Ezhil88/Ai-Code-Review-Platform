# Multi-Language Testing Guide

Quick reference for testing the multi-language code analyzer.

## Quick Test Snippets

### 🐍 Python
```python
def calculate_sum():  # Missing colon here
    x = 5
    y = 10
    return x + y
```

**Expected Issues:**
- Missing ':' after function definition
- Potential indentation problems

---

### ⚡ JavaScript
```javascript
var counter = 0;
let unused = "never used again";

if (x = 5) {  // Assignment in condition
    console.log("Value is " + x);
}

eval("dangerous code");
```

**Expected Issues:**
- `var` usage (should use const/let)
- Unused variable
- Assignment in conditional
- `eval()` security issue
- Old console method

---

### ☕ Java
```java
public class myClass {
    public void handleError(Exception e) {  // Generic exception
        System.out.println("Error: " + e);
    }
}
```

**Expected Issues:**
- Class name not PascalCase
- Generic Exception catch (too broad)

---

### 🔧 C
```c
#include <stdio.h>
#include <string.h>

int main() {
    char buffer[10];
    strcpy(buffer, "This is a long string that will overflow");
    return 0;
}
```

**Expected Issues:**
- Buffer overflow (strcpy without bounds check)
- Missing newline in output

---

### 🦀 Rust
```rust
fn main() {
    let x = Some(5);
    let y = x.unwrap();  // Will panic if None
    
    let mut a = 5;
    let mut_ref1 = &mut a;
    let mut_ref2 = &mut a;  // Multiple mutable refs
}
```

**Expected Issues:**
- `unwrap()` without error handling
- Multiple mutable references

---

### 🐘 PHP
```php
<?php
$user_id = $_GET['id'];  // Unsanitized input

$query = "SELECT * FROM users WHERE id = " . $user_id;
$result = mysql_query($query);  // SQL injection risk

echo "Welcome " . $user_id;  // XSS risk
?>
```

**Expected Issues:**
- SQL injection vulnerability
- Unsanitized input output
- Missing input validation

---

## Manual Testing Procedure

### Step 1: Prepare Test Code
Copy one of the above snippets to clipboard

### Step 2: Submit Analysis
1. Go to http://localhost:5181
2. Paste code in editor
3. Click "Analyze Code"

### Step 3: Verify Language Detection
- ✅ Language badge appears (e.g., "Python", "Java")
- ✅ Badge shows in blue with Code2 icon
- ✅ Positioned in ResultPanel header

### Step 4: Check Analysis Results
- ✅ Total issues detected correctly
- ✅ Quality score calculated
- ✅ Severity colors match (Critical=red, Error=orange, etc.)
- ✅ Language-specific issues identified

### Step 5: Verify Language Support Page
1. Click "Languages" in navbar
2. ✅ All 10 language cards display
3. ✅ Features list for each language
4. ✅ Quality score explanation visible

---

## Expected Results by Language

| Language | Test File | Expected Issues | Quality Score |
|----------|-----------|-----------------|----------------|
| Python | test.py | 1+ (colons, indentation) | <100 |
| JavaScript | test.js | 3+ (var, console, unused) | <90 |
| Java | Test.java | 2+ (naming, exceptions) | <95 |
| C | test.c | 1+ (buffer overflow) | <85 |
| Rust | main.rs | 2+ (unwrap, borrowing) | <90 |
| PHP | test.php | 3+ (SQL, XSS, input) | <85 |

---

## Automated Test Cases

### Test 1: Language Detection Accuracy
```python
languages = {
    'Python': 'def hello():\n    pass',
    'JavaScript': 'function hello() {}',
    'Java': 'public class Hello {}',
    'C': '#include <stdio.h>\nint main() {}',
    'Go': 'func main() {}',
    'Rust': 'fn main() {}',
}

for lang, code in languages.items():
    result = analyze(code)
    assert result['language'] == lang
```

### Test 2: Quality Score Enforcement
```python
# Zero issues = 100% score
result = analyze("# Clean Python code\nprint('hello')")
assert result['code_quality_score'] == 100

# Issues = <100% score
result = analyze("def hello()\n    pass")
assert result['code_quality_score'] < 100
assert result['total_issues'] > 0
```

### Test 3: Severity Calculation
```python
# Critical = -15 points
# Error = -10 points  
# Warning = -5 points
# Info = -2 points

# 1 Critical + 1 Error = 100 - 15 - 10 = 75
result = analyze(code_with_critical_and_error)
assert 70 <= result['code_quality_score'] <= 80
```

---

## Browser Testing Checklist

### UI Components
- [ ] ResultPanel displays language badge
- [ ] Badge shows correct language name
- [ ] Badge icon and styling is correct
- [ ] Badge animates in (scale 0→1, 0.2s delay)
- [ ] IssuesList shows language-specific issues
- [ ] QualityScoreDisplay updates with correct score

### Navigation
- [ ] Navbar has "Languages" link
- [ ] Languages link navigates to `/languages`
- [ ] LanguageSupport page loads without errors
- [ ] Page shows all 10 language cards

### LanguageSupport Page
- [ ] Header displays correctly
- [ ] Language grid responsive (5 cols desktop)
- [ ] Each card shows language + features
- [ ] "✓ Supported" badge visible on each
- [ ] Comparison table displays both sections
- [ ] Quality score explanation clear
- [ ] All animations smooth and visible

### Result Panel
- [ ] Download report includes language info
- [ ] Report shows "🔍 DETECTED LANGUAGE: Python" (etc.)
- [ ] Copy to clipboard works
- [ ] Issue details show code examples
- [ ] Severity colors correct

---

## Backend Testing

### Test Language Detection
```bash
curl -X POST http://localhost:5000/analyze \
  -H "Content-Type: application/json" \
  -d '{"code":"def hello():\n    return True"}'
```

Expected response contains: `"language":"Python"`

### Test Issue Detection
```bash
curl -X POST http://localhost:5000/analyze \
  -H "Content-Type: application/json" \
  -d '{"code":"def hello()\n    pass"}'
```

Expected: `"total_issues":1` with Critical/Error level issue

### Monitor Server Logs
```
[MultiLanguageAnalyzer] Detected language: Python
[MultiLanguageAnalyzer] Found 1 issue(s)
[Server] Analysis complete - Language: Python
```

---

## Debugging Tips

### Language Not Detected Correctly?
1. Check console logs: "[MultiLanguageAnalyzer] Detected language: X"
2. Inspect network tab: See JSON response with language field
3. Review detection patterns in `backend/analyzer-multi.js` line ~130

### Quality Score Wrong?
1. Verify issue count: Compare UI count vs total_issues in response
2. Check scoring formula: Total - (Critical×15 + Error×10 + Warning×5 + Info×2)
3. Confirm 100% rule: `code_quality_score === 100` only when `total_issues === 0`

### Issues Not Showing?
1. Check network response has issues array
2. Verify language-specific analyzer triggered
3. Look for browser console errors
4. Check ResultPanel component render logic

---

## Performance Testing

### Large File Analysis
1. Create Python file with 5000+ lines
2. Submit to analyzer
3. Should complete in <2 seconds
4. Quality score should calculate correctly

### Memory Testing
1. Submit 50 consecutive analyses
2. Monitor browser task manager
3. Verify memory stays stable (<500MB)
4. Check for memory leaks

---

## Success Criteria

✅ **Phase 11 Complete When:**

1. **Multi-Language Detection**
   - [ ] All 10 languages detect correctly
   - [ ] Language badge displays in UI
   - [ ] Backend logs show detected language

2. **Language-Specific Analysis**
   - [ ] Python detects colons, indentation
   - [ ] JavaScript detects var, unused vars
   - [ ] Java detects class naming, exceptions
   - [ ] C detects memory issues
   - [ ] Rust detects borrow checker issues

3. **UI/UX**
   - [ ] Language badge visible and animated
   - [ ] Languages page accessible and clear
   - [ ] Navigation updated
   - [ ] Responsive on mobile

4. **Quality Score**
   - [ ] Scores correctly calculated
   - [ ] 100% only when zero issues
   - [ ] Severity deductions applied
   - [ ] Consistent across languages

5. **Documentation**
   - [ ] MULTI_LANGUAGE_GUIDE.md complete
   - [ ] Language support page live
   - [ ] README updated with language info
   - [ ] API documentation clear

---

## Report Generation Test

Test that downloaded reports include language info:

```
📊 AI CODE REVIEW REPORT
═══════════════════════════════════════

🔍 DETECTED LANGUAGE: Python
📈 Code Quality Score: 78/100
⚠️  Total Issues: 3

SEVERITY BREAKDOWN:
├─ Critical: 0
├─ Error: 1
├─ Warning: 2
└─ Info: 0

[Rest of report...]
```

---

## Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Language shows "Unknown" | Detection failed | Review pattern matching in analyzer-multi.js |
| Quality score always 100 | Issues not detected | Check language analyzer method is called |
| Badge doesn't animate | CSS issue | Verify Framer Motion import and motion.div |
| Languages page 404 | Route not added | Check App.jsx has route for /languages |
| Server crash on analysis | Analyzer error | Check backend logs, review analyzer-multi.js |

---

Generated with 💙 by AI Code Review Platform

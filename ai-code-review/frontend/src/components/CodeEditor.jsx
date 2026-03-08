import Editor from '@monaco-editor/react';
import { Upload, FileText, Languages } from 'lucide-react';
import { useRef } from 'react';

export default function CodeEditor({ code, setCode, onAnalyze, isLoading, selectedLanguage, setSelectedLanguage }) {
  const fileInputRef = useRef(null);
  const lineCount = code.split('\n').length;
  const editorLanguage = selectedLanguage === 'auto' ? 'plaintext' : selectedLanguage;

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCode(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handleEditorChange = (value) => {
    setCode(value || '');
  };

  const languages = [
    { value: 'auto', label: 'Auto Detect' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'c', label: 'C' },
    { value: 'cpp', label: 'C++' },
    { value: 'csharp', label: 'C#' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
    { value: 'php', label: 'PHP' },
    { value: 'typescript', label: 'TypeScript' }
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Editor Toolbar */}
      <div 
        className="px-6 py-4 border-b flex items-center justify-between"
        style={{ borderColor: 'var(--border-color)' }}
      >
        <div className="flex items-center gap-4 flex-1">
          {/* Line Count */}
          <div className="flex items-center gap-2">
            <FileText size={16} style={{ color: 'var(--text-secondary)' }} />
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {lineCount} lines
            </span>
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-2">
            <Languages size={16} style={{ color: 'var(--text-secondary)' }} />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-3 py-1.5 rounded-md text-sm font-medium cursor-pointer"
              style={{
                background: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
                border: `1px solid var(--border-color)`,
                outline: 'none'
              }}
            >
              {languages.map(lang => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-2">
          {/* Upload Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="btn btn-secondary btn-sm"
          >
            <Upload size={14} />
            Upload
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".html,.htm,.css,.js,.jsx,.ts,.tsx,.py,.java,.cpp,.c,.cs,.go,.rb,.php,.rs"
            onChange={handleFileUpload}
            className="hidden"
          />

          {/* Clear Button */}
          <button
            onClick={() => setCode('')}
            className="btn btn-secondary btn-sm"
            disabled={!code.trim()}
          >
            Clear
          </button>
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1 overflow-hidden relative editor">
        {code.length === 0 && (
          <div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
            style={{ background: 'linear-gradient(180deg, rgba(2, 6, 23, 0.5) 0%, rgba(2, 6, 23, 0.8) 100%)' }}
          >
            <p style={{ color: 'var(--text-tertiary)' }} className="text-center">
              Paste your code or upload a file to get started
            </p>
          </div>
        )}
        
        <Editor
          height="100%"
          language={editorLanguage}
          value={code}
          onChange={handleEditorChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            fontFamily: '"Consolas", "Monaco", "Courier New", monospace',
            fontLigatures: true,
            lineNumbers: 'on',
            lineNumbersMinChars: 3,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
            formatOnPaste: false,
            formatOnType: false,
            padding: { top: 16, bottom: 16 },
            scrollbar: {
              vertical: 'auto',
              horizontal: 'auto',
              useShadows: false,
              verticalSliderSize: 10,
              horizontalSliderSize: 10
            },
            glyphMargin: false,
            folding: true,
            wordWrapColumn: 100,
            find: {
              addExtraSpaceOnTop: false,
              autoFindInSelection: 'never',
              seedSearchStringFromSelection: 'always'
            }
          }}
        />
      </div>
    </div>
  );
}


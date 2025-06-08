
import React, { useState } from 'react';
import { Play, Save, Folder, FileText, Settings, Terminal, Search, Download } from 'lucide-react';

const WitCode: React.FC = () => {
  const [code, setCode] = useState(`// Witaj w WitCode IDE!
// To jest zaawansowany edytor kodu z podświetlaniem składni

function witajWWitnicy() {
    console.log("Witaj w najlepszym IDE dla Witnicy!");
    
    // Przykład prostej funkcji
    const mieszkancy = [
        "Jan Kowalski",
        "Anna Nowak", 
        "Piotr Wiśniewski"
    ];
    
    mieszkancy.forEach(mieszkaniec => {
        console.log(\`Mieszkaniec: \${mieszkaniec}\`);
    });
    
    return "Witnica - najlepsze miasto!";
}

// Wywołaj funkcję
witajWWitnicy();

// TODO: Dodaj więcej funkcjonalności
// FIXME: Optymalizuj wydajność`);

  const [activeTab, setActiveTab] = useState('app.js');
  const [output, setOutput] = useState('');
  const [showTerminal, setShowTerminal] = useState(false);

  const tabs = [
    { name: 'app.js', icon: '📄', language: 'javascript' },
    { name: 'style.css', icon: '🎨', language: 'css' },
    { name: 'index.html', icon: '🌐', language: 'html' }
  ];

  const runCode = () => {
    try {
      const originalLog = console.log;
      const logs: string[] = [];
      
      console.log = (...args) => {
        logs.push(args.join(' '));
      };
      
      eval(code);
      
      console.log = originalLog;
      setOutput(logs.join('\n'));
      setShowTerminal(true);
    } catch (error) {
      setOutput(`Błąd: ${error}`);
      setShowTerminal(true);
    }
  };

  const highlightSyntax = (code: string) => {
    return code
      .replace(/(function|const|let|var|if|else|for|while|return|class|import|export|from)/g, '<span style="color: #0066cc; font-weight: bold;">$1</span>')
      .replace(/(\/\/.*$)/gm, '<span style="color: #008000;">$1</span>')
      .replace(/(".*?")/g, '<span style="color: #cc6600;">$1</span>')
      .replace(/(`.*?`)/g, '<span style="color: #cc6600;">$1</span>')
      .replace(/(console\.log|document\.querySelector|window\.)/g, '<span style="color: #6600cc;">$1</span>');
  };

  const downloadCode = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeTab}`;
    a.click();
  };

  return (
    <div className="h-full flex flex-col bg-gray-900 text-white">
      {/* Menu Bar */}
      <div className="bg-gray-800 border-b border-gray-700 p-2 flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-1 px-3 py-1 hover:bg-gray-700 rounded">
            <Folder className="w-4 h-4" />
            <span className="text-sm">Plik</span>
          </button>
          <button className="flex items-center space-x-1 px-3 py-1 hover:bg-gray-700 rounded">
            <Settings className="w-4 h-4" />
            <span className="text-sm">Edycja</span>
          </button>
          <button className="flex items-center space-x-1 px-3 py-1 hover:bg-gray-700 rounded">
            <Search className="w-4 h-4" />
            <span className="text-sm">Widok</span>
          </button>
        </div>
        
        <div className="flex-1" />
        
        <div className="flex items-center space-x-2">
          <button onClick={runCode} className="flex items-center space-x-1 px-3 py-1 bg-green-600 hover:bg-green-700 rounded">
            <Play className="w-4 h-4" />
            <span className="text-sm">Uruchom</span>
          </button>
          <button onClick={downloadCode} className="p-2 hover:bg-gray-700 rounded" title="Pobierz">
            <Download className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded" title="Zapisz">
            <Save className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="bg-gray-800 border-b border-gray-700 flex items-center">
        {tabs.map(tab => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex items-center space-x-2 px-4 py-2 border-r border-gray-700 ${
              activeTab === tab.name ? 'bg-gray-900 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <span>{tab.icon}</span>
            <span className="text-sm">{tab.name}</span>
          </button>
        ))}
        <button className="p-2 text-gray-400 hover:text-white">+</button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 p-4">
          <h3 className="text-sm font-semibold mb-4 text-gray-300">EKSPLORATOR</h3>
          <div className="space-y-1">
            <div className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded cursor-pointer">
              <Folder className="w-4 h-4 text-blue-400" />
              <span className="text-sm">src</span>
            </div>
            <div className="ml-4 space-y-1">
              <div className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded cursor-pointer">
                <FileText className="w-4 h-4 text-yellow-400" />
                <span className="text-sm">app.js</span>
              </div>
              <div className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded cursor-pointer">
                <FileText className="w-4 h-4 text-blue-400" />
                <span className="text-sm">style.css</span>
              </div>
              <div className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded cursor-pointer">
                <FileText className="w-4 h-4 text-orange-400" />
                <span className="text-sm">index.html</span>
              </div>
            </div>
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 relative">
            {/* Line Numbers */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gray-800 border-r border-gray-700 p-2 text-xs text-gray-500">
              {code.split('\n').map((_, index) => (
                <div key={index} className="h-6 leading-6 text-right pr-2">
                  {index + 1}
                </div>
              ))}
            </div>
            
            {/* Code Editor */}
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full pl-14 p-4 bg-gray-900 text-white font-mono text-sm resize-none focus:outline-none"
              style={{ 
                fontFamily: 'Consolas, Monaco, monospace',
                lineHeight: '24px',
                tabSize: 2
              }}
              spellCheck={false}
            />
          </div>

          {/* Terminal */}
          {showTerminal && (
            <div className="h-48 bg-black border-t border-gray-700">
              <div className="flex items-center justify-between p-2 bg-gray-800 border-b border-gray-700">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-4 h-4" />
                  <span className="text-sm">Terminal</span>
                </div>
                <button 
                  onClick={() => setShowTerminal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ×
                </button>
              </div>
              <div className="p-4 font-mono text-sm text-green-400 overflow-auto h-32">
                <div className="mb-2">$ node app.js</div>
                <pre className="whitespace-pre-wrap">{output}</pre>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-blue-600 flex items-center justify-between px-4 text-xs">
        <div className="flex items-center space-x-4">
          <span>JavaScript</span>
          <span>UTF-8</span>
          <span>LF</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>Ln {code.split('\n').length}, Col 1</span>
          <span>WitCode IDE v1.0</span>
        </div>
      </div>
    </div>
  );
};

export default WitCode;

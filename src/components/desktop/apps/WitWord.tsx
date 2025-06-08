
import React, { useState, useRef } from 'react';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Save, FileText, Type, Palette } from 'lucide-react';

const WitWord: React.FC = () => {
  const [content, setContent] = useState('<p>Witaj w WitWord! Zacznij pisać swój dokument...</p>');
  const [fontSize, setFontSize] = useState(14);
  const [fontFamily, setFontFamily] = useState('Arial');
  const [textColor, setTextColor] = useState('#000000');
  const editorRef = useRef<HTMLDivElement>(null);

  const executeCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  const handleSave = () => {
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dokument.html';
    a.click();
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Toolbar */}
      <div className="border-b border-gray-300 p-2 flex items-center space-x-2 bg-gray-50">
        <button onClick={handleSave} className="p-2 hover:bg-gray-200 rounded" title="Zapisz">
          <Save className="w-4 h-4" />
        </button>
        
        <div className="w-px h-6 bg-gray-300" />
        
        <select 
          value={fontFamily} 
          onChange={(e) => {
            setFontFamily(e.target.value);
            executeCommand('fontName', e.target.value);
          }}
          className="border rounded px-2 py-1 text-sm"
        >
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Calibri">Calibri</option>
          <option value="Georgia">Georgia</option>
        </select>
        
        <select 
          value={fontSize} 
          onChange={(e) => {
            setFontSize(Number(e.target.value));
            executeCommand('fontSize', '3');
            if (editorRef.current) {
              const selection = window.getSelection();
              if (selection && selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                const span = document.createElement('span');
                span.style.fontSize = e.target.value + 'px';
                range.surroundContents(span);
              }
            }
          }}
          className="border rounded px-2 py-1 text-sm w-16"
        >
          <option value="10">10</option>
          <option value="12">12</option>
          <option value="14">14</option>
          <option value="16">16</option>
          <option value="18">18</option>
          <option value="24">24</option>
          <option value="36">36</option>
        </select>
        
        <div className="w-px h-6 bg-gray-300" />
        
        <button onClick={() => executeCommand('bold')} className="p-2 hover:bg-gray-200 rounded" title="Pogrubienie">
          <Bold className="w-4 h-4" />
        </button>
        <button onClick={() => executeCommand('italic')} className="p-2 hover:bg-gray-200 rounded" title="Kursywa">
          <Italic className="w-4 h-4" />
        </button>
        <button onClick={() => executeCommand('underline')} className="p-2 hover:bg-gray-200 rounded" title="Podkreślenie">
          <Underline className="w-4 h-4" />
        </button>
        
        <div className="w-px h-6 bg-gray-300" />
        
        <button onClick={() => executeCommand('justifyLeft')} className="p-2 hover:bg-gray-200 rounded" title="Wyrównaj do lewej">
          <AlignLeft className="w-4 h-4" />
        </button>
        <button onClick={() => executeCommand('justifyCenter')} className="p-2 hover:bg-gray-200 rounded" title="Wycentruj">
          <AlignCenter className="w-4 h-4" />
        </button>
        <button onClick={() => executeCommand('justifyRight')} className="p-2 hover:bg-gray-200 rounded" title="Wyrównaj do prawej">
          <AlignRight className="w-4 h-4" />
        </button>
        
        <div className="w-px h-6 bg-gray-300" />
        
        <input 
          type="color" 
          value={textColor}
          onChange={(e) => {
            setTextColor(e.target.value);
            executeCommand('foreColor', e.target.value);
          }}
          className="w-8 h-8 border rounded cursor-pointer"
          title="Kolor tekstu"
        />
      </div>

      {/* Ruler */}
      <div className="h-6 bg-gradient-to-r from-gray-100 to-gray-200 border-b flex items-center px-4">
        <div className="text-xs text-gray-600">Linijka - 21cm x 29.7cm (A4)</div>
      </div>

      {/* Editor */}
      <div className="flex-1 p-8 overflow-auto bg-gray-100">
        <div className="max-w-4xl mx-auto bg-white shadow-lg min-h-full">
          <div
            ref={editorRef}
            contentEditable
            className="p-8 min-h-96 focus:outline-none"
            style={{ 
              fontFamily, 
              fontSize: `${fontSize}px`,
              lineHeight: '1.6'
            }}
            onInput={() => {
              if (editorRef.current) {
                setContent(editorRef.current.innerHTML);
              }
            }}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-gray-100 border-t flex items-center justify-between px-4 text-xs text-gray-600">
        <span>Słowa: {content.replace(/<[^>]*>/g, '').split(' ').length}</span>
        <span>Znaki: {content.replace(/<[^>]*>/g, '').length}</span>
        <span>Strona 1 z 1</span>
      </div>
    </div>
  );
};

export default WitWord;

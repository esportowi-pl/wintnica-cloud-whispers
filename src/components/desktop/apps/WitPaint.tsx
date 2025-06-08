
import React, { useRef, useState, useEffect } from 'react';
import { Brush, Eraser, Square, Circle, Type, Palette, Download, Undo, Redo, Pipette } from 'lucide-react';

const WitPaint: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<'brush' | 'eraser' | 'rectangle' | 'circle' | 'text' | 'eyedropper'>('brush');
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const colors = [
    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', 
    '#FF00FF', '#00FFFF', '#FFA500', '#800080', '#FFC0CB', '#A52A2A'
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        saveToHistory();
      }
    }
  }, []);

  const saveToHistory = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(imageData);
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
      }
    }
  };

  const undo = () => {
    if (historyIndex > 0) {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          setHistoryIndex(historyIndex - 1);
          ctx.putImageData(history[historyIndex - 1], 0, 0);
        }
      }
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          setHistoryIndex(historyIndex + 1);
          ctx.putImageData(history[historyIndex + 1], 0, 0);
        }
      }
    }
  };

  const startDrawing = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (tool === 'eyedropper') {
      const imageData = ctx.getImageData(x, y, 1, 1);
      const [r, g, b] = imageData.data;
      const hexColor = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
      setColor(hexColor);
      return;
    }

    setIsDrawing(true);
    
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    
    if (tool === 'brush') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = color;
    } else if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
    }
    
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing || tool === 'eyedropper') return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (tool === 'brush' || tool === 'eraser') {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveToHistory();
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        saveToHistory();
      }
    }
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'wit-paint-drawing.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-100">
      {/* Toolbar */}
      <div className="border-b border-gray-300 p-2 flex items-center space-x-2 bg-white">
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setTool('brush')}
            className={`p-2 rounded ${tool === 'brush' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
            title="Pędzel"
          >
            <Brush className="w-4 h-4" />
          </button>
          <button
            onClick={() => setTool('eraser')}
            className={`p-2 rounded ${tool === 'eraser' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
            title="Gumka"
          >
            <Eraser className="w-4 h-4" />
          </button>
          <button
            onClick={() => setTool('rectangle')}
            className={`p-2 rounded ${tool === 'rectangle' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
            title="Prostokąt"
          >
            <Square className="w-4 h-4" />
          </button>
          <button
            onClick={() => setTool('circle')}
            className={`p-2 rounded ${tool === 'circle' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
            title="Koło"
          >
            <Circle className="w-4 h-4" />
          </button>
          <button
            onClick={() => setTool('eyedropper')}
            className={`p-2 rounded ${tool === 'eyedropper' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
            title="Pipeta"
          >
            <Pipette className="w-4 h-4" />
          </button>
        </div>

        <div className="w-px h-6 bg-gray-300" />

        <div className="flex items-center space-x-2">
          <label className="text-sm">Rozmiar:</label>
          <input
            type="range"
            min="1"
            max="50"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="w-20"
          />
          <span className="text-sm w-8">{brushSize}</span>
        </div>

        <div className="w-px h-6 bg-gray-300" />

        <button onClick={undo} className="p-2 hover:bg-gray-200 rounded" title="Cofnij">
          <Undo className="w-4 h-4" />
        </button>
        <button onClick={redo} className="p-2 hover:bg-gray-200 rounded" title="Ponów">
          <Redo className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-gray-300" />

        <button onClick={clearCanvas} className="p-2 hover:bg-gray-200 rounded" title="Wyczyść">
          Wyczyść
        </button>
        <button onClick={downloadImage} className="p-2 hover:bg-gray-200 rounded" title="Pobierz">
          <Download className="w-4 h-4" />
        </button>
      </div>

      {/* Color Palette */}
      <div className="border-b border-gray-300 p-2 bg-white">
        <div className="flex items-center space-x-2">
          <span className="text-sm">Kolory:</span>
          <div className="flex space-x-1">
            {colors.map(c => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-6 h-6 rounded border-2 ${color === c ? 'border-gray-800' : 'border-gray-300'}`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-8 h-6 border rounded cursor-pointer"
          />
          <div 
            className="w-8 h-6 border rounded"
            style={{ backgroundColor: color }}
          />
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 overflow-auto p-4">
        <div className="bg-white shadow-lg inline-block">
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            className="border border-gray-300 cursor-crosshair"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-gray-100 border-t flex items-center justify-between px-4 text-xs text-gray-600">
        <span>Narzędzie: {tool === 'brush' ? 'Pędzel' : tool === 'eraser' ? 'Gumka' : tool}</span>
        <span>Rozmiar: {brushSize}px</span>
        <span>Kolor: {color}</span>
      </div>
    </div>
  );
};

export default WitPaint;

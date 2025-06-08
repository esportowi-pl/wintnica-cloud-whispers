
import React, { useState, useRef, useEffect } from 'react';
import { 
  Save, Undo, Redo, Download, Upload, Grid, 
  Square, Circle, Move, Type, Minus, 
  ZoomIn, ZoomOut, RotateCcw, Layers, Ruler 
} from 'lucide-react';

interface DrawingElement {
  id: string;
  type: 'line' | 'rectangle' | 'circle' | 'text';
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  text?: string;
  layer: number;
}

const WitCAD: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentTool, setCurrentTool] = useState<'line' | 'rectangle' | 'circle' | 'move' | 'text'>('line');
  const [elements, setElements] = useState<DrawingElement[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [showGrid, setShowGrid] = useState(true);
  const [zoom, setZoom] = useState(100);
  const [activeLayer, setActiveLayer] = useState(1);
  const [snapToGrid, setSnapToGrid] = useState(true);
  const [history, setHistory] = useState<DrawingElement[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const gridSize = 20;

  const snapPoint = (x: number, y: number) => {
    if (!snapToGrid) return { x, y };
    return {
      x: Math.round(x / gridSize) * gridSize,
      y: Math.round(y / gridSize) * gridSize
    };
  };

  const drawGrid = (ctx: CanvasRenderingContext2D) => {
    if (!showGrid) return;
    
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 0.5;
    
    for (let x = 0; x <= ctx.canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, ctx.canvas.height);
      ctx.stroke();
    }
    
    for (let y = 0; y <= ctx.canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(ctx.canvas.width, y);
      ctx.stroke();
    }
  };

  const drawElements = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx);

    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;

    elements.forEach(element => {
      ctx.beginPath();
      
      switch (element.type) {
        case 'line':
          ctx.moveTo(element.startX, element.startY);
          ctx.lineTo(element.endX, element.endY);
          ctx.stroke();
          break;
        case 'rectangle':
          const width = element.endX - element.startX;
          const height = element.endY - element.startY;
          ctx.strokeRect(element.startX, element.startY, width, height);
          break;
        case 'circle':
          const radius = Math.sqrt(
            Math.pow(element.endX - element.startX, 2) + 
            Math.pow(element.endY - element.startY, 2)
          );
          ctx.arc(element.startX, element.startY, radius, 0, 2 * Math.PI);
          ctx.stroke();
          break;
        case 'text':
          ctx.font = '16px Arial';
          ctx.fillStyle = '#333';
          ctx.fillText(element.text || 'Text', element.startX, element.startY);
          break;
      }
    });
  };

  useEffect(() => {
    drawElements();
  }, [elements, showGrid]);

  const handleMouseDown = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const snapped = snapPoint(x, y);

    setStartPoint(snapped);
    setIsDrawing(true);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const snapped = snapPoint(x, y);

    const newElement: DrawingElement = {
      id: Date.now().toString(),
      type: currentTool === 'move' ? 'line' : currentTool,
      startX: startPoint.x,
      startY: startPoint.y,
      endX: snapped.x,
      endY: snapped.y,
      layer: activeLayer
    };

    if (currentTool === 'text') {
      const text = prompt('Wprowadź tekst:');
      if (text) {
        newElement.text = text;
        newElement.endX = startPoint.x;
        newElement.endY = startPoint.y;
      }
    }

    setElements(prev => [...prev, newElement]);
    setIsDrawing(false);
  };

  const exportDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const link = document.createElement('a');
    link.download = 'rysunek-cad.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="h-full flex bg-gray-100">
      {/* Left Toolbar */}
      <div className="w-16 bg-gray-800 text-white flex flex-col items-center py-4 space-y-2">
        <button
          onClick={() => setCurrentTool('line')}
          className={`p-2 rounded ${currentTool === 'line' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
          title="Linia"
        >
          <Minus className="w-5 h-5" />
        </button>
        <button
          onClick={() => setCurrentTool('rectangle')}
          className={`p-2 rounded ${currentTool === 'rectangle' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
          title="Prostokąt"
        >
          <Square className="w-5 h-5" />
        </button>
        <button
          onClick={() => setCurrentTool('circle')}
          className={`p-2 rounded ${currentTool === 'circle' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
          title="Koło"
        >
          <Circle className="w-5 h-5" />
        </button>
        <button
          onClick={() => setCurrentTool('text')}
          className={`p-2 rounded ${currentTool === 'text' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
          title="Tekst"
        >
          <Type className="w-5 h-5" />
        </button>
        <button
          onClick={() => setCurrentTool('move')}
          className={`p-2 rounded ${currentTool === 'move' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
          title="Przesuń"
        >
          <Move className="w-5 h-5" />
        </button>
      </div>

      {/* Main Drawing Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Menu */}
        <div className="h-12 bg-white border-b flex items-center px-4 space-x-4">
          <button className="flex items-center space-x-1 px-3 py-1 hover:bg-gray-100 rounded">
            <Upload className="w-4 h-4" />
            <span className="text-sm">Otwórz</span>
          </button>
          <button onClick={exportDrawing} className="flex items-center space-x-1 px-3 py-1 hover:bg-gray-100 rounded">
            <Save className="w-4 h-4" />
            <span className="text-sm">Zapisz</span>
          </button>
          
          <div className="w-px h-6 bg-gray-300" />
          
          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`p-2 rounded ${showGrid ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
            title="Siatka"
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setSnapToGrid(!snapToGrid)}
            className={`p-2 rounded ${snapToGrid ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
            title="Przyciąganie do siatki"
          >
            <Ruler className="w-4 h-4" />
          </button>

          <div className="flex-1" />

          <div className="flex items-center space-x-2">
            <button onClick={() => setZoom(Math.max(25, zoom - 25))} className="p-1 hover:bg-gray-100 rounded">
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-sm w-12 text-center">{zoom}%</span>
            <button onClick={() => setZoom(Math.min(400, zoom + 25))} className="p-1 hover:bg-gray-100 rounded">
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 overflow-auto bg-white">
          <canvas
            ref={canvasRef}
            width={1200}
            height={800}
            className="cursor-crosshair"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          />
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-48 bg-white border-l">
        <div className="p-4">
          <h3 className="text-sm font-medium mb-4">Warstwy</h3>
          <div className="space-y-2">
            {[1, 2, 3].map(layer => (
              <div
                key={layer}
                className={`p-2 rounded border cursor-pointer ${
                  layer === activeLayer ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
                onClick={() => setActiveLayer(layer)}
              >
                <span className="text-sm">Warstwa {layer}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WitCAD;

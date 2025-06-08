
import React, { useState, useRef, useEffect } from 'react';
import { 
  Save, Undo, Redo, Download, Upload, Layers, 
  Filter, Brush, Square, Circle, Move, Type, 
  ZoomIn, ZoomOut, RotateCcw, Eye, EyeOff 
} from 'lucide-react';

interface Layer {
  id: string;
  name: string;
  visible: boolean;
  opacity: number;
  canvas: HTMLCanvasElement;
}

const WitPhotoShop: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentTool, setCurrentTool] = useState<'brush' | 'rectangle' | 'circle' | 'move' | 'text'>('brush');
  const [brushSize, setBrushSize] = useState(5);
  const [currentColor, setCurrentColor] = useState('#000000');
  const [layers, setLayers] = useState<Layer[]>([]);
  const [activeLayerIndex, setActiveLayerIndex] = useState(0);
  const [zoom, setZoom] = useState(100);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  useEffect(() => {
    // Initialize first layer
    if (canvasRef.current && layers.length === 0) {
      const canvas = canvasRef.current;
      const newLayer: Layer = {
        id: '1',
        name: 'Warstwa 1',
        visible: true,
        opacity: 100,
        canvas: canvas
      };
      setLayers([newLayer]);
    }
  }, [layers]);

  const applyFilter = (filterType: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    switch (filterType) {
      case 'blur':
        // Simple blur effect
        ctx.filter = 'blur(2px)';
        ctx.drawImage(canvas, 0, 0);
        ctx.filter = 'none';
        break;
      case 'sepia':
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          data[i] = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));
          data[i + 1] = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168));
          data[i + 2] = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131));
        }
        ctx.putImageData(imageData, 0, 0);
        break;
      case 'grayscale':
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = avg;
          data[i + 1] = avg;
          data[i + 2] = avg;
        }
        ctx.putImageData(imageData, 0, 0);
        break;
    }
  };

  const addLayer = () => {
    const newLayer: Layer = {
      id: Date.now().toString(),
      name: `Warstwa ${layers.length + 1}`,
      visible: true,
      opacity: 100,
      canvas: document.createElement('canvas')
    };
    setLayers([...layers, newLayer]);
  };

  const toggleLayerVisibility = (index: number) => {
    const updatedLayers = [...layers];
    updatedLayers[index].visible = !updatedLayers[index].visible;
    setLayers(updatedLayers);
  };

  const exportImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const link = document.createElement('a');
    link.download = 'witphotoshop-projekt.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="h-full flex bg-gray-800 text-white">
      {/* Left Toolbar */}
      <div className="w-16 bg-gray-900 border-r border-gray-700 flex flex-col items-center py-4 space-y-2">
        <button
          onClick={() => setCurrentTool('brush')}
          className={`p-2 rounded ${currentTool === 'brush' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
          title="Pędzel"
        >
          <Brush className="w-5 h-5" />
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
          onClick={() => setCurrentTool('move')}
          className={`p-2 rounded ${currentTool === 'move' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
          title="Przesuń"
        >
          <Move className="w-5 h-5" />
        </button>
        <button
          onClick={() => setCurrentTool('text')}
          className={`p-2 rounded ${currentTool === 'text' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
          title="Tekst"
        >
          <Type className="w-5 h-5" />
        </button>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Menu */}
        <div className="h-12 bg-gray-900 border-b border-gray-700 flex items-center px-4 space-x-4">
          <button className="flex items-center space-x-1 px-3 py-1 hover:bg-gray-700 rounded">
            <Upload className="w-4 h-4" />
            <span className="text-sm">Otwórz</span>
          </button>
          <button onClick={exportImage} className="flex items-center space-x-1 px-3 py-1 hover:bg-gray-700 rounded">
            <Save className="w-4 h-4" />
            <span className="text-sm">Zapisz</span>
          </button>
          
          <div className="w-px h-6 bg-gray-600" />
          
          <button className="p-2 hover:bg-gray-700 rounded" title="Cofnij">
            <Undo className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded" title="Ponów">
            <Redo className="w-4 h-4" />
          </button>

          <div className="w-px h-6 bg-gray-600" />

          <button onClick={() => applyFilter('blur')} className="px-3 py-1 hover:bg-gray-700 rounded text-sm">
            Rozmycie
          </button>
          <button onClick={() => applyFilter('sepia')} className="px-3 py-1 hover:bg-gray-700 rounded text-sm">
            Sepia
          </button>
          <button onClick={() => applyFilter('grayscale')} className="px-3 py-1 hover:bg-gray-700 rounded text-sm">
            Szarość
          </button>

          <div className="flex-1" />

          <div className="flex items-center space-x-2">
            <button onClick={() => setZoom(Math.max(25, zoom - 25))} className="p-1 hover:bg-gray-700 rounded">
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-sm w-12 text-center">{zoom}%</span>
            <button onClick={() => setZoom(Math.min(400, zoom + 25))} className="p-1 hover:bg-gray-700 rounded">
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tool Options */}
        <div className="h-10 bg-gray-800 border-b border-gray-700 flex items-center px-4 space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm">Rozmiar:</span>
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
          
          <div className="flex items-center space-x-2">
            <span className="text-sm">Kolor:</span>
            <input
              type="color"
              value={currentColor}
              onChange={(e) => setCurrentColor(e.target.value)}
              className="w-8 h-6 rounded border border-gray-600"
            />
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 bg-gray-700 flex items-center justify-center overflow-hidden">
          <div className="bg-white" style={{ transform: `scale(${zoom / 100})` }}>
            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              className="border border-gray-400 cursor-crosshair"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            />
          </div>
        </div>
      </div>

      {/* Right Panel - Layers */}
      <div className="w-64 bg-gray-900 border-l border-gray-700">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium">Warstwy</h3>
            <button onClick={addLayer} className="p-1 hover:bg-gray-700 rounded">
              <Layers className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-2">
            {layers.map((layer, index) => (
              <div
                key={layer.id}
                className={`p-2 rounded border ${
                  index === activeLayerIndex ? 'border-blue-500 bg-blue-900/20' : 'border-gray-600'
                }`}
                onClick={() => setActiveLayerIndex(index)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm">{layer.name}</span>
                  <button
                    onClick={() => toggleLayerVisibility(index)}
                    className="p-1 hover:bg-gray-700 rounded"
                  >
                    {layer.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  </button>
                </div>
                <div className="mt-2">
                  <label className="text-xs text-gray-400">Przezroczystość:</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={layer.opacity}
                    onChange={(e) => {
                      const updatedLayers = [...layers];
                      updatedLayers[index].opacity = Number(e.target.value);
                      setLayers(updatedLayers);
                    }}
                    className="w-full mt-1"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WitPhotoShop;

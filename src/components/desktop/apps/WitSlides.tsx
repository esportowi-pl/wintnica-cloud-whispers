
import React, { useState } from 'react';
import { 
  Plus, Save, Download, Play, Square, Type, Image, 
  Circle, RotateCcw, Copy, Trash2, ChevronLeft, ChevronRight,
  AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline
} from 'lucide-react';

interface Slide {
  id: string;
  title: string;
  content: string;
  elements: SlideElement[];
  background: string;
}

interface SlideElement {
  id: string;
  type: 'text' | 'image' | 'shape';
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  style: Record<string, any>;
}

const WitSlides: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>([
    {
      id: '1',
      title: 'Slajd 1',
      content: 'Witaj w WitSlides!',
      elements: [],
      background: '#ffffff'
    }
  ]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [isPresenting, setIsPresenting] = useState(false);
  const [currentTool, setCurrentTool] = useState<'select' | 'text' | 'shape' | 'image'>('select');

  const templates = [
    { name: 'Pusty', background: '#ffffff' },
    { name: 'Niebieski', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { name: 'Zielony', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    { name: 'Gradient', background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }
  ];

  const addSlide = (template = templates[0]) => {
    const newSlide: Slide = {
      id: Date.now().toString(),
      title: `Slajd ${slides.length + 1}`,
      content: '',
      elements: [],
      background: template.background
    };
    setSlides([...slides, newSlide]);
    setCurrentSlideIndex(slides.length);
  };

  const deleteSlide = (index: number) => {
    if (slides.length > 1) {
      const newSlides = slides.filter((_, i) => i !== index);
      setSlides(newSlides);
      setCurrentSlideIndex(Math.max(0, index - 1));
    }
  };

  const addElement = (type: 'text' | 'image' | 'shape') => {
    const newElement: SlideElement = {
      id: Date.now().toString(),
      type,
      content: type === 'text' ? 'Nowy tekst' : type === 'shape' ? 'rectangle' : '',
      x: 100,
      y: 100,
      width: type === 'text' ? 200 : 100,
      height: type === 'text' ? 50 : 100,
      style: {
        fontSize: '16px',
        color: '#000000',
        backgroundColor: type === 'shape' ? '#3b82f6' : 'transparent',
        borderRadius: type === 'shape' ? '8px' : '0'
      }
    };

    const updatedSlides = [...slides];
    updatedSlides[currentSlideIndex].elements.push(newElement);
    setSlides(updatedSlides);
    setSelectedElement(newElement.id);
  };

  const updateElement = (elementId: string, updates: Partial<SlideElement>) => {
    const updatedSlides = [...slides];
    const elementIndex = updatedSlides[currentSlideIndex].elements.findIndex(el => el.id === elementId);
    if (elementIndex !== -1) {
      updatedSlides[currentSlideIndex].elements[elementIndex] = {
        ...updatedSlides[currentSlideIndex].elements[elementIndex],
        ...updates
      };
      setSlides(updatedSlides);
    }
  };

  const exportToPDF = () => {
    // Simple export - in real implementation would use jsPDF
    alert('Eksport do PDF - funkcja w budowie');
  };

  const startPresentation = () => {
    setIsPresenting(true);
    setCurrentSlideIndex(0);
  };

  if (isPresenting) {
    return (
      <div className="h-full bg-black flex items-center justify-center relative">
        <div 
          className="w-full h-full flex items-center justify-center text-white p-8"
          style={{ background: slides[currentSlideIndex]?.background }}
        >
          <div className="max-w-4xl w-full">
            <h1 className="text-6xl font-bold mb-8 text-center">
              {slides[currentSlideIndex]?.title}
            </h1>
            <div className="text-2xl text-center">
              {slides[currentSlideIndex]?.content}
            </div>
            {slides[currentSlideIndex]?.elements.map(element => (
              <div
                key={element.id}
                style={{
                  position: 'absolute',
                  left: `${element.x}px`,
                  top: `${element.y}px`,
                  width: `${element.width}px`,
                  height: `${element.height}px`,
                  ...element.style
                }}
              >
                {element.content}
              </div>
            ))}
          </div>
        </div>
        
        {/* Presentation Controls */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 bg-black/50 rounded-lg px-4 py-2">
          <button
            onClick={() => setCurrentSlideIndex(Math.max(0, currentSlideIndex - 1))}
            className="p-2 text-white hover:bg-white/20 rounded"
            disabled={currentSlideIndex === 0}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-white text-sm">
            {currentSlideIndex + 1} / {slides.length}
          </span>
          <button
            onClick={() => setCurrentSlideIndex(Math.min(slides.length - 1, currentSlideIndex + 1))}
            className="p-2 text-white hover:bg-white/20 rounded"
            disabled={currentSlideIndex === slides.length - 1}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsPresenting(false)}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Zakończ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex bg-gray-100">
      {/* Left Panel - Slides */}
      <div className="w-64 bg-white border-r border-gray-300 flex flex-col">
        <div className="p-4 border-b border-gray-300">
          <button
            onClick={() => addSlide()}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            <span>Nowy slajd</span>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`mb-3 p-3 border rounded cursor-pointer ${
                index === currentSlideIndex ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
              }`}
              onClick={() => setCurrentSlideIndex(index)}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{slide.title}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteSlide(index);
                  }}
                  className="p-1 text-red-500 hover:bg-red-100 rounded"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
              <div 
                className="w-full h-20 rounded border text-xs flex items-center justify-center"
                style={{ background: slide.background }}
              >
                Podgląd slajdu
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-300">
          <h4 className="text-sm font-medium mb-2">Szablony</h4>
          <div className="grid grid-cols-2 gap-2">
            {templates.map((template, index) => (
              <button
                key={index}
                onClick={() => addSlide(template)}
                className="p-2 border border-gray-300 rounded hover:border-gray-400"
                style={{ background: template.background, minHeight: '40px' }}
              >
                <span className="text-xs">{template.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="h-16 bg-white border-b border-gray-300 flex items-center px-4 space-x-4">
          <button className="flex items-center space-x-1 px-3 py-2 hover:bg-gray-100 rounded">
            <Save className="w-4 h-4" />
            <span className="text-sm">Zapisz</span>
          </button>
          <button onClick={exportToPDF} className="flex items-center space-x-1 px-3 py-2 hover:bg-gray-100 rounded">
            <Download className="w-4 h-4" />
            <span className="text-sm">Eksportuj PDF</span>
          </button>
          <button onClick={startPresentation} className="flex items-center space-x-1 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            <Play className="w-4 h-4" />
            <span className="text-sm">Prezentacja</span>
          </button>

          <div className="w-px h-8 bg-gray-300" />

          <button
            onClick={() => addElement('text')}
            className={`p-2 rounded ${currentTool === 'text' ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
            title="Dodaj tekst"
          >
            <Type className="w-4 h-4" />
          </button>
          <button
            onClick={() => addElement('shape')}
            className={`p-2 rounded ${currentTool === 'shape' ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
            title="Dodaj kształt"
          >
            <Square className="w-4 h-4" />
          </button>
          <button
            onClick={() => addElement('image')}
            className={`p-2 rounded ${currentTool === 'image' ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
            title="Dodaj obraz"
          >
            <Image className="w-4 h-4" />
          </button>
        </div>

        {/* Slide Editor */}
        <div className="flex-1 bg-gray-200 flex items-center justify-center p-8">
          <div 
            className="bg-white shadow-lg relative"
            style={{ 
              width: '800px', 
              height: '600px',
              background: slides[currentSlideIndex]?.background 
            }}
          >
            {/* Slide Title */}
            <input
              type="text"
              value={slides[currentSlideIndex]?.title || ''}
              onChange={(e) => {
                const updatedSlides = [...slides];
                updatedSlides[currentSlideIndex].title = e.target.value;
                setSlides(updatedSlides);
              }}
              className="absolute top-4 left-4 right-4 text-3xl font-bold bg-transparent border-none outline-none"
              placeholder="Tytuł slajdu"
            />

            {/* Slide Content */}
            <textarea
              value={slides[currentSlideIndex]?.content || ''}
              onChange={(e) => {
                const updatedSlides = [...slides];
                updatedSlides[currentSlideIndex].content = e.target.value;
                setSlides(updatedSlides);
              }}
              className="absolute top-20 left-4 right-4 bottom-4 bg-transparent border-none outline-none resize-none text-lg"
              placeholder="Treść slajdu..."
            />

            {/* Slide Elements */}
            {slides[currentSlideIndex]?.elements.map(element => (
              <div
                key={element.id}
                className={`absolute border-2 cursor-move ${
                  selectedElement === element.id ? 'border-blue-500' : 'border-transparent hover:border-gray-400'
                }`}
                style={{
                  left: `${element.x}px`,
                  top: `${element.y}px`,
                  width: `${element.width}px`,
                  height: `${element.height}px`,
                  ...element.style
                }}
                onClick={() => setSelectedElement(element.id)}
              >
                {element.type === 'text' && (
                  <input
                    type="text"
                    value={element.content}
                    onChange={(e) => updateElement(element.id, { content: e.target.value })}
                    className="w-full h-full bg-transparent border-none outline-none"
                  />
                )}
                {element.type === 'shape' && (
                  <div className="w-full h-full rounded" style={{ backgroundColor: element.style.backgroundColor }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WitSlides;

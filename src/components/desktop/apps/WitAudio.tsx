
import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, Pause, Square, Circle, Upload, Download, 
  Volume2, VolumeX, Mic, MicOff, 
  SkipBack, SkipForward, RotateCcw, Settings 
} from 'lucide-react';

interface AudioTrack {
  id: string;
  name: string;
  duration: number;
  volume: number;
  muted: boolean;
  solo: boolean;
  waveform: number[];
}

const WitAudio: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [masterVolume, setMasterVolume] = useState(80);
  const [tracks, setTracks] = useState<AudioTrack[]>([
    {
      id: '1',
      name: 'Ścieżka 1',
      duration: 120,
      volume: 80,
      muted: false,
      solo: false,
      waveform: Array.from({ length: 100 }, () => Math.random() * 100)
    },
    {
      id: '2',
      name: 'Ścieżka 2',
      duration: 120,
      volume: 60,
      muted: false,
      solo: false,
      waveform: Array.from({ length: 100 }, () => Math.random() * 100)
    }
  ]);
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [zoom, setZoom] = useState(100);
  const [bpm, setBpm] = useState(120);
  const [metronomeActive, setMetronomeActive] = useState(false);

  useEffect(() => {
    drawWaveform();
  }, [tracks, zoom, currentTime]);

  const drawWaveform = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw time grid
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 1;
    
    for (let i = 0; i <= canvas.width; i += 50) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }

    // Draw playhead
    const playheadX = (currentTime / 120) * canvas.width;
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(playheadX, 0);
    ctx.lineTo(playheadX, canvas.height);
    ctx.stroke();

    // Draw waveforms for each track
    tracks.forEach((track, index) => {
      const trackHeight = canvas.height / tracks.length;
      const trackY = index * trackHeight;
      
      ctx.strokeStyle = track.muted ? '#6b7280' : '#3b82f6';
      ctx.lineWidth = 1;
      ctx.beginPath();
      
      track.waveform.forEach((value, i) => {
        const x = (i / track.waveform.length) * canvas.width;
        const y = trackY + trackHeight / 2 + (value / 100) * (trackHeight / 4) * (track.volume / 100);
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      
      ctx.stroke();
    });
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Start recording logic would go here
      console.log('Recording started...');
    } else {
      console.log('Recording stopped...');
    }
  };

  const addTrack = () => {
    const newTrack: AudioTrack = {
      id: Date.now().toString(),
      name: `Ścieżka ${tracks.length + 1}`,
      duration: 120,
      volume: 80,
      muted: false,
      solo: false,
      waveform: Array.from({ length: 100 }, () => Math.random() * 100)
    };
    setTracks([...tracks, newTrack]);
  };

  const updateTrackVolume = (trackId: string, volume: number) => {
    setTracks(tracks.map(track => 
      track.id === trackId ? { ...track, volume } : track
    ));
  };

  const toggleTrackMute = (trackId: string) => {
    setTracks(tracks.map(track => 
      track.id === trackId ? { ...track, muted: !track.muted } : track
    ));
  };

  const toggleTrackSolo = (trackId: string) => {
    setTracks(tracks.map(track => 
      track.id === trackId ? { ...track, solo: !track.solo } : track
    ));
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const exportAudio = () => {
    alert('Eksportowanie audio... (funkcja w przygotowaniu)');
  };

  return (
    <div className="h-full flex flex-col bg-gray-900 text-white">
      {/* Top Menu */}
      <div className="h-12 bg-gray-800 border-b border-gray-700 flex items-center px-4 space-x-4">
        <button className="flex items-center space-x-1 px-3 py-1 hover:bg-gray-700 rounded">
          <Upload className="w-4 h-4" />
          <span className="text-sm">Importuj</span>
        </button>
        <button onClick={exportAudio} className="flex items-center space-x-1 px-3 py-1 hover:bg-gray-700 rounded">
          <Download className="w-4 h-4" />
          <span className="text-sm">Eksportuj</span>
        </button>
        
        <div className="w-px h-6 bg-gray-600" />
        
        <div className="flex items-center space-x-2">
          <span className="text-sm">BPM:</span>
          <input
            type="number"
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
            className="w-16 px-2 py-1 bg-gray-700 rounded text-sm"
            min="60"
            max="200"
          />
          <button
            onClick={() => setMetronomeActive(!metronomeActive)}
            className={`p-2 rounded ${metronomeActive ? 'bg-green-600' : 'hover:bg-gray-700'}`}
            title="Metronom"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1" />

        <div className="flex items-center space-x-2">
          <span className="text-sm">Master:</span>
          <input
            type="range"
            min="0"
            max="100"
            value={masterVolume}
            onChange={(e) => setMasterVolume(Number(e.target.value))}
            className="w-20"
          />
          <span className="text-sm w-8">{masterVolume}</span>
        </div>
      </div>

      {/* Transport Controls */}
      <div className="h-16 bg-gray-800 border-b border-gray-700 flex items-center justify-center space-x-6">
        <button onClick={() => setCurrentTime(0)} className="p-3 hover:bg-gray-700 rounded">
          <RotateCcw className="w-5 h-5" />
        </button>
        <button onClick={() => setCurrentTime(Math.max(0, currentTime - 10))} className="p-3 hover:bg-gray-700 rounded">
          <SkipBack className="w-5 h-5" />
        </button>
        <button 
          onClick={toggleRecording}
          className={`p-3 rounded ${isRecording ? 'bg-red-600 hover:bg-red-700' : 'hover:bg-gray-700'}`}
        >
          <Circle className="w-6 h-6" />
        </button>
        <button onClick={togglePlayPause} className="p-3 hover:bg-gray-700 rounded">
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>
        <button onClick={() => { setIsPlaying(false); setCurrentTime(0); }} className="p-3 hover:bg-gray-700 rounded">
          <Square className="w-5 h-5" />
        </button>
        <button onClick={() => setCurrentTime(Math.min(duration, currentTime + 10))} className="p-3 hover:bg-gray-700 rounded">
          <SkipForward className="w-5 h-5" />
        </button>
        
        <div className="ml-8 flex items-center space-x-2">
          <span className="text-sm">{formatTime(currentTime)}</span>
          <span className="text-gray-400">/</span>
          <span className="text-sm">{formatTime(120)}</span>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Track Mixer */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium">Mikser</h3>
              <button onClick={addTrack} className="px-2 py-1 bg-blue-600 rounded text-xs hover:bg-blue-700">
                + Ścieżka
              </button>
            </div>
            
            <div className="space-y-4">
              {tracks.map(track => (
                <div key={track.id} className="bg-gray-700 rounded p-3">
                  <div className="text-sm font-medium mb-2">{track.name}</div>
                  
                  <div className="flex items-center space-x-2 mb-2">
                    <button
                      onClick={() => toggleTrackMute(track.id)}
                      className={`p-1 rounded text-xs ${track.muted ? 'bg-red-600' : 'bg-gray-600 hover:bg-gray-500'}`}
                    >
                      M
                    </button>
                    <button
                      onClick={() => toggleTrackSolo(track.id)}
                      className={`p-1 rounded text-xs ${track.solo ? 'bg-yellow-600' : 'bg-gray-600 hover:bg-gray-500'}`}
                    >
                      S
                    </button>
                    <button className="p-1 bg-gray-600 hover:bg-gray-500 rounded text-xs">
                      R
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={track.volume}
                      onChange={(e) => updateTrackVolume(track.id, Number(e.target.value))}
                      className="flex-1"
                      orient="vertical"
                    />
                    <span className="text-xs w-8">{track.volume}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Waveform Display */}
        <div className="flex-1 flex flex-col">
          <div className="h-8 bg-gray-700 border-b border-gray-600 flex items-center px-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm">Zoom:</span>
              <input
                type="range"
                min="50"
                max="200"
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-20"
              />
              <span className="text-sm">{zoom}%</span>
            </div>
          </div>
          
          <div className="flex-1 overflow-auto bg-gray-800">
            <canvas
              ref={canvasRef}
              width={800}
              height={400}
              className="w-full h-full cursor-crosshair"
              onClick={(e) => {
                const canvas = canvasRef.current;
                if (canvas) {
                  const rect = canvas.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const newTime = (x / canvas.width) * 120;
                  setCurrentTime(newTime);
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Effects Panel */}
      <div className="h-24 bg-gray-800 border-t border-gray-700 p-4">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium">Efekty:</span>
          <button className="px-3 py-1 bg-purple-600 rounded text-sm hover:bg-purple-700">Reverb</button>
          <button className="px-3 py-1 bg-purple-600 rounded text-sm hover:bg-purple-700">Echo</button>
          <button className="px-3 py-1 bg-purple-600 rounded text-sm hover:bg-purple-700">Chorus</button>
          <button className="px-3 py-1 bg-purple-600 rounded text-sm hover:bg-purple-700">Distortion</button>
          
          <div className="ml-8 flex items-center space-x-2">
            <span className="text-sm">EQ:</span>
            {['Bass', 'Mid', 'Treble'].map(freq => (
              <div key={freq} className="flex flex-col items-center">
                <span className="text-xs mb-1">{freq}</span>
                <input
                  type="range"
                  min="-10"
                  max="10"
                  defaultValue="0"
                  className="w-12"
                  orient="vertical"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WitAudio;

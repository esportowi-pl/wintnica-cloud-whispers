
import React, { useState, useRef } from 'react';
import { 
  Play, Pause, Square, Upload, Download, 
  Scissors, Plus, Trash2, Volume2, 
  SkipBack, SkipForward, Film 
} from 'lucide-react';

interface VideoClip {
  id: string;
  name: string;
  duration: number;
  startTime: number;
  url?: string;
}

interface AudioTrack {
  id: string;
  name: string;
  volume: number;
  muted: boolean;
}

const WitVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [videoClips, setVideoClips] = useState<VideoClip[]>([
    { id: '1', name: 'Klip 1', duration: 30, startTime: 0 },
    { id: '2', name: 'Klip 2', duration: 45, startTime: 30 },
  ]);
  const [audioTracks, setAudioTracks] = useState<AudioTrack[]>([
    { id: '1', name: 'Ścieżka audio 1', volume: 80, muted: false },
    { id: '2', name: 'Muzyka tła', volume: 40, muted: false },
  ]);
  const [selectedClip, setSelectedClip] = useState<string | null>(null);
  const [zoom, setZoom] = useState(100);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const addClip = () => {
    const newClip: VideoClip = {
      id: Date.now().toString(),
      name: `Klip ${videoClips.length + 1}`,
      duration: 20,
      startTime: videoClips.reduce((acc, clip) => acc + clip.duration, 0)
    };
    setVideoClips([...videoClips, newClip]);
  };

  const removeClip = (clipId: string) => {
    setVideoClips(videoClips.filter(clip => clip.id !== clipId));
  };

  const addAudioTrack = () => {
    const newTrack: AudioTrack = {
      id: Date.now().toString(),
      name: `Ścieżka ${audioTracks.length + 1}`,
      volume: 70,
      muted: false
    };
    setAudioTracks([...audioTracks, newTrack]);
  };

  const exportVideo = () => {
    alert('Eksportowanie wideo... (funkcja w przygotowaniu)');
  };

  return (
    <div className="h-full flex flex-col bg-gray-900 text-white">
      {/* Top Menu */}
      <div className="h-12 bg-gray-800 border-b border-gray-700 flex items-center px-4 space-x-4">
        <button className="flex items-center space-x-1 px-3 py-1 hover:bg-gray-700 rounded">
          <Upload className="w-4 h-4" />
          <span className="text-sm">Importuj</span>
        </button>
        <button onClick={exportVideo} className="flex items-center space-x-1 px-3 py-1 hover:bg-gray-700 rounded">
          <Download className="w-4 h-4" />
          <span className="text-sm">Eksportuj</span>
        </button>
        
        <div className="w-px h-6 bg-gray-600" />
        
        <button onClick={addClip} className="flex items-center space-x-1 px-3 py-1 hover:bg-gray-700 rounded">
          <Plus className="w-4 h-4" />
          <span className="text-sm">Dodaj klip</span>
        </button>
        <button className="p-2 hover:bg-gray-700 rounded" title="Wytnij">
          <Scissors className="w-4 h-4" />
        </button>

        <div className="flex-1" />

        <div className="flex items-center space-x-2">
          <span className="text-sm">Zoom:</span>
          <input
            type="range"
            min="50"
            max="200"
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-20"
          />
          <span className="text-sm w-12">{zoom}%</span>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Preview Panel */}
        <div className="w-1/3 bg-black flex flex-col">
          <div className="flex-1 flex items-center justify-center">
            <video
              ref={videoRef}
              className="max-w-full max-h-full"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
            >
              <source src="/api/placeholder/800/600" type="video/mp4" />
              Twoja przeglądarka nie obsługuje odtwarzania wideo.
            </video>
          </div>
          
          {/* Video Controls */}
          <div className="p-4 bg-gray-800">
            <div className="flex items-center space-x-4 mb-2">
              <button onClick={() => setCurrentTime(Math.max(0, currentTime - 10))} className="p-2 hover:bg-gray-700 rounded">
                <SkipBack className="w-4 h-4" />
              </button>
              <button onClick={togglePlayPause} className="p-2 hover:bg-gray-700 rounded">
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              <button onClick={() => setIsPlaying(false)} className="p-2 hover:bg-gray-700 rounded">
                <Square className="w-4 h-4" />
              </button>
              <button onClick={() => setCurrentTime(Math.min(duration, currentTime + 10))} className="p-2 hover:bg-gray-700 rounded">
                <SkipForward className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex items-center space-x-2 text-sm">
              <span>{formatTime(currentTime)}</span>
              <div className="flex-1 bg-gray-600 h-1 rounded">
                <div 
                  className="bg-blue-500 h-1 rounded" 
                  style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                />
              </div>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="flex-1 flex flex-col">
          <div className="h-12 bg-gray-800 border-b border-gray-700 flex items-center px-4">
            <h3 className="text-sm font-medium">Oś czasu</h3>
          </div>
          
          <div className="flex-1 overflow-auto bg-gray-700">
            {/* Time ruler */}
            <div className="h-8 bg-gray-600 border-b border-gray-500 flex items-center px-4">
              {Array.from({ length: 20 }, (_, i) => (
                <div key={i} className="flex-1 text-xs text-center border-r border-gray-500 last:border-r-0">
                  {formatTime(i * 5)}
                </div>
              ))}
            </div>
            
            {/* Video tracks */}
            <div className="p-2 space-y-2">
              <div className="bg-gray-600 rounded p-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Wideo</span>
                  <Film className="w-4 h-4" />
                </div>
                <div className="flex space-x-1">
                  {videoClips.map(clip => (
                    <div
                      key={clip.id}
                      className={`bg-blue-600 rounded p-2 cursor-pointer hover:bg-blue-500 ${
                        selectedClip === clip.id ? 'ring-2 ring-white' : ''
                      }`}
                      style={{ width: `${(clip.duration / 100) * zoom}px` }}
                      onClick={() => setSelectedClip(clip.id)}
                    >
                      <div className="text-xs">{clip.name}</div>
                      <div className="text-xs opacity-75">{formatTime(clip.duration)}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Audio tracks */}
              {audioTracks.map(track => (
                <div key={track.id} className="bg-gray-600 rounded p-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{track.name}</span>
                    <div className="flex items-center space-x-2">
                      <Volume2 className="w-4 h-4" />
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={track.volume}
                        onChange={(e) => {
                          const updatedTracks = audioTracks.map(t =>
                            t.id === track.id ? { ...t, volume: Number(e.target.value) } : t
                          );
                          setAudioTracks(updatedTracks);
                        }}
                        className="w-16"
                      />
                    </div>
                  </div>
                  <div className="bg-green-600 rounded h-8 flex items-center px-2">
                    <div className="text-xs">Ścieżka audio</div>
                  </div>
                </div>
              ))}
              
              <button
                onClick={addAudioTrack}
                className="w-full py-2 border-2 border-dashed border-gray-500 rounded text-sm hover:border-gray-400"
              >
                + Dodaj ścieżkę audio
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WitVideo;

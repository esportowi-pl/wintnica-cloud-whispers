
import React, { useState, useRef } from 'react';
import { 
  Play, Pause, Square, Upload, Download, 
  Mic, Volume2, SkipBack, SkipForward, 
  Settings, Layers, Scissors, Copy,
  RotateCcw, Save
} from 'lucide-react';

interface AudioTrack {
  id: string;
  name: string;
  volume: number;
  muted: boolean;
  solo: boolean;
  waveform: number[];
}

interface Effect {
  id: string;
  name: string;
  type: 'reverb' | 'delay' | 'distortion' | 'equalizer';
  enabled: boolean;
  parameters: Record<string, number>;
}

const WitAudio: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [tracks, setTracks] = useState<AudioTrack[]>([
    { 
      id: '1', 
      name: 'Główna ścieżka', 
      volume: 80, 
      muted: false, 
      solo: false,
      waveform: Array.from({ length: 100 }, () => Math.random() * 100)
    },
    { 
      id: '2', 
      name: 'Harmonijki', 
      volume: 60, 
      muted: false, 
      solo: false,
      waveform: Array.from({ length: 100 }, () => Math.random() * 80)
    }
  ]);
  const [effects, setEffects] = useState<Effect[]>([
    { id: '1', name: 'Reverb', type: 'reverb', enabled: false, parameters: { roomSize: 50, decay: 40 } },
    { id: '2', name: 'Delay', type: 'delay', enabled: false, parameters: { time: 250, feedback: 30 } },
    { id: '3', name: 'Equalizer', type: 'equalizer', enabled: false, parameters: { low: 0, mid: 0, high: 0 } }
  ]);
  const [masterVolume, setMasterVolume] = useState(85);
  const [zoom, setZoom] = useState(100);
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [bpm, setBpm] = useState(120);
  const [isMetronomeOn, setIsMetronomeOn] = useState(false);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Start recording logic
      console.log('Starting recording...');
    } else {
      // Stop recording logic
      console.log('Stopping recording...');
    }
  };

  const addTrack = () => {
    const newTrack: AudioTrack = {
      id: Date.now().toString(),
      name: `Ścieżka ${tracks.length + 1}`,
      volume: 75,
      muted: false,
      solo: false,
      waveform: Array.from({ length: 100 }, () => Math.random() * 90)
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

  const toggleEffect = (effectId: string) => {
    setEffects(effects.map(effect =>
      effect.id === effectId ? { ...effect, enabled: !effect.enabled } : effect
    ));
  };

  const exportAudio = () => {
    alert('Eksportowanie audio... (funkcja w przygotowaniu)');
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
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
        <button onClick={() => {}} className="flex items-center space-x-1 px-3 py-1 hover:bg-gray-700 rounded">
          <Save className="w-4 h-4" />
          <span className="text-sm">Zapisz projekt</span>
        </button>
        
        <div className="w-px h-6 bg-gray-600" />
        
        <button onClick={addTrack} className="flex items-center space-x-1 px-3 py-1 hover:bg-gray-700 rounded">
          <Layers className="w-4 h-4" />
          <span className="text-sm">Nowa ścieżka</span>
        </button>
        
        <div className="flex-1" />
        
        {/* Metronome */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMetronomeOn(!isMetronomeOn)}
            className={`px-3 py-1 rounded text-sm ${
              isMetronomeOn ? 'bg-green-600' : 'bg-gray-700'
            }`}
          >
            Metronom
          </button>
          <input
            type="number"
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
            className="w-16 px-2 py-1 bg-gray-700 rounded text-center"
            min="60"
            max="200"
          />
          <span className="text-sm">BPM</span>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Left Panel - Mixer */}
        <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
          {/* Master Section */}
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-sm font-medium mb-3">Master</h3>
            <div className="flex items-center space-x-2 mb-2">
              <Volume2 className="w-4 h-4" />
              <input
                type="range"
                min="0"
                max="100"
                value={masterVolume}
                onChange={(e) => setMasterVolume(Number(e.target.value))}
                className="flex-1"
              />
              <span className="text-xs w-8">{masterVolume}</span>
            </div>
          </div>

          {/* Effects Section */}
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-sm font-medium mb-3">Efekty</h3>
            <div className="space-y-2">
              {effects.map(effect => (
                <div key={effect.id} className="flex items-center justify-between">
                  <span className="text-sm">{effect.name}</span>
                  <button
                    onClick={() => toggleEffect(effect.id)}
                    className={`px-2 py-1 rounded text-xs ${
                      effect.enabled ? 'bg-blue-600' : 'bg-gray-700'
                    }`}
                  >
                    {effect.enabled ? 'ON' : 'OFF'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Transport Controls */}
          <div className="p-4">
            <h3 className="text-sm font-medium mb-3">Transport</h3>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <button onClick={() => setCurrentTime(0)} className="p-2 hover:bg-gray-700 rounded">
                <SkipBack className="w-4 h-4" />
              </button>
              <button
                onClick={toggleRecording}
                className={`p-2 rounded ${isRecording ? 'bg-red-600' : 'hover:bg-gray-700'}`}
              >
                <Mic className="w-4 h-4" />
              </button>
              <button onClick={togglePlayPause} className="p-2 hover:bg-gray-700 rounded">
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              <button onClick={() => setIsPlaying(false)} className="p-2 hover:bg-gray-700 rounded">
                <Square className="w-4 h-4" />
              </button>
              <button onClick={() => setCurrentTime(duration)} className="p-2 hover:bg-gray-700 rounded">
                <SkipForward className="w-4 h-4" />
              </button>
            </div>
            
            <div className="text-center text-sm">
              <div>{formatTime(currentTime)} / {formatTime(duration)}</div>
            </div>
          </div>
        </div>

        {/* Main Area - Timeline */}
        <div className="flex-1 flex flex-col">
          {/* Timeline Header */}
          <div className="h-12 bg-gray-800 border-b border-gray-700 flex items-center px-4 justify-between">
            <h3 className="text-sm font-medium">Timeline</h3>
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

          {/* Time Ruler */}
          <div className="h-8 bg-gray-700 border-b border-gray-600 flex items-center px-4">
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i} className="flex-1 text-xs text-center border-r border-gray-600 last:border-r-0">
                {formatTime(i * 5)}
              </div>
            ))}
          </div>

          {/* Tracks */}
          <div className="flex-1 overflow-auto">
            {tracks.map(track => (
              <div
                key={track.id}
                className={`flex border-b border-gray-700 ${
                  selectedTrack === track.id ? 'bg-gray-700' : 'hover:bg-gray-800'
                }`}
                onClick={() => setSelectedTrack(track.id)}
              >
                {/* Track Controls */}
                <div className="w-48 p-3 bg-gray-800 border-r border-gray-700">
                  <div className="text-sm font-medium mb-2">{track.name}</div>
                  <div className="flex items-center space-x-2 mb-2">
                    <button
                      onClick={() => toggleTrackMute(track.id)}
                      className={`px-2 py-1 rounded text-xs ${
                        track.muted ? 'bg-red-600' : 'bg-gray-600'
                      }`}
                    >
                      M
                    </button>
                    <button
                      onClick={() => toggleTrackSolo(track.id)}
                      className={`px-2 py-1 rounded text-xs ${
                        track.solo ? 'bg-yellow-600' : 'bg-gray-600'
                      }`}
                    >
                      S
                    </button>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={track.volume}
                    onChange={(e) => updateTrackVolume(track.id, Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                {/* Waveform Display */}
                <div className="flex-1 p-2 relative">
                  <div className="h-16 bg-gray-900 rounded flex items-end space-x-1 px-2">
                    {track.waveform.map((height, index) => (
                      <div
                        key={index}
                        className="bg-blue-500 w-1"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hidden audio element for playback */}
      <audio
        ref={audioRef}
        onTimeUpdate={() => {
          if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
          }
        }}
        onLoadedMetadata={() => {
          if (audioRef.current) {
            setDuration(audioRef.current.duration);
          }
        }}
      />
    </div>
  );
};

export default WitAudio;

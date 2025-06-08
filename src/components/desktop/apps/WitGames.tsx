
import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Trophy, Star, Gamepad2 } from 'lucide-react';

const WitGames: React.FC = () => {
  const [activeGame, setActiveGame] = useState<'snake' | 'tetris' | 'memory' | 'pong'>('snake');
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<'playing' | 'paused' | 'gameover'>('paused');

  // Snake Game State
  const [snake, setSnake] = useState([[10, 10]]);
  const [food, setFood] = useState([5, 5]);
  const [direction, setDirection] = useState([0, 1]);

  // Memory Game State
  const [cards, setCards] = useState<number[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);

  const initializeMemoryGame = () => {
    const numbers = Array.from({ length: 8 }, (_, i) => i);
    const shuffled = [...numbers, ...numbers].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setScore(0);
  };

  const flipCard = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;
    
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);
    
    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first] === cards[second]) {
        setMatched([...matched, first, second]);
        setScore(score + 10);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  // Snake Game Logic
  const moveSnake = useCallback(() => {
    if (gameState !== 'playing' || activeGame !== 'snake') return;

    setSnake(currentSnake => {
      const newSnake = [...currentSnake];
      const head = [newSnake[0][0] + direction[0], newSnake[0][1] + direction[1]];
      
      // Check wall collision
      if (head[0] < 0 || head[0] >= 20 || head[1] < 0 || head[1] >= 20) {
        setGameState('gameover');
        return currentSnake;
      }
      
      // Check self collision
      if (newSnake.some(segment => segment[0] === head[0] && segment[1] === head[1])) {
        setGameState('gameover');
        return currentSnake;
      }
      
      newSnake.unshift(head);
      
      // Check food collision
      if (head[0] === food[0] && head[1] === food[1]) {
        setScore(score => score + 1);
        setFood([Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)]);
      } else {
        newSnake.pop();
      }
      
      return newSnake;
    });
  }, [direction, food, gameState, activeGame, score]);

  useEffect(() => {
    const gameInterval = setInterval(moveSnake, 150);
    return () => clearInterval(gameInterval);
  }, [moveSnake]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (activeGame === 'snake' && gameState === 'playing') {
        switch (e.key) {
          case 'ArrowUp': setDirection([-1, 0]); break;
          case 'ArrowDown': setDirection([1, 0]); break;
          case 'ArrowLeft': setDirection([0, -1]); break;
          case 'ArrowRight': setDirection([0, 1]); break;
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [activeGame, gameState]);

  const resetGame = () => {
    setScore(0);
    setGameState('paused');
    if (activeGame === 'snake') {
      setSnake([[10, 10]]);
      setFood([5, 5]);
      setDirection([0, 1]);
    } else if (activeGame === 'memory') {
      initializeMemoryGame();
    }
  };

  const startGame = () => {
    if (activeGame === 'memory' && cards.length === 0) {
      initializeMemoryGame();
    }
    setGameState('playing');
  };

  const renderSnakeGame = () => (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-20 gap-0 border-2 border-gray-400 bg-green-100">
        {Array.from({ length: 400 }, (_, i) => {
          const row = Math.floor(i / 20);
          const col = i % 20;
          const isSnake = snake.some(segment => segment[0] === row && segment[1] === col);
          const isFood = food[0] === row && food[1] === col;
          
          return (
            <div
              key={i}
              className={`w-4 h-4 ${
                isSnake ? 'bg-green-600' : 
                isFood ? 'bg-red-500' : 
                'bg-green-50'
              }`}
            />
          );
        })}
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600 mb-2">
          Użyj strzałek do sterowania wężem. Zbieraj czerwone jabłka!
        </p>
        <p className="text-xs text-gray-500">
          Długość węża: {snake.length} | Wynik: {score}
        </p>
      </div>
    </div>
  );

  const renderMemoryGame = () => (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-4 gap-2 max-w-xs">
        {cards.map((card, index) => {
          const isFlipped = flipped.includes(index) || matched.includes(index);
          return (
            <button
              key={index}
              onClick={() => flipCard(index)}
              className={`w-16 h-16 rounded-lg border-2 flex items-center justify-center text-xl font-bold transition-all ${
                isFlipped ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
              } ${matched.includes(index) ? 'bg-green-500' : ''}`}
            >
              {isFlipped ? card : '?'}
            </button>
          );
        })}
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600 mb-2">
          Znajdź wszystkie pary! Kliknij karty aby je odwrócić.
        </p>
        <p className="text-xs text-gray-500">
          Pary: {matched.length / 2}/8 | Wynik: {score}
        </p>
      </div>
    </div>
  );

  const games = [
    { id: 'snake', name: 'Snake', icon: '🐍', description: 'Klasyczny wąż' },
    { id: 'memory', name: 'Memory', icon: '🧠', description: 'Gra w pary' },
    { id: 'tetris', name: 'Tetris', icon: '🧱', description: 'Układaj klocki' },
    { id: 'pong', name: 'Pong', icon: '🏓', description: 'Klasyczny ping-pong' }
  ];

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-purple-900 to-blue-900 text-white">
      {/* Header */}
      <div className="p-4 border-b border-purple-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Gamepad2 className="w-8 h-8 text-yellow-400" />
            <div>
              <h1 className="text-xl font-bold">WitGames Arcade</h1>
              <p className="text-sm text-purple-300">Centrum rozrywki Witnicy</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span className="font-semibold">{score}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span>Poziom 1</span>
            </div>
          </div>
        </div>
      </div>

      {/* Game Selection */}
      <div className="p-4 border-b border-purple-700">
        <div className="flex space-x-2 overflow-x-auto">
          {games.map(game => (
            <button
              key={game.id}
              onClick={() => {
                setActiveGame(game.id as any);
                resetGame();
              }}
              className={`flex-shrink-0 p-3 rounded-lg border-2 transition-all ${
                activeGame === game.id
                  ? 'border-yellow-400 bg-yellow-400/20'
                  : 'border-purple-600 hover:border-purple-500'
              }`}
            >
              <div className="text-2xl mb-1">{game.icon}</div>
              <div className="text-sm font-medium">{game.name}</div>
              <div className="text-xs text-purple-300">{game.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Game Controls */}
      <div className="p-4 border-b border-purple-700">
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={startGame}
            disabled={gameState === 'playing'}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded-lg"
          >
            <Play className="w-4 h-4" />
            <span>Start</span>
          </button>
          <button
            onClick={() => setGameState(gameState === 'playing' ? 'paused' : 'playing')}
            className="flex items-center space-x-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg"
          >
            <Pause className="w-4 h-4" />
            <span>Pauza</span>
          </button>
          <button
            onClick={resetGame}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Game Area */}
      <div className="flex-1 p-8 flex items-center justify-center">
        {gameState === 'gameover' && (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Game Over!</h2>
            <p className="text-xl mb-4">Twój wynik: {score}</p>
            <button
              onClick={resetGame}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg"
            >
              Zagraj ponownie
            </button>
          </div>
        )}
        
        {gameState !== 'gameover' && activeGame === 'snake' && renderSnakeGame()}
        {gameState !== 'gameover' && activeGame === 'memory' && renderMemoryGame()}
        
        {gameState !== 'gameover' && (activeGame === 'tetris' || activeGame === 'pong') && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              {activeGame === 'tetris' ? 'Tetris' : 'Pong'}
            </h2>
            <p className="text-gray-300 mb-4">Ta gra będzie dostępna wkrótce!</p>
            <div className="text-6xl mb-4">
              {activeGame === 'tetris' ? '🧱' : '🏓'}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-purple-700 text-center text-sm text-purple-300">
        <p>WitGames - Najlepsze gry w Witnicy! 🎮</p>
      </div>
    </div>
  );
};

export default WitGames;

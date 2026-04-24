import { useState, useEffect, useCallback, useRef } from 'react';
import { GRID_SIZE, INITIAL_SNAKE, INITIAL_DIRECTION, INITIAL_SPEED, MIN_SPEED, SPEED_INCREMENT } from '../constants';

export const useSnake = () => {
  const [snake, setSnake] = useState<number[][]>(INITIAL_SNAKE);
  const [food, setFood] = useState<number[]>([5, 5]);
  const [direction, setDirection] = useState<string>(INITIAL_DIRECTION);
  const [score, setScore] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(true);
  
  const moveSnake = useCallback(() => {
    if (isPaused || isGameOver) return;

    setSnake((prevSnake) => {
      const head = prevSnake[0];
      const newHead = [...head];

      switch (direction) {
        case 'UP': newHead[1] -= 1; break;
        case 'DOWN': newHead[1] += 1; break;
        case 'LEFT': newHead[0] -= 1; break;
        case 'RIGHT': newHead[0] += 1; break;
      }

      // Border collision
      if (
        newHead[0] < 0 || newHead[0] >= GRID_SIZE ||
        newHead[1] < 0 || newHead[1] >= GRID_SIZE ||
        prevSnake.some(segment => segment[0] === newHead[0] && segment[1] === newHead[1])
      ) {
        setIsGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Food collision
      if (newHead[0] === food[0] && newHead[1] === food[1]) {
        setScore(s => s + 10);
        generateFood(newSnake);
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, isGameOver, isPaused]);

  const generateFood = (currentSnake: number[][]) => {
    let newFood;
    while (true) {
      newFood = [
        Math.floor(Math.random() * GRID_SIZE),
        Math.floor(Math.random() * GRID_SIZE)
      ];
      if (!currentSnake.some(segment => segment[0] === newFood[0] && segment[1] === newFood[1])) {
        break;
      }
    }
    setFood(newFood);
  };

  useEffect(() => {
    const speed = Math.max(MIN_SPEED, INITIAL_SPEED - (score / 10) * SPEED_INCREMENT);
    const interval = setInterval(moveSnake, speed);
    return () => clearInterval(interval);
  }, [moveSnake, score]);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp': if (direction !== 'DOWN') setDirection('UP'); break;
      case 'ArrowDown': if (direction !== 'UP') setDirection('DOWN'); break;
      case 'ArrowLeft': if (direction !== 'RIGHT') setDirection('LEFT'); break;
      case 'ArrowRight': if (direction !== 'LEFT') setDirection('RIGHT'); break;
      case ' ': setIsPaused(prev => !prev); break;
    }
  }, [direction]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setIsGameOver(false);
    setIsPaused(false);
    generateFood(INITIAL_SNAKE);
  };

  return { snake, food, score, isGameOver, isPaused, setIsPaused, resetGame };
};

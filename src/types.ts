export interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
  cover: string;
}

export interface GameState {
  snake: number[][];
  food: number[];
  direction: string;
  score: number;
  isGameOver: boolean;
  isPaused: boolean;
}

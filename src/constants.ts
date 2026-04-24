import { Track } from './types';

export const TRACKS: Track[] = [
  {
    id: '1',
    title: 'Cybernetic Pulse',
    artist: 'Neon AI',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Placeholder audio
    cover: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=400&h=400',
  },
  {
    id: '2',
    title: 'Neon Rain',
    artist: 'Synth Mind',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', // Placeholder audio
    cover: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=400&h=400',
  },
  {
    id: '3',
    title: 'Data Stream',
    artist: 'Neural Network',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', // Placeholder audio
    cover: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=400&h=400',
  },
];

export const GRID_SIZE = 20;
export const INITIAL_SPEED = 150;
export const MIN_SPEED = 60;
export const SPEED_INCREMENT = 2;
export const INITIAL_SNAKE = [[10, 10], [10, 11], [10, 12]];
export const INITIAL_DIRECTION = 'UP';

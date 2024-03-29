import { PlayerType } from './Event.type';

export type PairingType = {
  players: string[];
  toRes: number[];
  vpRes: number[];
};

export type PairType = {
  player1id: string;
  player2id: string;
  table: number;
}

// const tour1: PairingType[] = [
//   {
//     players: ['[#8a2d0]', '[#b58d0]'],
//     toRes: [11, 9],
//     vpRes: [100, 90],
//   },
//   {
//     players: ['[#b58d2}', '[#0b494]'],
//     toRes: [9, 11],
//     vpRes: [80, 90],
//   },
// ];

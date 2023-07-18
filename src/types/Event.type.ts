import { PairingType } from './Pairings.type';

export type EventType = {
  date: string;
  description?: string | null;
  elo: number | null;
  id: string;
  name: string;
  pts: number;
  tours: number;
  type: string;
  link?: string;
  playersNumber?: number;
  appliedPlayers?: PlayerType[];
  tour1?: PairingType[];
  tour2?: PairingType[];
  tour3?: PairingType[];
  tour4?: PairingType[];
  tour5?: PairingType[];
};

export type PlayerType = {
  id: string;
  firstname?: string;
  lastname?: string;
  nickname?: string;
  name: string;
  primary: number;
  to: number;
  toOpponents: number;
  vp: number;
  opponentsIDs?: number[];
  elo?: number;
  proxy?: boolean;
};

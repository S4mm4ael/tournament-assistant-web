import { PairingType } from './Pairings.type';

export type EventType = {
  date: string;
  description?: string | undefined;
  elo: number | undefined;
  id: string | undefined;
  name: string | undefined;
  pts: number | undefined;
  tours: number | undefined;
  type: string | undefined;
  link?: string;
  memberNumber?: number;
  status?: string;
  appliedPlayers?: PlayerType[];
  tour1?: PairingType[];
  tour2?: PairingType[];
  tour3?: PairingType[];
  tour4?: PairingType[];
  tour5?: PairingType[];
};

export type PlayerType = {
  id: string;
  firstname: string;
  lastname: string;
  nickname?: string;
  vp: number;
  to: number;
  primary: number;
  toOpponents: number;
  faction?: string;
  opponentsIDs?: number[];
  elo?: number;
  proxy?: boolean;
};

import { PairingType } from './Pairings.type';

export type EventType = {
  date: string | undefined;
  description?: string | undefined;
  elo: number | undefined;
  id: string | undefined;
  name: string | undefined;
  pts: number | undefined;
  tours: number | undefined;
  type: string | undefined;
  link?: string;
  memberNumber?: number;
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

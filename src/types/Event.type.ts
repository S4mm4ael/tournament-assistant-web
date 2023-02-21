export type EventType = {
  date: Date;
  description?: string | null;
  elo: number | null;
  id: string;
  name: string;
  pts: number;
  tours: number;
  type: string;
  players?: PlayerType[];
  tour1?: string[][];
};

export type PlayerType = {
  id: string;
  name: string;
  primary: number;
  to: number;
  toOpponents: number;
  vp: number;
};

export type EventType = {
  date: Date;
  description?: string | null;
  elo: number;
  id: string;
  name: string;
  pts: number;
  tours: number;
  type: string;
  firsttourpairings?: string[][];
  secondtourpairings?: string[][];
  thirdtourpairings?: string[][];
};

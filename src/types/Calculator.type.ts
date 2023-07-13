export type EloCalcPlayerData = {
  id: string;
  elo: number;
  firstname: string;
  lastname: string;
  nickname: string;
  eloNew?: number;
};

export type EloInputCardProps = {
  playersList: EloCalcPlayerData[];
  setPlayersList: React.Dispatch<React.SetStateAction<EloCalcPlayerData[]>>;
  setPlayer?: React.Dispatch<React.SetStateAction<EloCalcPlayerData>>;
  setPlayerOne?: React.Dispatch<React.SetStateAction<EloCalcPlayerData>>;
  setPlayerTwo?: React.Dispatch<React.SetStateAction<EloCalcPlayerData>>;
};

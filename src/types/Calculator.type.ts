import { PlayerType } from './Event.type';

export type PlayerMockData =
  | {
      id: string;
      elo: number;
      firstname: string;
      lastname: string;
      nickname: string;
      proxy?: undefined;
    }
  | {
      id: string;
      elo: number;
      firstname: string;
      lastname: string;
      nickname: string;
      proxy: boolean;
    };

export type EloInputCardProps = {
  playersList: PlayerMockData[];
  setPlayersList: React.Dispatch<React.SetStateAction<PlayerMockData[]>>;
  setPlayerOne: React.Dispatch<React.SetStateAction<PlayerType>>;
  setPlayerTwo: React.Dispatch<React.SetStateAction<PlayerType>>;
};

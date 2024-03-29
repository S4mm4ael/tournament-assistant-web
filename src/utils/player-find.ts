import { PlayerType } from 'types/Event.type';

export function findPlayerById(id: string, players: PlayerType[]) {
  const playerIndex = players.findIndex((player) => player.id === id);

  return players[playerIndex];
}

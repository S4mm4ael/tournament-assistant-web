import { PlayerType } from 'types/Event.type';
import { PairType } from 'types/Pairings.type';
import { findPlayerById } from './find-player';

export function submitPairResult(
  event: React.FormEvent<HTMLFormElement>,
  table: number,
  tourNumber: number,
  players: PlayerType[],
  pairs: PairType[][],
  vpFirstPlayer: number,
  vpSecondPlayer: number,
  enteredResCount: number,
  pairsTour: PairType[],
  setPairsTour: (arg: PairType[]) => void,
  setEnteredResCount: (arg: number) => void,
  setPlayers: (arg: PlayerType[]) => void,
  setVpFirstPlayer: (arg: number) => void,
  setVpSecondPlayer: (arg: number) => void
) {
  function calculatePairResults(pair: PairType, vp1: number, vp2: number) {
    const pairToCalculate = pair;
    const player1 = findPlayerById(pair.player1id, players);
    const player2 = findPlayerById(pair.player2id, players);

    if (pairs && enteredResCount === pairs.length) {
      setEnteredResCount(0);
    }

    player1.vp += vp1;
    player2.vp += vp2;

    player2.opponentsIDs?.push(Number(player1.id));
    player1.opponentsIDs?.push(Number(player2.id));

    // Primary calculating
    if (vp1 - vp2 > 5) {
      const diffWTC = vp1 - vp2;
      const toWTC = calculateWTC(diffWTC);

      player1.primary += 3;
      player2.primary += 0;
      player1.to += toWTC[0];
      player2.to += toWTC[1];
    } else if (Math.abs(vp1 - vp2) <= 5) {
      player1.primary += 1;
      player2.primary += 1;
      player1.to += 1;
      player2.to += 1;
    }
    if (vp2 - vp1 > 5) {
      const diffWTC = vp2 - vp1;
      const toWTC = calculateWTC(diffWTC);
      player2.primary += 3;
      player1.primary += 0;
      player2.to += toWTC[0];
      player1.to += toWTC[1];
    }

    // Elo calculating
    player1.elo = calculateELO(player1.to, player1.elo!, player2.elo!);
    player2.elo = calculateELO(player2.to, player2.elo!, player1.elo!);

    // Setting to players array
    updatePlayersList(player1);
    updatePlayersList(player2);
    setVpFirstPlayer(0);
    setVpSecondPlayer(0);

    if (enteredResCount) {
      setEnteredResCount(enteredResCount + 1);
    }
    if (!enteredResCount) {
      setEnteredResCount(1);
    }

    return pairToCalculate;
  }

  function updatePlayersList(playerUpdated: PlayerType) {
    const playerListToUpdate = players;
    const playerToUpdateIndex = playerListToUpdate.findIndex(
      (player) => player.id === playerUpdated.id
    );

    playerListToUpdate[playerToUpdateIndex] = playerUpdated;

    setPlayers(playerListToUpdate);
  }

  function updatePair() {
    if (pairs) {
      const pairArrayToUpdate = pairs[tourNumber];

      if (vpFirstPlayer && vpSecondPlayer) {
        const vp1 = vpFirstPlayer;
        const vp2 = vpSecondPlayer;
        pairArrayToUpdate[table - 1] = calculatePairResults(pairArrayToUpdate[table - 1], vp1, vp2);
        if (Array.isArray(pairsTour)) setPairsTour([...pairsTour].concat(pairArrayToUpdate));
      } else {
        alert('Check VP inputs first!');
      }
    }
  }

  event.preventDefault();
  updatePair();
}
function calculateWTC(diff: number) {
  if (diff >= 6 && diff <= 10) {
    return [11, 9];
  }
  if (diff >= 11 && diff <= 15) {
    return [12, 8];
  }
  if (diff >= 16 && diff <= 20) {
    return [13, 7];
  }
  if (diff >= 21 && diff <= 25) {
    return [14, 6];
  }
  if (diff >= 26 && diff <= 30) {
    return [15, 5];
  }
  if (diff >= 31 && diff <= 35) {
    return [16, 4];
  }
  if (diff >= 36 && diff <= 40) {
    return [17, 3];
  }
  if (diff >= 41 && diff <= 45) {
    return [18, 2];
  }
  if (diff >= 46 && diff <= 50) {
    return [19, 1];
  }
  if (diff >= 51) {
    return [20, 0];
  } else return [0, 0];
}

function calculateELO(to: number, rating1: number, rating2: number) {
  const ELO_K = 100;
  const Ea = 1 / (1 + 10 ** ((rating2 - rating1) / 400));
  const Sa = to / 20;
  return +(rating1 + ELO_K * (Sa - Ea)).toFixed(2);
}

/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { UserType } from 'types/User.type';
import { PlayerType } from 'types/Event.type';
import { PairType } from 'types/Pairings.type';
import playersData from './meme-cup-players.json';

import styles from './pairings.module.css';

type PairingsProps = {
  tourQuantity: number;
};

export function Pairings({ tourQuantity }: PairingsProps) {
  const startPlayersArray: UserType[] = playersData;

  const [players, setPlayers] = useState<PlayerType[] | []>([]);
  const [pairs, setPairs] = useState<PairType[][] | null>(null);
  const [pairsTour, setPairsTour] = useState<PairType[] | null>([]);
  const [vpFirstPlayer, setVpFirstPlayer] = useState<number>();
  const [vpSecondPlayer, setVpSecondPlayer] = useState<number>();
  const [enteredResCount, setEnteredResCount] = useState<number>(0);
  const [tourNumber, setTourNumber] = useState<number>(0);
  const TOUR_QUANTITY = tourQuantity;


  function createPlayersArrayForPairings() {
    const playersArrayForPairings: PlayerType[] = [];

    startPlayersArray.map((player) => {
      const playerUpdated: PlayerType = {
        id: player.id,
        name: player.nickname,
        primary: 0,
        to: 0,
        toOpponents: 0,
        vp: 0,
        opponentsIDs: [],
        elo: player.elo,
      };
      playersArrayForPairings.push(playerUpdated);
    });
    return playersArrayForPairings;
  }
  function randomizePairs(players: PlayerType[]) {
    const firstTourStandings: PairType[] = [];

    let table = 1;
    const playersArray = players;

    while (playersArray.length) {
      const pair: PairType = {
        player1id: playersArray.splice((Math.random() * 1000) % players.length, 1)[0].id,
        player2id: playersArray.splice((Math.random() * 1000) % players.length, 1)[0].id,
        table: table,
      };

      table++;


      firstTourStandings.push(pair);

    }
    setPairs([firstTourStandings]);

  }

  function checkStandingsDoubles(playersArray: PlayerType[]) {
    for (let i = 0; i < playersArray.length - 1; i++) {
      const player1 = playersArray[i];
      const player2 = playersArray[i + 1];


      if (checkIfAlreadyPlayed(player1, player2)) {
        const playerToMove = playersArray.splice(i + 1, 1)[0];
        playersArray.splice(i + 2, 0, playerToMove);
        console.log('Moved:' + playerToMove.name + 'from' + `${i + 1}` + 'to' + `${i + 2}`);


      }
    }

    return playersArray;

  }

  function definePairs(players: PlayerType[]) {
    const tourPairs: PairType[] = [];
    const playersArray = [...players];

    let table = 1;

    checkStandingsDoubles(playersArray);


    while (playersArray.length) {
      const player1ID = playersArray.splice(0, 1)[0].id;
      const player2ID = playersArray.splice(0, 1)[0].id;




      let pair: PairType = {
        player1id: player1ID,
        player2id: player2ID,
        table: table,
      };

      tourPairs.push(pair);
      table++;

    }

    if (pairs && tourPairs.length == pairs[0].length) {
      setPairs([...pairs, tourPairs]);
      console.log('pairs after first tour', pairs);

    }
  }
  function findPlayerById(id: string) {
    const playerIndex = players.findIndex((player) => player.id === id);


    return players[playerIndex];

  }
  const renderPlayers = () => {
    return players.length > 0 ? (
      players
        .sort((a, b) => b.vp - a.vp)
        .sort((a, b) => b.to - a.to)
        .sort((a, b) => b.primary - a.primary)
        .map((player: PlayerType) => (
          <p key={player.id}>
            <b>{player.name}</b> - Primary:{player.primary} TO:{player.to} VP:{player.vp} OPP_IDs:
            {player.opponentsIDs?.map((opp) => opp + ', ')} ELO:{player.elo}{' '}
          </p>
        ))
    ) : (
      <p>There is no players</p>
    );
  };
  const renderPairs = (tour: number) => {
    if (pairs) {
      return pairs[tour].map((pair: PairType) => {
        const player1 = findPlayerById(pair.player1id);
        const player2 = findPlayerById(pair.player2id);





        return (
          <div key={player1.name + '-' + player2.name} className={styles.PairingsPage__pairCard}>
            <p>Table: {pair.table}</p>
            <div className={styles.PairingsPage__pairFormWrapper}>
              <form
                className={styles.PairingsPage__pairForm}
                onSubmit={(event) => submitPairResult(event, player1.id, player2.id, pair.table)}
              >
                <div className={styles.PairingsPage__pairFormNames}>
                  <b>
                    {player1.name}</b>
                  {player1.elo}

                  <b>{player2.name}</b>
                  {
                    player2.elo
                  }
                </div>

                <div className={styles.PairingsPage__pairFormInputs}>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    name={`${player1.name} VP`}
                    id={findPlayerById(pair.player1id).id}
                    onChange={(e) => {
                      setVpFirstPlayer(+e.target.value);
                    }}
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    name={`${player2.name} VP`}
                    id={player2.id}
                    onChange={(e) => {
                      setVpSecondPlayer(+e.target.value);
                    }}
                  />
                  <button type="submit">✔</button>
                </div>

              </form>
</div>

          </div>
        );
      });
    }
  };
  function submitPairResult(
    event: React.FormEvent<HTMLFormElement>,
    id1: string,
    id2: string,
    table: number
  ) {
    event.preventDefault();
    updatePair(tourNumber, table);
  }
  function updatePair(tour: number, table: number) {
    if (pairs) {
      const pairArrayToUpdate = pairs[tour];

      if (vpFirstPlayer && vpSecondPlayer) {
        let vp1 = vpFirstPlayer;
        let vp2 = vpSecondPlayer;
        pairArrayToUpdate[table - 1] = calculatePairResults(pairArrayToUpdate[table - 1], vp1, vp2);
        if (Array.isArray(pairsTour)) setPairsTour([...pairsTour].concat(pairArrayToUpdate));
      } else {
        alert('Check VP inputs first!');
      }
    }
  }
  function calculatePairResults(pair: PairType, vp1: number, vp2: number) {
    const pairToCalculate = pair;
    const player1 = findPlayerById(pair.player1id);
    const player2 = findPlayerById(pair.player2id);


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
  function checkIfAlreadyPlayed(player1: PlayerType, player2: PlayerType) {
    if (player1.opponentsIDs?.find((el) => el === +player2.id)) {
      return true;

    }
    return false;

  }

  useEffect(() => {
    function onRender() {
      randomizePairs(createPlayersArrayForPairings());
      setPlayers(createPlayersArrayForPairings());

    }
    onRender();
  }, []);

  useEffect(() => {
    if (pairs && enteredResCount === pairs[0].length) {
      setTourNumber(tourNumber + 1);
      definePairs(players);
      setEnteredResCount(0);

    }
  }, [enteredResCount]);

  return (
    <div className={styles.PairingsPage}>
      <>
        <h2>Test Pairings</h2>
        <h3>Current Players Stangins for Tour №{tourNumber}</h3>
        {renderPlayers()}
        <br />
        <h3>First tour pairings</h3>
        {pairs && renderPairs(0)}
        {tourNumber >= 1 && (
          <>
            <br />
            <h3>Second tour pairings</h3>
            {pairs && pairs?.length >= 2 && renderPairs(1)}
          </>
        )}
        {tourNumber >= 2 && (
          <>
            <br />
            <h3>Third tour pairings</h3>
            {pairs && pairs?.length >= 3 && renderPairs(2)}
          </>
        )}
        {tourNumber >= 3 && (
          <>
            <br />
            <h3>Four tour pairings</h3>
            {pairs && pairs?.length >= 4 && renderPairs(2)}
          </>
        )}
        {tourNumber >= 4 && (
          <>
            <br />
            <h3>Five tour pairings</h3>
            {pairs && pairs?.length >= 5 && renderPairs(2)}
          </>
        )}
        {tourNumber >= TOUR_QUANTITY && (
          <>
            <br />
            <h3>Final standings</h3>
            {renderPlayers()}
          </>
        )}
      </>
    </div>
  );
}

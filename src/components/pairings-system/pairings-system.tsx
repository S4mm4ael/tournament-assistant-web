/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { UserType } from 'types/User.type';
import { PlayerType } from 'types/Event.type';
import { PairType } from 'types/Pairings.type';

import styles from './pairings.module.css';
import { SubmitHandler, UseFormHandleSubmit } from 'react-hook-form';


export function Pairings() {


  const startPlayersArray: UserType[] = [
    {
      id: '1',
      elo: 1600,
      firstname: 'Semion',
      lastname: 'Krapivin',
      nickname: 'Sam',
    },
    {
      id: '2',
      elo: 1700,
      firstname: 'Sasha',
      lastname: 'Kratkovskiy',
      nickname: 'Glin',
    },
    {
      id: '3',
      elo: 1600,
      firstname: 'Hlopa',
      lastname: 'Turkov',
      nickname: 'Turok',
    },
    {
      id: '4',
      elo: 1700,
      firstname: 'Max',
      lastname: 'Bokov',
      nickname: 'Maxim',
    },
    {
      id: '5',
      elo: 1700,
      firstname: 'Floppy',
      lastname: 'Floppy',
      nickname: 'Floppy',
    },
    {
      id: '6',
      elo: 1600,
      firstname: 'Dima',
      lastname: 'Senchenko',
      nickname: 'Dima',
    },
  ];

  const [players, setPlayers] = useState<PlayerType[] | []>([])
  const [pairs, setPairs] = useState<PairType[] | []>([])
  const [vpFirstPlayer, setVpFirstPlayer] = useState<number>()
  const [vpSecondPlayer, setVpSecondPlayer] = useState<number>()
  const [enteredResCount, setEnteredResCount] = useState<number>()
  const [tourNumber, setTourNumber] = useState<number>(1)

  function makePairings(tour: number) {
    switch (tour) {
      case 1:

        break;
      case 2:
        break;

      default:
        break;
    }
  }
  function createPlayersArrayForPairings() {
    const playersArrayForPairings: PlayerType[] = []
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
      }
      playersArrayForPairings.push(playerUpdated)
    })
    return playersArrayForPairings
  }
  function randomizePairs(players: PlayerType[]) {
    const firstTourStandings: PairType[] = []
    let table = 1;
    while (players.length) {

      const pair: PairType = {
        player1id: players.splice((Math.random() * 1000) % players.length, 1)[0].id,
        player2id: players.splice((Math.random() * 1000) % players.length, 1)[0].id,
        table: table,
      }

      table++

      firstTourStandings.push(pair)

    }
    setPairs(firstTourStandings)
  }
  function findPlayerById(id: string) {
    const playerIndex = players.findIndex(player => player.id === id)

    return players[playerIndex]
  }
  const renderPlayers = () => {
    return players.length > 0 ? players
      .sort((a, b) => b.vp - a.vp)
      .sort((a, b) => b.to - a.to)
      .sort((a, b) => b.primary - a.primary)
      .map((player: PlayerType) => (
        <p key={player.id}><b>{player.name}</b> - Primary:{player.primary}  TO:{player.to} VP:{player.vp} OPP_IDs:{player.opponentsIDs?.map(opp => opp + ", ")} ELO:{player.elo} </p>
      ))
      : <p>There is no players</p>
  };
  const renderPairs = (tour?: number) => {
    return pairs.length > 0 ? pairs.map((pair: PairType) => {
      const player1 = findPlayerById(pair.player1id)
      const player2 = findPlayerById(pair.player2id)

      return (<div key={player1.name + '-' + player2.name} className={styles.PairingsPage__pairCard}>
        <p>Table: {pair.table}</p>
        <form className={styles.PairingsPage__pairForm} onSubmit={(event) => submitPairResult(event, player1.id, player2.id, pair.table)}>
          <b>
            {player1.name}</b>
          {player1.elo}
          <input type="number" min='0' max='100' name={`${player1.name} VP`} id={findPlayerById(pair.player1id).id}
            onChange={(e) => {
              setVpFirstPlayer(+e.target.value)
            }} />
          <b>
            {player2.name}</b>
          {player2.elo}
          <input type="number" min='0' max='100' name={`${player2.name} VP`} id={player2.id}
            onChange={(e) => {
              setVpSecondPlayer(+e.target.value)
            }} />
          <button type="submit">Submit</button>
        </form>
      </div>)
    })
      : <p>There is no pairings</p>
  };
  function submitPairResult(event: React.FormEvent<HTMLFormElement>, id1: string, id2: string, table: number) {
    event.preventDefault()
    updatePair(table)
  }
  function updatePair(table: number) {
    let pairArrayToUpdate = pairs

    if (vpFirstPlayer && vpSecondPlayer) {
      let vp1 = vpFirstPlayer
      let vp2 = vpSecondPlayer
      pairArrayToUpdate[table - 1] = calculatePairResults(pairArrayToUpdate[table - 1], vp1, vp2)
      setPairs([...pairArrayToUpdate])
    }
    else {
      alert('Check VP inputs first!')
    }
  }
  function calculatePairResults(pair: PairType, vp1: number, vp2: number) {
    let pairToCalculate = pair
    const player1 = findPlayerById(pair.player1id)
    const player2 = findPlayerById(pair.player2id)

    if (enteredResCount === pairs.length) {
      setEnteredResCount(0)
    }


    player1.vp += vp1
    player2.vp += vp2

    player2.opponentsIDs?.push(Number(player1.id))
    player1.opponentsIDs?.push(Number(player2.id))
    // Primary calculating
    if (vp1 - vp2 > 5) {
      const diffWTC = vp2 > 48 ? Math.round((vp1 - vp2) / 5) : 20
      const toWTC = calculateWTC(diffWTC)

      player1.primary += 3
      player2.primary += 0
      player1.to += toWTC[0]
      player2.to += toWTC[1]
    }
    else if (Math.abs(vp1 - vp2) <= 5) {
      player1.primary += player2.primary += 1
      player1.toOpponents += player2.toOpponents += player1.to += player2.to += 10
    }
    if (vp2 - vp1 > 5) {
      const diffWTC = vp1 > 48 ? Math.round((vp2 - vp1) / 5) : 20
      const toWTC = calculateWTC(diffWTC)
      player2.primary += 3
      player1.primary += 0
      player2.to += toWTC[0]
      player1.to += toWTC[1]
    }

    // Elo calculating
    player1.elo = calculateELO(player1.to, player1.elo!, player2.elo!)
    player2.elo = calculateELO(player2.to, player2.elo!, player1.elo!)

    // Setting to players array
    updatePlayersList(player1)
    updatePlayersList(player2)
    setVpFirstPlayer(0)
    setVpSecondPlayer(0)
    if (enteredResCount) {
      setEnteredResCount(enteredResCount + 1)
    }
    if (!enteredResCount) {
      setEnteredResCount(1)
    }

    return pairToCalculate
  }
  function updatePlayersList(playerUpdated: PlayerType) {
    const playerListToUpdate = players
    const playerToUpdateIndex = playerListToUpdate.findIndex((player) => player.id === playerUpdated.id)

    playerListToUpdate[playerToUpdateIndex] = playerUpdated

    setPlayers(playerListToUpdate)
  }

  function calculateWTC(diff: number) {
    let wtcPoints
    switch (diff) {
      case 1:
        wtcPoints = [11, 9]
        break
      case 2:
        wtcPoints = [11, 9]
        break
      case 3:
        wtcPoints = [12, 8]
        break
      case 4:
        wtcPoints = [13, 7]
        break
      case 5:
        wtcPoints = [14, 6]
        break
      case 6:
        wtcPoints = [15, 5]
        break
      case 7:
        wtcPoints = [16, 4]
        break
      case 8:
        wtcPoints = [17, 3]
        break
      case 9:
        wtcPoints = [18, 2]
        break
      case 10:
        wtcPoints = [19, 1]
        break
      default:
        wtcPoints = [20, 0]
        break
    }

    return wtcPoints
  }
  function calculateELO(to: number, rating1: number, rating2: number,) {
    const ELO_K = 100;
    const Ea = 1 / (1 + 10 ** ((rating2 - rating1) / 400))
    const Sa = to / 20
    return +(rating1 + ELO_K * (Sa - Ea)).toFixed(2)

  }


  useEffect(() => {
    function onRender() {
      randomizePairs(createPlayersArrayForPairings())
      setPlayers(createPlayersArrayForPairings())
    }
    onRender()
  }, [])
  useEffect(() => {
    if (enteredResCount === pairs.length) {

      setTourNumber(tourNumber + 1)
      console.log(tourNumber)
    }
  }, [enteredResCount])
  useEffect(() => {

  }, [players])



  return (
    <div className={styles.PairingsPage}>
      <>
        <h2>Test Pairings</h2>
        <h3>Players List</h3>
        {renderPlayers()}
        <br />
        <h3>First tour pairings</h3>
        {renderPairs()}
        {tourNumber === 2 &&
          <>
            <br />
            <h3>Second tour pairings</h3>
          </>
        }
      </>

    </div>
  );
}


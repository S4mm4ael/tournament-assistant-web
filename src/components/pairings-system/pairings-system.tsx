/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { UserType } from 'types/User.type';
import { PlayerType } from 'types/Event.type';
import { PairType } from 'types/Pairings.type';

import styles from './pairings.module.css';
import { SubmitHandler, UseFormHandleSubmit } from 'react-hook-form';


export function Pairings() {
  const ELO_K = 100;

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
      elo: 1500,
      firstname: 'Sasha',
      lastname: 'Kratkovskiy',
      nickname: 'Glin',
    },
    {
      id: '3',
      elo: 1400,
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
      elo: 1400,
      firstname: 'Floppy',
      lastname: 'Floppy',
      nickname: 'Floppy',
    },
    {
      id: '6',
      elo: 2000,
      firstname: 'Dima',
      lastname: 'Senchenko',
      nickname: 'Dima',
    },
  ];

  const [players, setPlayers] = useState<PlayerType[] | []>([])
  const [pairs, setPairs] = useState<PairType[] | []>([])
  const [vpFirstPlayer, setVpFirstPlayer] = useState<number>()
  const [vpSecondPlayer, setVpSecondPlayer] = useState<number>()

  function makePairings(tour: number) {
    switch (tour) {
      case 1:

        break;
      case 2:
        break;

      default:
        console.log('nothing found!')
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
      let player1 = players.splice((Math.random() * 1000) % players.length, 1)
      let player2 = players.splice((Math.random() * 1000) % players.length, 1)

      const pair: PairType = {
        player1: player1[0],
        player2: player2[0],
        table: table,
      }

      table++

      firstTourStandings.push(pair)

    }
    setPairs(firstTourStandings)
  }
  const renderPlayers = () => {
    return players.length > 0 ? players
      .sort((a, b) => b.primary - a.primary)
      .sort((a, b) => b.to - a.to)
      .sort((a, b) => b.vp - a.vp)
      .map((player: PlayerType) => (
        <p>ID:{player.id} - <b>{player.name}</b> - Primary:{player.primary}  TO:{player.to} VP:{player.vp}</p>
      ))
      : <p>There is no players</p>
  };
  const renderPairs = (tour?: number) => {
    return pairs.length > 0 ? pairs.map((pair: PairType) => (
      <div key={pair.player1.name + '-' + pair.player2.name} className={styles.PairingsPage__pairCard}>
        <p>Table: {pair.table}</p>
        <form className={styles.PairingsPage__pairForm} onSubmit={(event) => submitPairResult(event, pair.player1.id, pair.player2.id, pair.table)}>
          <b>
            {pair.player1.name}</b>
          <input type="number" min='0' max='100' name={`${pair.player1.name} VP`} id={pair.player1.id}
            onChange={(e) => {
              setVpFirstPlayer(+e.target.value)
            }} />
          <b>
            {pair.player2.name}</b>
          <input type="number" min='0' max='100' name={`${pair.player2.name} VP`} id={pair.player2.id}
            onChange={(e) => {
              setVpSecondPlayer(+e.target.value)
            }} />
          <button type="submit">Submit</button>
        </form>
      </div>
    ))
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
      console.log('Succesfully updated pair ', table)
      setPairs([...pairArrayToUpdate])
    }
    else {
      alert('Check VP inputs first!')
    }
  }
  function calculatePairResults(pair: PairType, vp1: number, vp2: number) {
    let pairToCalculate = pair
    let player1 = pairToCalculate.player1
    let player2 = pairToCalculate.player2

    player1.vp += vp1
    player2.vp += vp2

    player2.opponentsIDs?.push(Number(player1.id))
    player1.opponentsIDs?.push(Number(player2.id))
    // Primary calculating
    if (vp1 - vp2 > 5) {
      const toWTC = calculateWTC(Math.round((vp1 - vp2) / 5))
      player1.primary += 3
      player2.primary += 0
      player1.to += player2.toOpponents += toWTC[0]
      player2.to += player1.toOpponents += toWTC[1]
    }
    if (vp1 - vp2 <= 5) {
      player1.primary += player2.primary += 1
      player1.toOpponents += player2.toOpponents += player1.to += player2.to += 10
    }
    if (vp2 - vp1 > 5) {
      const toWTC = calculateWTC(Math.round((vp2 - vp1) / 5))
      player2.primary += 3
      player1.primary += 0
      player2.to += player1.toOpponents += toWTC[0]
      player1.to += player2.toOpponents += toWTC[1]
    }
    // Elo calculating


    console.log(player1.name, vpFirstPlayer, '-', vpSecondPlayer, player2.name)
    // Setting to players array
    updatePlayersList(player1)
    updatePlayersList(player2)
    setVpFirstPlayer(0)
    setVpSecondPlayer(0)

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
  useEffect(() => {
    function onRender() {
      randomizePairs(createPlayersArrayForPairings())
      setPlayers(createPlayersArrayForPairings())
    }
    onRender()
  }, [])
  useEffect(() => {
    console.log('Updated pairs state:')
    console.log(pairs)
  }, [pairs])




  return (
    <div className={styles.PairingsPage}>
      <>
        <h2>Test Pairings</h2>
        <h3>Players List</h3>
        {renderPlayers()}
        <br />
        <h3>First tour pairings</h3>
        {renderPairs()}
      </>

    </div>
  );
}


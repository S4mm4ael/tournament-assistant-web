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
        // setPlayers()
        // submitResults()

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
        opponentsIDs: []
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
    return players.length > 0 ? players.map((player: PlayerType) => (
      <p>ID:{player.id} - <b>{player.name}</b> - VP:{player.vp}</p>
    ))
      : <p>There is no players</p>
  };

  const renderPairs = (tour?: number) => {
    return pairs.length > 0 ? pairs.map((pair: PairType) => (
      <div className={styles.PairingsPage__pairCard}>
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
    // const vp1 = (document.getElementById(id1) as HTMLInputElement)?.value
    // const vp2 = (document.getElementById(id2) as HTMLInputElement)?.value
    // setVpFirstPlayer(+vp1)
    // setVpSecondPlayer(+vp2)
    updatePair(table)
  }

  function updatePair(table: number) {
    let pairArrayToUpdate = pairs
    let player1 = pairArrayToUpdate[table - 1].player1
    let player2 = pairArrayToUpdate[table - 1].player2
    if (vpFirstPlayer && vpSecondPlayer) {
      player1.vp = vpFirstPlayer
      player2.vp = vpSecondPlayer
      console.log('Succesfully updated pair ', table)
      console.log(player1.name, vpFirstPlayer, '-', vpSecondPlayer, player2.name)
      setVpFirstPlayer(-1)
      setVpSecondPlayer(-1)
      setPairs(pairArrayToUpdate)
      console.log(pairs)
    }
    // TODO WTF with state update
    else {
      alert('Check VP inputs first!')
    }
    // const updatePair = pairArrayToUpdate.find(pair => pair.table == table)
    // updatePair?.player1.vp = vpFirstPlayer
    // updatePair?.player2.vp = vpSecondPlayer
    // console.log(updatePair)
  }


  useEffect(() => {
    function onRender() {
      randomizePairs(createPlayersArrayForPairings())
      setPlayers(createPlayersArrayForPairings())
    }
    onRender()
  }, [])





  return (
    <div className={styles.PairingsPage}>
      <>
        <h2>Test Pairings</h2>
        <h3>Players List</h3>
        { renderPlayers()}
        <br />
        <h3>First tour pairings</h3>
        { renderPairs()}
      </>

    </div>
  );
}


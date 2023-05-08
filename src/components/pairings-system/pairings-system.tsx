/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { UserType } from 'types/User.type';
import { PlayerType } from 'types/Event.type';
import { PairType } from 'types/Pairings.type';

// export type PairType = {
//   player1: PlayerType;
//   player2: PlayerType;
//   table: number;
// };


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

  // To DO - wtf with endless hook 
  const [players, setPlayers] = useState<PlayerType[] | []>([])
  const [pairs, setPairs] = useState<PairType[] | []>([])


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
  function resultSubmission() {

    const pairsArray = pairs;

    for (let i = 0; i < pairs.length; i++) {
      let vp1 = ''
      let vp2 = ''
      prompt(`Enter pair ${i + 1} player 1 VP`, vp1)
      prompt(`Enter pair ${i + 1} player 2 VP`, vp2)

      pairsArray[i].player1.vp = +vp1;
      pairsArray[i].player2.vp = +vp2;

      if (i === 2) {
        console.log(pairsArray)
      }
    }
    //updatePair(+vp1, +vp2)
  }

  function updatePair(vp1: number, vp2: number) {

  }

  const renderPlayers = () => {
    return players.length > 0 ? players.map((player: PlayerType) => (
      <p>{player.id} - {player.name}</p>
    ))
      : <p>There is no players</p>
  };

  const renderPairs = (tour?: number) => {
    return pairs.length > 0 ? pairs.map((pair: PairType) => (
      <div>
        <p>{pair.player1.name} - {pair.player2.name}</p>
        <p>Table: {pair.table}</p>
      </div>
    ))
      : <p>There is no pairings</p>
  };




  useEffect(() => {
    function onRender() {
      console.log('firstTurnPairings')
      randomizePairs(createPlayersArrayForPairings())
      setPlayers(createPlayersArrayForPairings())
    }
    onRender()
  }, [])


  useEffect(() => {
    if (pairs.length) {

      resultSubmission()
    }
  }, [pairs])




  return (
    <div >
      <>
        <h2>Test Pairings</h2>
        { renderPlayers()}
        <br />
        <h3>First tour pairings</h3>
        { renderPairs()}
      </>



    </div>
  );
}


/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { UserType } from 'types/User.type';
import { PlayerType } from 'types/Event.type';

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
  ];
  const [players, setPlayers] = useState<PlayerType[] | []>([])
  function makePairings(tour: number) {
    switch (tour) {
      case 1:
        console.log('firstTurnPairings')
        randomizePairs(createPlayersArrayForPairings())
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

    while (players.length) {
      let player1 = players.splice((Math.random() * 1000) % players.length, 1)
      let player2 = players.splice((Math.random() * 1000) % players.length, 1)

      console.log(`${player1[0].name} -- ${player2[0].name}`)
    }
  }
  useEffect(() => {
    function onRender() {
      makePairings(1)
    }
    onRender()
  })




  return (
    <div >
      <h2>Test Pairings</h2>


    </div>
  );
}


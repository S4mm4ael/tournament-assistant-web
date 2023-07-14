import React, { useState } from 'react';

import styles from './pair-card.module.css';
import { EloCalcPlayerData } from 'types/Calculator.type';
import { calculateELO, calculateWTC } from 'utils/pairs-calculation';

type PairCardProps = {
  player1: EloCalcPlayerData;
  player2: EloCalcPlayerData;
};
export function PairCard({ player1, player2 }: PairCardProps) {
  const [playerOneElo, setPlayerOneElo] = useState(player1.elo);
  const [playerTwoElo, setPlayerTwoElo] = useState(player2.elo);
  const [playerOneNewElo, setPlayerOneNewElo] = useState<number | undefined>();
  const [playerTwoNewElo, setPlayerTwoNewElo] = useState<number | undefined>();
  const [playerOneVP, setPlayerOneVP] = useState<number | undefined>();
  const [playerTwoVP, setPlayerTwoVP] = useState<number | undefined>();
  const [playerOneTO, setPlayerOneTO] = useState<number | undefined>();
  const [playerTwoTO, setPlayerTwoTO] = useState<number | undefined>();
  function handleSubmit() {
    if (playerOneVP && playerTwoVP) {
      const vpDiff = playerOneVP - playerTwoVP;
      const playersWTC = calculateWTC(vpDiff);

      setPlayerOneTO(playersWTC[0]);
      setPlayerTwoTO(playersWTC[1]);

      if (playerOneTO && playerTwoTO) {
        const player1Elo = calculateELO(playerOneTO, playerOneElo, playerTwoElo);
        const player2Elo = calculateELO(playerTwoTO, playerTwoElo, playerOneElo);
        setPlayerOneNewElo(player1Elo);
        setPlayerTwoNewElo(player2Elo);
      }
    }
  }
  return (
    <div key={player1.nickname + '-' + player2.nickname} className={styles.pairCard}>
      <div className={styles.pairFormWrapper}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className={styles.pairForm}>
            <div className={styles.pairFormNames}>
              <b>{player1.nickname}</b>
              <b className={styles.pairFormElo}>Previous ELO:{playerOneElo}</b>
              <b className={styles.pairFormElo}>New ELO:{playerOneNewElo ? playerOneNewElo : ''}</b>
            </div>

            <div className={styles.pairFormInputs}>
              <h4>Victory points</h4>
              <div className={styles.pairFormVPBox}>
                <input
                  type="number"
                  min="0"
                  max="100"
                  name={`${player1.nickname} VP`}
                  id={player1.id}
                  placeholder="VP"
                  onChange={(e) => {
                    setPlayerOneVP(+e.target.value);
                  }}
                />
                <input
                  type="number"
                  min="0"
                  max="100"
                  name={`${player2.nickname} VP`}
                  id={player2.id}
                  placeholder="VP"
                  onChange={(e) => {
                    setPlayerTwoVP(+e.target.value);
                  }}
                />
              </div>
              {playerOneTO != undefined && playerTwoTO != undefined && (
                <>
                  <h4>WTC points</h4>
                  <b>
                    <b>{playerOneTO}</b> - <b>{playerTwoTO}</b>
                  </b>
                </>
              )}
            </div>
            <div className={styles.pairFormNames}>
              <b>{player2.nickname}</b>
              <b className={styles.pairFormElo}>Previous ELO:{playerTwoElo}</b>
              <b className={styles.pairFormElo}>New ELO:{playerTwoNewElo ? playerTwoNewElo : ''}</b>
            </div>
          </div>
          <button className={styles.pairFormSubmitBtn} type="submit">
            ✔
          </button>
        </form>
      </div>
    </div>
  );
}

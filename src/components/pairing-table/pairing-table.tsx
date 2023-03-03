import React from 'react';
import { EventType, PlayerType } from 'types/Event.type';
import { PairingType } from 'types/Pairings.type';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './pairing-table.module.css';

type EventProps = {
  eventP: EventType;
  playersP: PlayerType[] | null;
};

export function PairingTable({ eventP, playersP }: EventProps) {
  const event = eventP;
  const players = playersP;
  const tours = [1, 2, 3];

  function renderTour(tourNumber: number) {
    let tour: undefined | PairingType[];

    function comparePlayers(tourItem: PairingType, player: number) {
      const colors = {
        red: '#EF5350',
        green: '#AAF255',
        yellow: '#FFEE58',
      };
      if (tourItem.toRes[0] === tourItem.toRes[1]) {
        return colors.yellow;
      }
      if (player === 0) {
        if (tourItem.toRes[0] > tourItem.toRes[1]) {
          return colors.green;
        } else {
          return colors.red;
        }
      }
      if (player === 1) {
        if (tourItem.toRes[1] > tourItem.toRes[0]) {
          return colors.green;
        } else {
          return colors.red;
        }
      }
    }

    switch (tourNumber) {
      case 1:
        if (event?.tour1) {
          tour = event?.tour1;
        }
        break;
      case 2:
        if (event?.tour2) {
          tour = event?.tour2;
        }
        break;

      case 3:
        if (event?.tour3) {
          tour = event?.tour3;
        }
        break;
      default:
        break;
    }
    if (players && tour) {
      return tour.map((tourItem) => (
        <tr key={tourItem.players[0]}>
          <td
            style={{ backgroundColor: comparePlayers(tourItem, 0) }}
            className={styles.EventPage__tableNames}
          >
            {players.find((x) => x.id === tourItem.players[0])?.name}
          </td>
          <td className={styles.EventPage__tablePoints}>{tourItem.toRes[0]}</td>
          <td className={styles.EventPage__tablePoints}>{tourItem.vpRes[0]}</td>
          <td className={styles.EventPage__tablePoints}>{tourItem.vpRes[1]}</td>
          <td className={styles.EventPage__tablePoints}>{tourItem.toRes[1]}</td>
          <td
            style={{ backgroundColor: comparePlayers(tourItem, 1) }}
            className={styles.EventPage__tableNames}
          >
            {players.find((x) => x.id === tourItem.players[1])?.name}
          </td>
        </tr>
      ));
    }
    return;
  }

  return (
    <>
      <div className={styles.EventPage__swiperContainer}>
        <Swiper
          pagination={true}
          slidesPerView={1}
          navigation={false}
          modules={[Navigation, Pagination]}
        >
          {tours.map((index) => {
            return (
              <SwiperSlide key={Math.random()} className={styles.EventPage__slide}>
                <div className={styles.EventPage__title}>
                  <h3>Tour {index}</h3>
                </div>

                <table
                  className={styles.EventPage__table}
                  border={2}
                  cellSpacing={2}
                  cellPadding={1}
                >
                  <thead>
                    <tr>
                      <td className={styles.EventPage__tableNames}>Player1</td>
                      <td className={styles.EventPage__tablePoints}>Player1 TO</td>
                      <td className={styles.EventPage__tablePoints}>Player1 VP</td>
                      <td className={styles.EventPage__tablePoints}>Player2 VP</td>
                      <td className={styles.EventPage__tablePoints}>Player2 TO</td>
                      <td className={styles.EventPage__tableNames}>Player2</td>
                    </tr>
                  </thead>
                  <tbody>{renderTour(index)}</tbody>
                </table>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
}

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
  function renderTour(tourNumber: number) {
    let tour: undefined | PairingType[];
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
          <td className={styles.EventPage__tableNames}>
            {players.find((x) => x.id === tourItem.players[0])?.name}
          </td>
          <td className={styles.EventPage__tablePoints}>{tourItem.toRes[0]}</td>
          <td className={styles.EventPage__tablePoints}>{tourItem.vpRes[0]}</td>
          <td className={styles.EventPage__tablePoints}>{tourItem.vpRes[1]}</td>
          <td className={styles.EventPage__tablePoints}>{tourItem.toRes[1]}</td>
          <td className={styles.EventPage__tableNames}>
            {players.find((x) => x.id === tourItem.players[1])?.name}
          </td>
        </tr>
      ));
    }
    return;
  }

  return (
    <>
      <table className={styles.EventPage__table} border={2} cellSpacing={2} cellPadding={1}>
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
      </table>
      <div className={styles.EventPage__swiperContainer}>
        <Swiper
          pagination={true}
          slidesPerView={1}
          navigation={true}
          modules={[Navigation, Pagination]}
        >
          <SwiperSlide className={styles.EventPage__slide}>
            <div className={styles.EventPage__title}>
              <h3>Tour 1</h3>
            </div>

            <table className={styles.EventPage__table} border={2} cellSpacing={2} cellPadding={1}>
              {renderTour(1)}
            </table>
          </SwiperSlide>
          <SwiperSlide className={styles.EventPage__slide}>
            <div className={styles.EventPage__title}>
              <h3>Tour 2</h3>
            </div>
            <table className={styles.EventPage__table} border={2} cellSpacing={2} cellPadding={1}>
              {renderTour(2)}
            </table>
          </SwiperSlide>
          <SwiperSlide className={styles.EventPage__slide}>
            <div className={styles.EventPage__title}>
              <h3>Tour 3</h3>
            </div>
            <table className={styles.EventPage__table} border={2} cellSpacing={2} cellPadding={1}>
              {renderTour(3)}
            </table>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}

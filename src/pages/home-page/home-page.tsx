import { UsersList } from 'components/users-list';
import { EventsList } from 'components/events-list';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from './home-page.module.css';

export function HomePage() {
  return (
    <div className={styles.MainPage}>
      <div className={styles.MainPage__swiperContainer}>
        <Swiper
          pagination={true}
          slidesPerView={1}
          navigation={true}
          modules={[Navigation, Pagination]}
        >
          <SwiperSlide className={styles.MainPage__slide}>
            <EventsList />
          </SwiperSlide>
          <SwiperSlide className={styles.MainPage__slide}>
            <UsersList />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

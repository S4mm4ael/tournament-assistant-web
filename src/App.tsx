import React from 'react';
import stylesApp from './App.module.css';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from 'pages/home-page';
import { Layout } from 'components/layout';
import { EventPage } from 'pages/event-page';

function App() {
  return (
    <div className={stylesApp.App}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/event/:eventId" element={<EventPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

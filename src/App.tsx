import React from 'react';
import stylesApp from './App.module.css';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from 'pages/home-page';

function App() {
  return (
    <div className={stylesApp.App}>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;

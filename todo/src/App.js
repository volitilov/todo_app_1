import classes from './styles.module.css';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Paths from './routes';
import Header from './components/Header';

const App = () => {
  return (
    <Router>
      <Header />
      <main className={classes.container}>
        <Paths />
      </main>
    </Router>
  );
};

export default App;
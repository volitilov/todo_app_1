import classes from './styles.module.css';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from './components/Header';
import TaskList from './components/TaskList';


const App = observer(() => {
  return (
    <Router>
      <Header />
      <main className={classes.container}>
        <TaskList />
      </main>
    </Router>
  );
});

export default App;
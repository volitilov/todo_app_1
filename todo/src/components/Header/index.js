import classes from './styles.module.css';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import adminStore from '../../stores/adminStore';

import {Button, useToaster} from '@gravity-ui/uikit';


const Header = observer(() => {
  const navigate = useNavigate();
  const {add} = useToaster();

  const logout = () => {
    adminStore.logout();
    add({
      title: 'Внимание',
      content: 'Вы вышли из системы',
      theme: 'warning',
    });
  };

  return (
    <header className={classes.header}>
      <Button selected onClick={() => navigate('/')}>TooDoo</Button>
      <div className={classes.buttons}>
        <Button view="action" onClick={() => navigate('/add_task')} 
          className={classes.addTaskBtn}>+ Добавить</Button>
        {adminStore.isAdmin ? (
            <Button onClick={logout}>Выход</Button>
        ) : (
          <Button onClick={() => navigate('/login')}>Войти</Button>
        )}
      </div>
    </header>
  );
});

export default Header;
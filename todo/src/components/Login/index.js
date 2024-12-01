import classes from './styles.module.css';
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import adminStore from '../../stores/adminStore';
import taskStore from '../../stores/taskStore';
import {Button, TextInput, useToaster} from '@gravity-ui/uikit';

const Login = observer(() => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {add} = useToaster();

  const handleSubmit = (e) => {
    e.preventDefault();

    const adminUsername = process.env.REACT_APP_ADMIN_USERNAME;
    const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD;

    if (username === adminUsername && password === adminPassword) {
        adminStore.login();
        add({
          title: 'Успешно',
          content: 'Вы успешно авторизовались',
          theme: 'success',
        });
        const qSortBy = taskStore.currentSortBy;
        const qStatus = taskStore.currentFilterStatus;
        const qSortOrder = taskStore.currentOrderBy;

        navigate(`/?page=1&sort_by=${qSortBy}&status=${qStatus}&sort_order=${qSortOrder}`);
    } else {
        add({
          title: 'Ошибка',
          content: 'Неверный логин или пароль',
          theme: 'danger',
        });
    }

  };

  return (
    <section className={classes.container}>
      <h2>Авторизация</h2>
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextInput
          size='l'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Логин" />
        <TextInput
          size='l'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль" />
        <Button view="action" size="l" type="submit" disabled={!username || !password}>Войти</Button>
      </form>
    </section>
  );
});

export default Login;
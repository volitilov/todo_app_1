import classes from './styles.module.css';
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import adminStore from '../../stores/adminStore';
import {Button, TextInput, Label} from '@gravity-ui/uikit';

const Login = observer(() => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        adminStore.login(username, password);
    };

    return (
        <section className={classes.container}>
            <h2>Авторизация</h2>
            <form onSubmit={handleSubmit} className={classes.form}>
                <TextInput 
                    startContent={<Label size="m">login</Label>}
                    size='l'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Логин" />
                <TextInput 
                    startContent={<Label size="m">password</Label>}
                    size='l'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Пароль" />
                <Button view="action" size="l" type="submit">Войти</Button>
            </form>
        </section>
    );
});

export default Login;
import classes from './styles.module.css';
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import taskStore from '../../stores/taskStore';
import {Button, TextInput, Label, TextArea} from '@gravity-ui/uikit';

const TaskForm = observer(({onCreate=()=>{}}) => {
  const navigate = useNavigate();
  const [task, setTask] = useState({ username: '', email: '', text: '' });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    onCreate();
    e.preventDefault();
    taskStore.createTask(task);
    setTask({ username: '', email: '', text: '' });
    navigate(`/?page=1`);
  };

  return (
    <section className={classes.container}>
      <h2>Добавление задачи</h2>
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextInput 
          startContent={<Label size="m">username</Label>}
          size='l'
          name="username"
          value={task.username}
          onChange={handleChange}
          placeholder="Имя пользователя" />
        <TextInput 
          startContent={<Label size="m">email</Label>}
          size='l'
          type='email'
          name="email"
          value={task.email}
          onChange={handleChange}
          placeholder="Email" />

        <TextArea 
          minRows={5}
          name="text"
          value={task.text}
          onChange={handleChange}
          placeholder="Текст задачи" />

        <Button view="action" size="l" type="submit">Создать задачу</Button>
      </form>
    </section>
  );
});

export default TaskForm;

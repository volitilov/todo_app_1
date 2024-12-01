import classes from './styles.module.css';
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import taskStore from '../../stores/taskStore';
import {Button, TextInput, TextArea, useToaster} from '@gravity-ui/uikit';
import { checkSpaces, checkLength } from '../../utils/main';
import {
  MIN_LOGIN_LENGTH, MAX_LOGIN_LENGTH,
  MIN_TASK_TEXT_LENGTH, MAX_TASK_TEXT_LENGTH
} from '../../constants';

const TaskForm = observer(() => {
  const navigate = useNavigate();
  const {add} = useToaster();
  const [task, setTask] = useState({ username: '', email: '', text: '' });
  const [validLogin, setValidLogin] = React.useState(true);
  const [validEmail, setValidEmail] = React.useState(true);
  const [validText, setValidText] = React.useState(true);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const checkLogin = (value) => {
    const loginExcludeSpaces = checkSpaces(value);
    const isValid = loginExcludeSpaces && checkLength(MIN_LOGIN_LENGTH, MAX_LOGIN_LENGTH, value);

    setValidLogin(isValid);
    return isValid;
  }

  const checkTaskText = (value) => {
    const isValid = checkLength(MIN_TASK_TEXT_LENGTH, MAX_TASK_TEXT_LENGTH, value);
    setValidText(isValid);
    return isValid;
  }

  const checkEmail = (value) => {
    const pattern = /^(?!.* )[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/;
    const isValid = pattern.test(value);
    setValidEmail(isValid);
    return isValid;
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    const validLogin = checkLogin(task.username);
    const validEmail = checkEmail(task.email);
    const validText = checkTaskText(task.text);

    if (!validLogin || !validEmail || !validText) {
      return;
    }

    const qSortBy = taskStore.currentSortBy;
    const qStatus = taskStore.currentFilterStatus;
    const qSortOrder = taskStore.currentOrderBy;

    taskStore.createTask(task);
    add({
      title: 'Успешно',
      content: 'Задача успешно добавлена',
      theme: 'success',

    });
    navigate(`/?page=1&sort_by=${qSortBy}&status=${qStatus}&sort_order=${qSortOrder}`);
  };

  return (
    <section className={classes.container}>
      <h2>Добавление задачи</h2>
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextInput
          size='l'
          name="username"
          value={task.username}
          onChange={handleChange}
          onBlur={(e) => checkLogin(e.target.value)}
          errorMessage="Имя пользователя должно содержать от 5 до 20 символов и не должно содержать пробелы"
          validationState={validLogin ? 'valid' : 'invalid'}
          placeholder="Имя пользователя" />
        <TextInput
          size='l'
          type='email'
          name="email"
          value={task.email}
          onChange={handleChange}
          onBlur={(e) => checkEmail(e.target.value)}
          errorMessage="Email должен быть валидным"
          validationState={validEmail ? 'valid' : 'invalid'}
          placeholder="Email" />

        <TextArea 
          minRows={5}
          name="text"
          value={task.text}
          onChange={handleChange}
          onBlur={(e) => checkTaskText(e.target.value)}
          errorMessage="Текст задачи должен содержать от 30 до 1000 символов"
          validationState={validText ? 'valid' : 'invalid'}
          placeholder="Текст задачи" />

        <Button view="action" size="l" type="submit" disabled={!validLogin || !validEmail || !validText}>Создать задачу</Button>
      </form>
    </section>
  );
});

export default TaskForm;

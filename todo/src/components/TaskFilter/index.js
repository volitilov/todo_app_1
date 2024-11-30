import classes from './styles.module.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import {Select, TextInput, Button} from '@gravity-ui/uikit';
import taskStore from '../../stores/taskStore';

const TaskFilter = observer(() => {
  const navigate = useNavigate();

  const handleChange = () => {
    navigate(`/?page=${taskStore.currentPage}&sort_by=${taskStore.currentSortBy}&username=${taskStore.currentFilterUsername}&email=${taskStore.currentFilterEmail}&status=${taskStore.currentFilterStatus}`);
  };

  const changeStatus = (e) => {
    // console.log(e);
    const value = e.length ? e[0] : 'all';
    taskStore.currentFilterStatus = value;
    handleChange();
  };

  const changeSort = (e) => {
    // console.log(e);
    const value = e.length ? e[0] : 'all';
    taskStore.currentSortBy = value;
    handleChange();
  };

  const changeUsername = (e) => {
    taskStore.currentFilterUsername = e.target.value;
  };

  const changeEmail = (e) => {
    taskStore.currentFilterEmail = e.target.value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleChange();
  };

  return (
    <div className={classes.filter}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextInput 
            size='s'
            value={taskStore.currentFilterUsername}
            onChange={changeUsername}
            placeholder="Имя пользователя" />
          <TextInput 
            className={classes.emailInput}
            size='s'
            type='email'
            value={taskStore.currentFilterEmail}
            onChange={changeEmail}
            placeholder="Email" />
          <Button view="action" size="s" type="submit">Поиск</Button>
      </form>
      <div>
        <Select onUpdate={changeSort} value={[taskStore.currentSortBy]} className={classes.mainSort}>
          <Select.Option value="id">По умолчанию</Select.Option>
          <Select.Option value="created">По дате</Select.Option>
          <Select.Option value="username">По логину</Select.Option>
          <Select.Option value="email">По email</Select.Option>
        </Select>
        <Select onUpdate={changeStatus} value={[taskStore.currentFilterStatus]}
          renderSelectedOption={(option) => {
            return (
              <div style={{color: option.data.color}}>
                {option.children}
              </div>
            );
          }}>
          <Select.Option value="all" data={{color: ''}}>Все статусы</Select.Option>
          <Select.Option value="true" data={{color: 'green'}}>Готово</Select.Option>
          <Select.Option value="false" data={{color: 'tomato'}}>Не готово</Select.Option>
        </Select>
      </div>
    </div>
  );
});

export default TaskFilter;
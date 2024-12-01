import classes from './styles.module.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import {Select} from '@gravity-ui/uikit';
import taskStore from '../../stores/taskStore';
import SortButton from '../SortButton';


const TaskFilter = observer(() => {
  const navigate = useNavigate();

  const handleChange = () => {
    navigate(`/?page=${taskStore.currentPage}&sort_by=${taskStore.currentSortBy}&status=${taskStore.currentFilterStatus}&sort_order=${taskStore.currentOrderBy}`);
  };

  const changeStatus = (e) => {
    const value = e.length ? e[0] :  'all';
    taskStore.currentFilterStatus = value;
    handleChange();
  };

  return (
    <div className={classes.filter}>
      <div className={classes.sortBtns}>
        <SortButton title="по email" value={'email'} handleChange={handleChange} />
        <SortButton title="по имени" value={'username'} handleChange={handleChange} />
        <SortButton title="по дате" value={'created'} handleChange={handleChange} />
        <SortButton title="по статусу" value={'status'} handleChange={handleChange} />
      </div>
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
  );
});

export default TaskFilter;
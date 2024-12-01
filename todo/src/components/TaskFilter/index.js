import classes from './styles.module.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import {Select} from '@gravity-ui/uikit';
import taskStore from '../../stores/taskStore';
import SortButton from '../SortButton';
import {
  DEFAULT_TASK_STATUS,
  TASK_SORT_BY_CREATED,
  TASK_SORT_BY_EMAIL,
  TASK_SORT_BY_STATUS,
  TASK_SORT_BY_USERNAME
} from '../../constants';


const TaskFilter = observer(() => {
  const navigate = useNavigate();

  const handleChange = () => {
    navigate(`/?page=${taskStore.currentPage}&sort_by=${taskStore.currentSortBy}&status=${taskStore.currentFilterStatus}&sort_order=${taskStore.currentOrderBy}`);
  };

  const changeStatus = (e) => {
    const value = e.length ? e[0] :  DEFAULT_TASK_STATUS;
    taskStore.currentFilterStatus = value;
    handleChange();
  };

  return (
    <div className={classes.filter}>
      <div className={classes.sortBtns}>
        <SortButton title="по email" value={TASK_SORT_BY_EMAIL} handleChange={handleChange} />
        <SortButton title="по имени" value={TASK_SORT_BY_USERNAME} handleChange={handleChange} />
        <SortButton title="по дате" value={TASK_SORT_BY_CREATED} handleChange={handleChange} />
        <SortButton title="по статусу" value={TASK_SORT_BY_STATUS} handleChange={handleChange} />
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
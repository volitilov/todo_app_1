import classes from './styles.module.css';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import taskStore from '../../stores/taskStore';
import adminStore from '../../stores/adminStore';
import Task from '../Task';
import TaskEditor from '../TaskEditor';
import {Pagination, Loader} from '@gravity-ui/uikit';
import TaskFilter from '../TaskFilter';

const TaskList = observer(() => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [pageState, setPageState] = useState({
    page: parseInt(searchParams.get('page')) || 1,
    pageSize: 3
  });

  useEffect(() => {
    const qPage = parseInt(searchParams.get('page')) || 1;
    const qStatus = searchParams.get('status') || 'all';
    const qSortBy = searchParams.get('sort_by') || 'created';
    const qSortOrder = searchParams.get('sort_order') || 'desc';
    taskStore.currentSortBy = qSortBy;
    taskStore.currentPage = qPage;
    taskStore.currentFilterStatus = qStatus;
    taskStore.currentOrderBy = qSortOrder;
    taskStore.fetchTasks();

    if (taskStore.error) return <p>Ошибка: {taskStore.error}</p>;

    setPageState({ page: qPage, pageSize: 3 });
  }, [searchParams]);

  if (taskStore.loading) return <div className={classes.loader}><Loader size="s" /></div>;
  if (taskStore.error) return <p>Ошибка: {taskStore.error}</p>;

  const handleUpdate = (page, pageSize) => {
    setPageState((prevState) => ({...prevState, page, pageSize}));
    navigate(`/?page=${page}&sort_by=${taskStore.currentSortBy}&status=${taskStore.currentFilterStatus}&sort_order=${taskStore.currentOrderBy}`);
  }

  return (
    <>
      <TaskFilter />
      <div className={classes.tasks}>
        {taskStore.tasks.map(task => (
          <div key={task.id}>
            {adminStore.isAdmin ? (
              <TaskEditor task={task} page={pageState.page} />
            ) : <Task task={task} page={pageState.page} />}
          </div>
        ))}
        <Pagination page={pageState.page} pageSize={pageState.pageSize} total={taskStore.totalTasks} 
          onUpdate={handleUpdate}
          className={classes.pagination} />
      </div>
    </>
  );
});

export default TaskList;
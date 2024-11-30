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
    pageSize: 3,
    usernameFilter: '',
    emailFilter: '',
    statusFilter: 'all',
  });

  useEffect(() => {
    const qPage = parseInt(searchParams.get('page')) || 1;
    const qUsername = searchParams.get('username') || '';
    const qEmail = searchParams.get('email') || '';
    const qStatus = searchParams.get('status') || 'all';
    const qSortBy = searchParams.get('sort_by') || 'id';
    taskStore.currentSortBy = qSortBy;
    taskStore.currentPage = qPage;
    taskStore.currentFilterUsername = qUsername;
    taskStore.currentFilterEmail = qEmail;
    taskStore.currentFilterStatus = qStatus;
    taskStore.fetchTasks();
    if (taskStore.error) return <p>Ошибка: {taskStore.error}</p>;

    setPageState({ page: qPage, usernameFilter: qUsername, emailFilter: qEmail, statusFilter: qStatus, pageSize: 3 });
  }, [searchParams]);

  if (taskStore.loading) return <div className={classes.loader}><Loader size="s" /></div>;
  if (taskStore.error) return <p>Ошибка: {taskStore.error}</p>;

  const handleUpdate = (page, pageSize) => {
    setPageState((prevState) => ({...prevState, page, pageSize}));
    navigate(`/?page=${page}&sort_by=${taskStore.currentSortBy}&username=${taskStore.currentFilterUsername}&email=${taskStore.currentFilterEmail}&status=${taskStore.currentFilterStatus}`);
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
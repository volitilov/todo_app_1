import classes from './styles.module.css';
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';

import adminStore from '../../stores/adminStore';

import {Button, Modal, Avatar } from '@gravity-ui/uikit';
import {FaceAlien} from '@gravity-ui/icons';

import TaskForm from '../TaskForm';
import Login from '../Login';


const Header = observer(() => {
    const [openAddTaskForm, setOpenAddTaskForm] = useState(false);
    const [openLoginForm, setOpenLoginForm] = useState(false);

    const taskCreated = () => {
        setOpenAddTaskForm(false);
    }

    return (
      <header className={classes.header}>
        <h2>ToDoX</h2>
        <div className={classes.buttons}>
          <Button view="action" onClick={() => setOpenAddTaskForm(true)} 
            className={classes.addTaskBtn}>+ Добавить</Button>
          <Modal 
            open={openAddTaskForm}
            onClose={() => setOpenAddTaskForm(false)}>
            <div className={classes.taskFormModal}>
              <TaskForm onCreate={taskCreated} />
            </div>
          </Modal>
          {adminStore.isAdmin ? (
              <Avatar icon={FaceAlien} size="l" />
          ) : (
            <>
              <Button onClick={() => setOpenLoginForm(true)}>Войти</Button>
              <Modal open={openLoginForm} onClose={() => setOpenLoginForm(false)}>
                <div className={classes.authModal}>
                  <Login />
                </div>
              </Modal>
            </>
          )}
        </div>
      </header>
    );
});

export default Header;
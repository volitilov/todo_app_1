import classes from './styles.module.css';
import React from 'react';
import { observer } from 'mobx-react-lite';
import {Card, User, Checkbox, Label} from '@gravity-ui/uikit';


const Task = observer(({task}) => {
  return (
    <Card className={classes.task} view='filled' 
      theme={task.status ? 'success' : 'normal'}
      type="container">
        <div className={classes.taskHeader}>
          <User avatar={{text: task.username, theme: 'brand'}} name={task.username} description={task.email} size="s" />
          <div className={classes.taskHeaderRight}>
            {task.text_is_edited && <Label theme="warning" size="xs">отредактировано администратором</Label>}
            <Checkbox size="l" checked={task.status} disabled>
              {task.status ? 'Выполнено' : 'Не выполнено'}
            </Checkbox>
          </div>
        </div>
        <p className={classes.taskText}>{task.text}</p>
    </Card>
  );
});

export default Task;
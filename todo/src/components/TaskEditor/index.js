import classes from './styles.module.css';
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import taskStore from '../../stores/taskStore';
import {Card, User, Checkbox, TextArea, Button, Icon, Label, useToaster} from '@gravity-ui/uikit';
import {Pencil} from '@gravity-ui/icons';


const TaskEditor = observer(({ task }) => {
  const {add} = useToaster();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    taskStore.updateTask(task.id, { text: editedText, text_is_edited: editedText !== task.text });
    setIsEditing(false);
    add({
      title: 'Успешно',
      content: 'Задача успешно изменена',
      theme: 'success',

    });
  };

  const handleCheckboxChange = () => {
    taskStore.updateTask(task.id, { status: !task.status });
  };

  return (
    <Card className={classes.task} view='filled' 
      theme={task.status ? 'success' : 'normal'}
      type="container">
        <div className={classes.taskHeader}>
          <User avatar={{text: task.username, theme: 'brand'}} name={task.username} description={task.email} size="s" />
          <div className={classes.taskHeaderRight}>
            {task.text_is_edited && <Label theme="warning" size="xs">отредактировано администратором</Label>}
            <Checkbox size="l" 
                checked={task.status}
                onChange={handleCheckboxChange}>{task.status ? 'Выполнено' : 'Не выполнено'}</Checkbox>
          </div>
        </div>
        <div className={classes.taskText}>
          {isEditing ? (
            <TextArea 
              minRows={5}
              name="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              placeholder="Текст задачи" />
          ) : (
            <div className={classes.editTextBlock}>
              <p>{task.text}</p>
              <Button onliIcon size="l" onClick={handleEdit}>
                <Icon data={Pencil} size={18} />
              </Button>
            </div>
          )}
        </div>
        {isEditing && 
          <Button view="normal" size="l" onClick={handleSave}>
            Сохранить
          </Button>
        }
      </Card>
  );
});

export default TaskEditor;
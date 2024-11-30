import classes from './styles.module.css';
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import taskStore from '../../stores/taskStore';
import {Card, User, Checkbox, TextArea, Button, Icon} from '@gravity-ui/uikit';
import {Pencil} from '@gravity-ui/icons';

const TaskEditor = observer(({ task, page=1 }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(task.text);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        taskStore.updateTask(task.id, { text: editedText }, page);
        setIsEditing(false);
    };

    const handleCheckboxChange = () => {
        taskStore.updateTask(task.id, { status: !task.status }, page);
    };

    return (
      <Card className={classes.task} view='filled' 
        theme={task.status ? 'success' : 'normal'}
        type="container">
            <div className={classes.taskHeader}>
            <User avatar={{text: task.username, theme: 'brand'}} name={task.username} description={task.email} size="s" />
            <Checkbox size="l" 
                checked={task.status}
                onChange={handleCheckboxChange} />
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
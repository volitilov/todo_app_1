import React from 'react';
import { observer } from 'mobx-react-lite';
import {Button, Icon} from '@gravity-ui/uikit';
import {ArrowUp, ArrowDown} from '@gravity-ui/icons';
import taskStore from '../../stores/taskStore';
import { TASK_ORDER_BY_ASC, TASK_ORDER_BY_DESC } from '../../constants';


const SortButton = observer(({title, value, handleChange}) => {
  const changeSort = () => {
    taskStore.currentSortBy = value;

    if (taskStore.currentOrderBy === TASK_ORDER_BY_ASC) {
      taskStore.currentOrderBy = TASK_ORDER_BY_DESC;
    } else {
      taskStore.currentOrderBy = TASK_ORDER_BY_ASC;
    }

    handleChange();
  };

  return (
    <Button view="outlined" size="s" onClick={changeSort}>
      <Icon data={(taskStore.currentOrderBy === TASK_ORDER_BY_ASC && taskStore.currentSortBy === value) ? ArrowUp : ArrowDown} size={12} />
      {title}
    </Button>
  );
});

export default SortButton;
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import {Button, Icon} from '@gravity-ui/uikit';
import {ArrowUp, ArrowDown} from '@gravity-ui/icons';
import taskStore from '../../stores/taskStore';


const SortButton = observer(({title, value, handleChange}) => {
  const changeSort = () => {
    taskStore.currentSortBy = value;

    if (taskStore.currentOrderBy === 'asc') {
      taskStore.currentOrderBy = 'desc';
    } else {
      taskStore.currentOrderBy = 'asc';
    }

    handleChange();
  };

  return (
    <Button view="outlined" size="s" onClick={changeSort}>
      <Icon data={(taskStore.currentOrderBy === 'asc' && taskStore.currentSortBy === value) ? ArrowUp : ArrowDown} size={12} />
      {title}
    </Button>
  );
});

export default SortButton;
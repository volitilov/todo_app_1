import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

const Paths = () => (
  <Routes>
    <Route exact path="/" element={<TaskList />} />
    <Route path="/login" element={<Login />} />
    <Route path="/add_task" element={<TaskForm />} />
  </Routes>
);

export default Paths;
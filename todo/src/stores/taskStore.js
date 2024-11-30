import { makeAutoObservable } from 'mobx';
import api from '../api';

class TaskStore {
    tasks = [];
    loading = false;
    totalTasks = 0;
    error = null;
    currentPage = 1;
    currentFilterStatus = 'all';
    currentFilterUsername = '';
    currentFilterEmail = '';
    currentSortBy = 'id';

    constructor() {
        makeAutoObservable(this);
    }

    fetchTasks = async () => {
        this.loading = true;
        try {
            const response = await api.get(
                `/tasks?page=${this.currentPage}&sort_by=${this.currentSortBy}&username=${this.currentFilterUsername}&email=${this.currentFilterEmail}&status=${this.currentFilterStatus}`);
            this.tasks = response.data.tasks;
            this.totalTasks = response.data.total_tasks;
        } catch (error) {
            this.error = error.message;
        } finally {
            this.loading = false;
        }
    };

    createTask = async (task) => {
        try {
            await api.post('/tasks', task);
            this.fetchTasks();
        } catch (error) {
            console.error(error);
        }
    };

    updateTask = async (task_id, task, page=1) => {
        try {
            await api.put(`/tasks/${task_id}`, task);
            this.fetchTasks(page);
        } catch (error) {
            console.error(error);
        }
    };
}

const taskStore = new TaskStore();
export default taskStore;
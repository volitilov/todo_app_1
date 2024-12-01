import { makeAutoObservable } from 'mobx';
import api from '../api';

class TaskStore {
    tasks = [];
    loading = false;
    totalTasks = 0;
    error = null;
    currentPage = 1;
    currentFilterStatus = 'all'; // all, true, false
    currentSortBy = 'created';
    currentOrderBy = 'desc'; // desc, asc

    constructor() {
        makeAutoObservable(this);
    }

    fetchTasks = async () => {
        this.loading = true;
        try {
            const response = await api.get(
                `/tasks?page=${this.currentPage}&sort_by=${this.currentSortBy}&status=${this.currentFilterStatus}&sort_order=${this.currentOrderBy}`);
            this.tasks = response.data.tasks;
            console.log(response.data);
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

    updateTask = async (task_id, task) => {
        try {
            await api.put(`/tasks/${task_id}`, task);
            this.fetchTasks();
        } catch (error) {
            console.error(error);
        }
    };
}

const taskStore = new TaskStore();
export default taskStore;
import { makeAutoObservable } from 'mobx';
import api from '../api';


class AdminStore {
  isAdmin = false;
  accessToken = localStorage.getItem('accessToken') || null;

  constructor() {
    makeAutoObservable(this);
    this.initializeFromLocalStorage();
  }

  initializeFromLocalStorage() {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      this.isAdmin = true;
      this.accessToken = accessToken;
    }
  }

  login = (accessToken) => {
    this.isAdmin = true;
    this.accessToken = accessToken;
    localStorage.setItem('accessToken', accessToken);
  };

  logout = async () => {
    this.isAdmin = false;
    this.accessToken = null;
    localStorage.removeItem('accessToken');
    await api.post('/logout');
  };
}

const adminStore = new AdminStore();
export default adminStore;

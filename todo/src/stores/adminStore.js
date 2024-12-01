import { makeAutoObservable } from 'mobx';


class AdminStore {
  isAdmin = false;
  accessToken = localStorage.getItem('accessToken') || null;

  constructor() {
    makeAutoObservable(this);
  }

  login = (accessToken) => {
    this.isAdmin = true;
    this.accessToken = accessToken;
    localStorage.setItem('accessToken', accessToken);
  };

  logout = () => {
    this.isAdmin = false;
    this.accessToken = null;
    localStorage.removeItem('accessToken');
  };
}

const adminStore = new AdminStore();
export default adminStore;

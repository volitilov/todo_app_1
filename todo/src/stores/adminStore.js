import { makeAutoObservable } from 'mobx';

class AdminStore {
    isAdmin = false;

    constructor() {
        makeAutoObservable(this);
    }

    login = (username, password) => {
        if (username === 'admin' && password === '123') {
            this.isAdmin = true;
        } else {
            alert('Неверный логин или пароль');
        }
    };

    logout = () => {
        this.isAdmin = false;
    };
}

const adminStore = new AdminStore();
export default adminStore;
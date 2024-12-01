import { makeAutoObservable } from 'mobx';


class AdminStore {
    isAdmin = false;

    constructor() {
        makeAutoObservable(this);
    }

    login = () => {
        this.isAdmin = true;
    };

    logout = () => {
        this.isAdmin = false;
    };
}

const adminStore = new AdminStore();
export default adminStore;
import { observable, action, computed, toJS } from 'mobx'

class DataStore {
    @observable interaction = {
        freezeSG : false,
        
    };

    @observable activeMovies = [];

    @action addActiveMovies(arr) {
        this.activeMovies = arr;
    }
    
    @action clearActiveMovies() {
        this.activeMovies = [];
    }

    @action resetSelection() {
        console.log("hehe")
        this.activeMovies = [];
        this.interaction.freezeSG = false;
    }

    @action freezeSG() {
        this.interaction.freezeSG = true;
    }

    @action defreezeSG() {
        this.interaction.freezeSG = false;
    }

    @computed get getFreezeSG() {
        return this.interaction.freezeSG;
    }

}

const dataStore = new DataStore;
export default dataStore;
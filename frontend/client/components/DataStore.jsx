import { observable, action, computed, toJS } from 'mobx'

class DataStore {
    @observable interaction = {
        activeMovies: [],
        selecting: false,
        selectedMovie: undefined,
        
    };

    @action addPerimeter(p) {
        
    }

    @computed get perimeterCount() {
        
    }

}

const dataStore = new DataStore();
export default dataStore;
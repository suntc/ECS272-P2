import { observable, action, computed, toJS } from 'mobx'

class DataStore {
    @observable interaction = {
        freezeSG : false,
        activeGenreIdx: -1,
        activeYear: -1,
        detailTarget: 0
        
    };

    @observable tempfix = {
        streamGraphg: undefined
    };

    // like on change, some functions only need to be performed once, statelessly
    // use this as a temporary fix
    @action resetSG() {
        if (this.tempfix.streamGraphg == undefined) 
            return;
        this.tempfix.streamGraphg.selectAll(".layer").attr("opacity", 1);
    }

    @observable activeMovies = [];

    @observable selectedMovie = undefined;

    @action addActiveMovies(arr) {
        this.activeMovies = arr;
    }
    
    @action clearActiveMovies() {
        this.activeMovies = [];
    }

    @action selectMovie(m) {
        this.selectedMovie = m;
    }

    @action resetSelection() {
        this.activeMovies = [];
        this.interaction.freezeSG = false;
        this.selectedMovie = undefined;
    }

    @action freezeSG() {
        this.interaction.freezeSG = true;
    }

    @action defreezeSG() {
        this.interaction.freezeSG = false;
    }


}

const dataStore = new DataStore;
export default dataStore;
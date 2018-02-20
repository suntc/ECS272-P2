import { observable, action, computed, toJS } from 'mobx'

class DataStore {
    @observable interaction = {
        freezeSG : false,
        activeGenreIdx: -1,
        activeYear: -1,
        detailTarget: 0,
        activeWord: undefined,
        selectedWord: undefined,
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

    @observable hoverChara = undefined;

    @observable selectedChara = new Set();

    @observable selectedLink = new Set();

    @observable activeLines = [];

    @observable selectedLines = [];

    @observable updateTrigger = 0;

    @action setActiveLine(lineArr) {
        this.activeLines = lineArr
    }

    @action addSelectedLine(lineArr) {
        this.selectedLines.push(lineArr);
    }

    @action setSelectedLine(lineArr) {
        this.selectedLines = lineArr
    }

    @action clearActiveLine() {
        this.activeLines = [];
        this.interaction.activeWord = undefined;
    }

    @action clearLines() {
        this.activeLines = [];
        this.interaction.activeWord = undefined;
        this.selectedLines = [];
        this.interaction.selectedWord = undefined;
    }

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
        this.selectedLines = [];
        this.activeLines = [];
    }

    @action updateCharaList(id) {
        if (this.selectedChara.has(id)) {
            this.selectedChara.delete(id);
        } else {
            this.selectedChara.add(id);
        }
        this.updateTrigger++;
    }

    @action updateLink(id) {
        if (this.selectedLink.has(id)) {
            this.selectedLink.delete(id);
        } else {
            this.selectedLink.add(id);
        }
        this.updateTrigger++;
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
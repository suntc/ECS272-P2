import React from 'react';
import StreamGraph from './StreamGraph'
import { inject, observer } from 'mobx-react'
import movieDict from '../data/movie_dict'

@inject('dataStore')
@observer
export class App extends React.Component {
    constructor(props) {
        super(props);

    this.onResize = this.onResize.bind(this);
    }

    onResize() {
        this.setState({ screenWidth: window.innerWidth, screenHeight: window.innerHeight - 120 });
        console.log("resize");
    }
    componentWillMount() {
        window.addEventListener('resize', this.onResize, false);
        this.onResize();
    }

    componentDidMount() {

    }

    render() {
        // streamGraph
        let streamW = this.state.screenWidth * 0.75;
        let streamH = this.state.screenHeight / 2;
        // movieList
        let listW = this.state.screenWidth * 0.22;
        let activeMovies = this.props.dataStore.activeMovies;
        console.log("activemovies", activeMovies);
        let activeMoiveList = activeMovies.map((val) => {
            return (<p>{movieDict[val].title}</p>)
        });
        let movieListStyle = {
            color: "antiquewhite",
            height: streamH * 0.9,
            width: listW,
            overflow: "auto",
        }
        return(
            <div className="hori-contain">
                <StreamGraph size={[streamW, streamH]} />
                <div style={{ display: "inline-block" }}>
                <p>Movies</p>
                <button onClick={()=>this.props.dataStore.resetSelection()}></button>
                <div className="movie-list" style={movieListStyle}>{activeMoiveList}</div>
                </div>
            </div>
        );
    }
}
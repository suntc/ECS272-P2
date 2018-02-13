import React from 'react';
import StreamGraph from './StreamGraph'
import WordCloud from './WordCloud'
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
        let streamW = this.state.screenWidth * 0.72;
        let streamH = this.state.screenHeight / 2;
        // movieList
        let listW = this.state.screenWidth * 0.21;
        let activeMovies = this.props.dataStore.activeMovies;
        let activeMoiveList = activeMovies.map((val) => {
            return (<p>{movieDict[val].title}</p>)
        });
        let movieListStyle = {
            color: "antiquewhite",
            height: streamH * 0.9,
            width: listW,
            overflow: "auto",
        }
        // word cloud
        let wcloudW = this.state.screenWidth * 0.5;
        let wcloudH = this.state.screenHeight * 0.4
        let listTitle = (activeMovies.length > 0) ? "Select a movie to explore" : "Click stream graph to view movie titles";
        // movie info
        let infoW = this.state.screenWidth * 0.38;
        let movieInfoStyle = {
            color: "antiquewhite",
            height: wcloudH * 1.1,
            width: infoW,
            overflow: "auto",
            background: "green"
        }
        return(
            <div>
                <div className="hori-contain">
                    <StreamGraph size={[streamW, streamH]} />
                    <div style={{ display: "inline-block" }}>
                        <div>
                            <p className="h-cell" style={{background: "antiquewhite", "textAlign": "center"}}>{listTitle}</p>
                            <button title="Clear all the selections" className={ (activeMovies.length > 0) ? "show" : "hidden" + " h-cell"}
                                onClick={()=>this.props.dataStore.resetSelection()}>X</button>
                        </div>
                        <div className="movie-list" style={movieListStyle}>{activeMoiveList}</div>
                    </div>
                </div>
                <div>
                    <WordCloud size={[wcloudW, wcloudH]}/>
                    <div id="movie-lines" className="h-cell" style={movieInfoStyle}></div>
                </div>
                <div>

                </div>
            </div>
        );
    }
}
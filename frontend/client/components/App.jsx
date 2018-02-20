import React from 'react';
import StreamGraph from './StreamGraph'
import WordCloud from './WordCloud'
import MovieInfo from './MovieInfo'
import MovieLines from './MovieLines'
import BubbleChart from './BubbleChart'
import NodeLink from './NodeLink'
import { inject, observer } from 'mobx-react'
//import $ from "jquery";
import movieDict from '../data/movie_dict'
import movieTfidf from '../data/movie_tfidf_list'

import { Element } from 'react-scroll'

@inject('dataStore')
@observer
export class App extends React.Component {
    constructor(props) {
        super(props);

    this.onResize = this.onResize.bind(this);

    }

    onResize() {
        this.setState({ screenWidth: window.innerWidth, screenHeight: window.innerHeight - 120 });
        // console.log("resize");
    }
    componentWillMount() {
        window.addEventListener('resize', this.onResize, false);
        this.onResize();
    }

    componentDidMount() {
        // scroll target 
        this.props.dataStore.interaction.detailTarget = this.dtarget.offsetTop;
    }

    render() {
        // variables
        let activeMovies = this.props.dataStore.activeMovies;
        let selectedMovie = this.props.dataStore.selectedMovie;
        let freeze = this.props.dataStore.interaction.freezeSG;
        let mdict = movieDict[selectedMovie];
        let mkeys = ['sci-fi', 'comedy', 'thriller', 'romance', 'drama', 'action', 'adventure', 'horror'];
        // streamGraph
        let streamW = this.state.screenWidth * 0.72;
        let streamH = this.state.screenHeight / 2;
        // movieList
        let listW = this.state.screenWidth * 0.21;
        let clickTitle = (e) => {
            this.props.dataStore.selectMovie(e.target.id);
        }
        let activeMoiveList = activeMovies.map((val) => {
            return (<p id={val} className="pointer" onClick={clickTitle}>{movieDict[val].title}</p>)
        });
        let movieListStyle = {
            color: "antiquewhite",
            height: streamH * 0.9,
            width: listW,
            overflow: "auto",
        }
        //reset button
        let clear = () => {
            this.props.dataStore.resetSelection();
            this.props.dataStore.resetSG();
        }
        //back button
        let back = () => {
            this.props.dataStore.selectedMovie = undefined;
        }

        // word cloud
        let wcloudW = this.state.screenWidth * 0.5;
        let wcloudH = this.state.screenHeight * 0.4;
        let listTitle = "";
        let wcTitle = "Word Cloud View";
        let words = [];
        if (selectedMovie != undefined) {
            wcTitle = "Word Cloud: " + mdict.title + " (" + mdict.year + ")";
            words = movieTfidf[selectedMovie]
        }
        // else if (activeMovies.length > 0) {
        //     let gidx = this.props.dataStore.interaction.activeGenreIdx;
        //     let year = this.props.dataStore.interaction.activeYear;
        //     wcTitle = "Word Cloud: " + mkeys[gidx] + " movies in " + year
        //     words = []
        // } 
        // top right
        let toprightdiv = "";
        if (this.props.dataStore.selectedMovie != undefined) {
            toprightdiv = <MovieInfo size={[movieListStyle.width, movieListStyle.height]}/>
        } else {
            toprightdiv = <div className="movie-list" style={movieListStyle}>{activeMoiveList}</div>;
        }
        let trtitleStyle = {
            width: movieListStyle.width,
            overflow: "auto",
        }
        if (selectedMovie != undefined) {
            listTitle = "Selected: " + movieDict[selectedMovie].title;
        }
        else if (activeMovies.length > 0) {
            listTitle = "Select a movie to explore";
        }
        else {
            listTitle = "Click streamgraph to view movies";
        }
        // movie lines
        let mlW = this.state.screenWidth * 0.45;
        let mlH = this.state.screenHeight * 0.35;
        // bubble chart
        let bubbleW = this.state.screenWidth * 0.45;
        let bubbleH = this.state.screenHeight * 0.75;
        // node link chart
        let nlW = this.state.screenWidth * 0.5;
        let nlH = this.state.screenHeight * 0.75;
        let temp = undefined;
        if (selectedMovie != undefined) {
            temp = parseInt(selectedMovie.slice(1)) % 2
        }
        return(
            <div>
                <div className="hori-contain">
                    <StreamGraph size={[streamW, streamH]} />
                    <div style={{ display: "inline-block" }}>
                        <div>
                            <p className="h-cell tooltitle" style={trtitleStyle}>{listTitle}</p>
                            <button title="Clear all the selections" className={ ((activeMovies.length > 0 && freeze) ? "show" : "hidden") + " h-cell right-b w3-button w3-circle w3-padding-small w3-deep-orange"}
                                onClick={clear}>🗙</button>
                            <button title="Back to movie selection" className={((selectedMovie != undefined) ? "show" : "hidden") +" right-b w3-button w3-circle w3-padding-small w3-grey"}
                                onClick={back}>↩</button>
                        </div>
                        {toprightdiv}
                        <a ref={(r)=>{this.dtarget=r}} id="detail-target"></a>
                    </div>
                </div>
                <div>
                    <WordCloud ref={(r)=>{this.wccontain=r}} size={[wcloudW, wcloudH]} title={wcTitle} words={words}/>
                    <MovieLines size={[mlW, mlH]}/>
                </div>
                <div>
                    <BubbleChart size={[bubbleW, bubbleH]}/>
                    <NodeLink size={[nlW, nlH]} movie={selectedMovie}/>
                </div>
            </div>
        );
    }
}
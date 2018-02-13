import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import movieDict from '../data/movie_dict'

import { animateScroll as scroll} from 'react-scroll'

@inject('dataStore')
@observer
class MovieInfo extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {size} = this.props;
        let movieInfoStyle = {
            color: "antiquewhite",
            height: size[1],
            width: size[0],
            overflow: "auto",
        }
        let movieId = this.props.dataStore.selectedMovie;
        let mdict = movieDict[movieId];
        let title = "...", genre = "...", score = 9;
        if (mdict != undefined) {
            title = mdict.title + " (" + mdict.year + ")";
            genre = mdict.genre.reduce((acc, val)=>{
                return acc + ", " + val;
            }, "");
            genre = genre.slice(2);
            score = mdict.score + " (" + mdict.count + " votes)";
        }


        return(
            <div style={movieInfoStyle} id="mi-contain">
                <p id="title">{title}</p>
                <p id="genre">{genre}</p>
                <p id="score">Rating: {score}</p>
                {/* <a href="#detail-target">Click here to see the content below.</a> */}
                <p onClick={()=>scroll.scrollTo(this.props.dataStore.interaction.detailTarget)}
                    style={{"text-decoration": "underline", "cursor": "pointer", "float": "right"}}>scroll down to see more detail views</p>
            </div>
        );
    }
}

export default MovieInfo;
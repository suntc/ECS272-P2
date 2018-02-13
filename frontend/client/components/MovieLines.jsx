import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import movieDict from '../data/movie_dict'

@inject('dataStore')
@observer
class MovieLines extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {size} = this.props;
        let containStyle = {
        }
        let movieLinesStyle = {
            height: size[1],
            width: size[0],
            color: "antiquewhite",
            "overflow-y": "scroll",
            "word-wrap": "break-word",
            align: "top"
        }
        return(
            <div className="h-cell" style={containStyle}>
                <p className="tooltitle">Movie Lines View</p>
                <div style={movieLinesStyle}>
                    <p>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</p>
                    <p>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</p>
                    <p>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</p>
                    <p>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</p>
                    <p>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</p>
                    <p>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</p>
                    <p>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</p>
                    <p>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</p>
                </div>
            </div>
        );
    }
}

export default MovieLines;
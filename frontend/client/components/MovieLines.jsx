import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import movieDict from '../data/movie_dict'

function Conversation(props) {
    let lines = props.lines;
    let hword = props.highlightWord;
    let conversation = [];
    if (hword != undefined) {
        conversation = lines.map((d, i) => {
            let widx = d.toLowerCase().indexOf(hword);
            let word = d.slice(widx, widx + hword.length);
            return (<p>{d.slice(0,widx)} <span className="highlight-word"> {word} </span> {d.slice(widx+hword.length+1)}</p>)
        });
    } else {
        conversation = lines.map((d, i) => {
            return (<p> {d} </p>)
        });
    }

    return(
        <div className="conversation-lines">
            { conversation }        
        </div>
    );
}

@inject('dataStore')
@observer
class MovieLines extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {size, conversations, highlightWord} = this.props;

        let movieLinesStyle = {
            height: size[1],
            width: size[0],
            color: "antiquewhite",
            "overflow-y": "scroll",
            "word-wrap": "break-word",
            align: "top",
            "font-size": "18px",
        }
        let movieLines = [];
        conversations.forEach((d, i) => {
            movieLines.push(<Conversation lines={d} highlightWord={highlightWord}/>);
            movieLines.push(<hr className="dashed"/>);
        })
        movieLines.pop();
        return(
                <div style={movieLinesStyle}>
                    { movieLines }
                </div>
        );
    }
}

export default MovieLines;
import React, { Component } from 'react'
import * as d3 from 'd3';
import legend from 'd3-svg-legend'
import { autorun } from 'mobx'
import { inject, observer } from 'mobx-react'

@inject('dataStore')
@observer
class WordCloud extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.renderGraph();
        autorun(() => this.updateRender());
    }
    
    componentDidUpdate() {
        //renderGraph()
    }
    
    updateRender() {

    }

    renderGraph() {

    }

    render() {
        return(
            <div id="wc-contain" className="h-cell">
                <svg style={{background:"red"}} ref={(g) => { this.svg = g }} width={this.props.size[0]} height={this.props.size[1]}>
                    <g ref={(g) => { this.g = g }}></g>
                </svg>
                <div id="wc-tooltip" className="tip"></div>
            </div>
        );            
        //return(<svg width={this.props.size[0]} height={this.props.size[1]}></svg>);     
    }
}

export default WordCloud;
import React, { Component } from 'react'
import * as d3 from 'd3';

@inject('dataStore')
@observer
class StreamGraph extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }

    render() {
        return(<svg></svg>);            
        //return(<svg width={this.props.size[0]} height={this.props.size[1]}></svg>);     
    }
}

export default StreamGraph;
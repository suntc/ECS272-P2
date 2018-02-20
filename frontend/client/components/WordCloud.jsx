import React, { Component } from 'react'
import * as d3 from 'd3';
import legend from 'd3-svg-legend'
import {cloud} from 'd3-v4-cloud'
import { autorun } from 'mobx'
import { inject, observer } from 'mobx-react'

@inject('dataStore')
@observer
class WordCloud extends Component {
    constructor(props) {
        super(props);
        this.state = {
            words: []
        }
    }

    componentDidMount() {
        this.renderGraph();
        //autorun(() => this.updateRender());
    }
    
    componentDidUpdate() {
        const {size, words} = this.props;
        let wlimit = 30;
        let cwords = [];
        if (words.length > wlimit)
            cwords = words.slice(wlimit)
        let prevwords = this.state.words;
        if (JSON.stringify(prevwords) === JSON.stringify(words)) { // simple comparison
            return;
        }
        this.setState({words: words});
        let width = size[0], height = size[1];
        const g = d3.select(this.g);
        g.selectAll("*").remove();
        var layout = cloud()
            .size([width, height])
            .words(cwords.map(function(d) {
                return {text: d.word, size: 10 + Math.sqrt(d.value) * 10, line: d.line};
            }))
            .padding(5)
            .rotate(0)
            .font("Impact")
            .fontSize(function(d) { return d.size; })
            .on("end", draw);
        
        let setActiveLine = this.props.dataStore.setActiveLine;
        layout.start();
        function draw(words) {
            var fill = d3.scaleOrdinal(d3.schemeCategory10);

            g.attr("width", layout.size()[0])
                .attr("height", layout.size()[1])
                .append("g")
                .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
                .selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", function(d) { return d.size + "px"; })
                .style("font-family", "Impact")
                .style("fill", function(d, i) { return fill(i); })
                .attr("text-anchor", "middle")
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function(d) { return d.text; })
                .classed("clickable", true)
                .on("mouseover", (d, i) => {
                    setActiveLine(d.line);
                })
                .on("click", (d, i) => {
                    setActiveLine(d.line);
                })

            g.selectAll("text").attr("fill-opacity", 0)
            .attr("stroke-opacity", 0).transition()
            .duration(600)
            //change fill and stroke opacity to avoid CSS conflicts
            .attr("fill-opacity", 1)
            .attr("stroke-opacity", 1)
        }
        //updateRender();
    }

    renderGraph() {
        const {size} = this.props;
        let width = size[0], height = size[1];
        const g = d3.select(this.g);
        var layout = cloud()
            .size([width, height])
            .words([
                " "].map(function(d) {
            return {text: d, size: 10 + Math.random() * 90, test: "haha"};
            }))
            .padding(5)
            .rotate(0)
            .font("Impact")
            .fontSize(function(d) { return d.size; })
            .on("end", draw);

        layout.start();
        function draw(words) {
            var fill = d3.scaleOrdinal(d3.schemeCategory10);

            g.attr("width", layout.size()[0])
                .attr("height", layout.size()[1])
                .append("g")
                .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
                .selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", function(d) { return d.size + "px"; })
                .style("font-family", "Impact")
                .style("fill", function(d, i) { return fill(i); })
                .attr("text-anchor", "middle")
                .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function(d) { return d.text; });
        }
    }

    render() {
        const {title} = this.props;
        return(
            <div id="wc-contain" className="h-cell">
                <p className="tooltitle">{title}</p>
                <svg ref={(g) => { this.svg = g }} width={this.props.size[0]} height={this.props.size[1]}>
                    <g ref={(g) => { this.g = g }}></g>
                </svg>
                <div id="wc-tooltip" className="tip"></div>
            </div>
        );            
        //return(<svg width={this.props.size[0]} height={this.props.size[1]}></svg>);     
    }
}

export default WordCloud;
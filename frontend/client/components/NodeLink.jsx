import React, { Component } from 'react'
import * as d3 from 'd3';
import legend from 'd3-svg-legend'
import { autorun, whyRun } from 'mobx'
import { inject, observer } from 'mobx-react'
import Graphs from '../data/node_links'
import Charas from '../data/chara_dict'

@inject('dataStore')
@observer
class NodeLink extends Component {
    constructor(props) {
        super(props);
        this.state = {
            graph: [],
        }
    }

    componentDidMount() {
        const {size, movie} = this.props;
        const svg = d3.select(this.svg);
        if (movie == undefined) {
            svg.selectAll("*").remove();
            return;
        }
        let width = size[0], height = size[1];
        let graph = Graphs[movie];
        this.renderGraph(graph, width, height);
        autorun(() => this.activeCircle());
    }

    componentDidUpdate() {
        // clear existed
        console.log("update nl")
        const {size, movie} = this.props;
        const svg = d3.select(this.svg);
        if (movie == undefined) {
            svg.selectAll("*").remove();
            return;
        }
        let width = size[0], height = size[1];
        let graph = Graphs[movie];
        let prevGraph = this.state.graph;
        this.activeCircle();
        if (JSON.stringify(prevGraph) === JSON.stringify(graph)) {
            return;
        }
        svg.selectAll("*").remove();
        this.setState({graph: graph});
        this.renderGraph(graph, width, height);
        this.activeCircle();
    }

    activeCircle = () => {
        const svg = d3.select(this.svg);
        // active circles
        svg.selectAll(".nodes circle")
        .style("stroke", (d, i)=>{
            if (this.props.dataStore.selectedChara.has(d.id))
                return "#db4c8e";
        })
        .style("stroke-width", (d, i)=>{
            if (this.props.dataStore.selectedChara.has(d.id))
                return "3px";
        });

        svg.selectAll(".links line")
            .style("stroke", (d, i)=>{
                if (this.props.dataStore.selectedLink.has(d.id))
                    return "#91325e";
            })
    }

    renderGraph = (graph, width, height) => {
        
        const svg = d3.select(this.svg);
        var color = d3.scaleOrdinal(d3.schemeCategory20);
        const tooltip = d3.select("#nl-tooltip");
        var simulation = d3.forceSimulation()
            .force("link", d3.forceLink().id(function(d) { return d.id; }).distance(80))
            .force("charge", d3.forceManyBody().strength(-30))
            .force("center", d3.forceCenter(width / 2, height / 2));

        var link = svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(graph.links)
            .enter().append("line")
            .classed("clickable", true)
            .attr("stroke-width", function(d) { return Math.sqrt(d.linecount); })
            .on("click", (d, i)=> {
                this.props.dataStore.updateLink(d.id);
            })

        var node = svg.append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(graph.nodes)
            .enter().append("circle")
            .attr("r", 7)
            .classed("clickable", true)
            .attr("fill", function(d) { return "lightblue" })
            .on("mouseover", (d)=>{
                this.props.dataStore.hoverChara = d.id;
                let mousex = d3.event.pageX;
                let mousey = d3.event.pageY;
                let name = Charas[d.id].name;
                tooltip.style("left", (mousex + 5) +"px")
                    .style("top", (mousey + 5) + "px")
                    .html(name)
                    .style("visibility", "visible");
            })
            .on("mouseout", (d)=>{
                this.props.dataStore.hoverChara = undefined;
                tooltip.style("visibility", "hidden");
            })
            .on("click", (d)=>{
                this.props.dataStore.updateCharaList(d.id);
            })
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));
        // node.append("title")
        //     .text(function(d) { return d.id; });

        simulation
            .nodes(graph.nodes)
            .on("tick", ticked);

        simulation.force("link")
            .links(graph.links);
        
        let radius = 7;
        function ticked() {
            link
                .attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

            node.attr("cx", function(d) { return d.x = Math.max(radius, Math.min(width - radius, d.x)); })
                .attr("cy", function(d) { return d.y = Math.max(radius, Math.min(height - radius, d.y)); });
        }
        

        function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(d) {
            d.fx = Math.max(radius, Math.min(width - radius, d3.event.x));
            d.fy = Math.max(radius, Math.min(height - radius, d3.event.y));
        }

        function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }
    }

    render() {
        return(
            <div id="nl-contain" className="h-cell">
                <p className="tooltitle">Character Node Link View</p>
                <svg ref={(g) => { this.svg = g }} width={this.props.size[0]} height={this.props.size[1]}>
                </svg>
                <div id="nl-tooltip" className="tip"></div>
                <div className="hidden">{this.props.dataStore.updateTrigger}</div>
            </div>
        );
    }        
}

export default NodeLink;
import React, { Component } from 'react'
import * as d3 from 'd3';
import legend from 'd3-svg-legend'
import {cloud} from 'd3-v4-cloud'
import { autorun } from 'mobx'
import { inject, observer } from 'mobx-react'

@inject('dataStore')
@observer
class BubbleChart extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.renderGraph();
    }

    renderGraph = () => {
        let width = this.props.size[0], height = this.props.size[1];
        const g = d3.select(this.g);
        let sentiDict = {"u4763-u4771": [{"lines": ["L157007", "L157008", "L157009"], "polarity": 0.5, "subjectivity": 0.5}, {"lines": ["L157010", "L157011", "L157012", "L157013"], "polarity": 0.05, "subjectivity": 0.3}, {"lines": ["L157023", "L157024"], "polarity": 0.0, "subjectivity": 0.0}, {"lines": ["L157025", "L157026", "L157027", "L157028", "L157029"], "polarity": -0.012499999999999997, "subjectivity": 0.3875}, {"lines": ["L157038", "L157039", "L157040", "L157041", "L157042", "L157043", "L157044"], "polarity": 0.06923500881834214, "subjectivity": 0.31882716049382714}, {"lines": ["L157058", "L157059", "L157060", "L157061"], "polarity": 0.14020146520146518, "subjectivity": 0.49166666666666664}, {"lines": ["L157064", "L157065"], "polarity": 0.0, "subjectivity": 0.0}, {"lines": ["L157104", "L157105", "L157106"], "polarity": 0.09765625000000003, "subjectivity": 0.5}], "u4767-u4769": [{"lines": ["L156855", "L156856", "L156857", "L156858", "L156859"], "polarity": -0.5625, "subjectivity": 0.6}, {"lines": ["L156867", "L156868"], "polarity": 0.21875, "subjectivity": 0.65}, {"lines": ["L156873", "L156874"], "polarity": 0.0, "subjectivity": 0.0}, {"lines": ["L156875", "L156876"], "polarity": -0.5, "subjectivity": 0.55}, {"lines": ["L156877", "L156878", "L156879", "L156880", "L156881"], "polarity": 0.09812499999999999, "subjectivity": 0.5266666666666667}, {"lines": ["L156885", "L156886", "L156887"], "polarity": 0.02500000000000001, "subjectivity": 0.38437499999999997}, {"lines": ["L156973", "L156974"], "polarity": 0.25, "subjectivity": 0.5375}], "u4762-u4767": [{"lines": ["L156970", "L156971", "L156972"], "polarity": -0.3125, "subjectivity": 0.6875}, {"lines": ["L156975", "L156976", "L156977"], "polarity": 0.9765625, "subjectivity": 0.5}, {"lines": ["L156981", "L156982", "L156983", "L156984"], "polarity": 0.1953125, "subjectivity": 0.39166666666666666}, {"lines": ["L156985", "L156986", "L156987", "L156988", "L156989", "L156990"], "polarity": 0.0007653061224489749, "subjectivity": 0.5573979591836735}, {"lines": ["L156997", "L156998", "L156999", "L157000", "L157001"], "polarity": 0.03608094837261503, "subjectivity": 0.4391247949581283}], "u4760-u4769": [{"lines": ["L156782", "L156783"], "polarity": 0.03125, "subjectivity": 0.41666666666666663}, {"lines": ["L156787", "L156788"], "polarity": -0.05000000000000001, "subjectivity": 0.4166666666666667}, {"lines": ["L156789", "L156790", "L156791", "L156792", "L156793", "L156794", "L156795", "L156796", "L156797", "L156798", "L156799", "L156800"], "polarity": -0.23224431818181823, "subjectivity": 0.5555555555555556}], "u4769-u4771": [{"lines": ["L156801", "L156802", "L156803", "L156804", "L156805"], "polarity": 0.0, "subjectivity": 0.0}, {"lines": ["L156808", "L156809"], "polarity": 0.0, "subjectivity": 0.0}, {"lines": ["L156810", "L156811", "L156812"], "polarity": 0.0, "subjectivity": 0.0}, {"lines": ["L156813", "L156814"], "polarity": 0.0, "subjectivity": 0.0}], "u4761-u4765": [{"lines": ["L156922", "L156923"], "polarity": 0.0, "subjectivity": 0.0}, {"lines": ["L156934", "L156935"], "polarity": -0.5499999999999998, "subjectivity": 0.6333333333333333}, {"lines": ["L157077", "L157078", "L157079"], "polarity": -0.015625, "subjectivity": 0.35}, {"lines": ["L157111", "L157112"], "polarity": 0.0, "subjectivity": 0.0}], "u4766-u4772": [{"lines": ["L156705", "L156706"], "polarity": -0.2, "subjectivity": 0.4}, {"lines": ["L156720", "L156721"], "polarity": 0.0, "subjectivity": 0.0}, {"lines": ["L156725", "L156726", "L156727"], "polarity": 0.0, "subjectivity": 0.0}, {"lines": ["L156729", "L156730"], "polarity": 0.5, "subjectivity": 0.55}], "u4767-u4771": [{"lines": ["L156889", "L156890", "L156891", "L156892", "L156893", "L156894", "L156895", "L156896", "L156897", "L156898", "L156899", "L156900"], "polarity": 0.06708333333333334, "subjectivity": 0.5111111111111111}, {"lines": ["L156909", "L156910", "L156911"], "polarity": 0.0, "subjectivity": 0.0}], "u4760-u4770": [{"lines": ["L156722", "L156723"], "polarity": 0.0, "subjectivity": 0.0}, {"lines": ["L156750", "L156751"], "polarity": 0.0, "subjectivity": 0.0}, {"lines": ["L156757", "L156758"], "polarity": 0.0, "subjectivity": 0.0}, {"lines": ["L156759", "L156760"], "polarity": 0.6, "subjectivity": 0.9}, {"lines": ["L156761", "L156762"], "polarity": 0.5, "subjectivity": 0.5}, {"lines": ["L156764", "L156765"], "polarity": 0.0, "subjectivity": 0.0}], "u4766-u4768": [{"lines": ["L156731", "L156732", "L156733"], "polarity": 0.13636363636363635, "subjectivity": 0.5}, {"lines": ["L156739", "L156740", "L156741", "L156742", "L156743"], "polarity": -0.07337662337662339, "subjectivity": 0.6018398268398268}], "u4771-u4773": [{"lines": ["L157014", "L157015", "L157016", "L157017", "L157018"], "polarity": -0.4437499999999999, "subjectivity": 0.5833333333333333}, {"lines": ["L157145", "L157146"], "polarity": 0.0, "subjectivity": 0.0}], "u4764-u4769": [{"lines": ["L156861", "L156862", "L156863", "L156864", "L156865", "L156866"], "polarity": 0.12208333333333335, "subjectivity": 0.585}], "u4763-u4770": [{"lines": ["L156819", "L156820", "L156821", "L156822", "L156823", "L156824", "L156825"], "polarity": 0.0, "subjectivity": 0.3846153846153845}, {"lines": ["L156827", "L156828"], "polarity": 0.4, "subjectivity": 0.6}, {"lines": ["L156830", "L156831", "L156832", "L156833", "L156834", "L156835", "L156836", "L156837", "L156838", "L156839", "L156840", "L156841"], "polarity": -0.0375, "subjectivity": 0.5436507936507936}, {"lines": ["L156843", "L156844", "L156845"], "polarity": -0.2625, "subjectivity": 0.8}, {"lines": ["L156940", "L156941"], "polarity": 0.24999999999999997, "subjectivity": 0.7000000000000001}, {"lines": ["L157005", "L157006"], "polarity": 0.2, "subjectivity": 0.1}, {"lines": ["L157051", "L157052", "L157053", "L157054", "L157055", "L157056", "L157057"], "polarity": 0.32775297619047616, "subjectivity": 0.5238095238095237}, {"lines": ["L157062", "L157063"], "polarity": 0.0, "subjectivity": 1.0}, {"lines": ["L157158", "L157159"], "polarity": 0.0, "subjectivity": 0.0}, {"lines": ["L157178", "L157179"], "polarity": -0.05, "subjectivity": 0.4}]}
        let cvnodes = [];
        let clusters = [];
        let keys = [];
        for (let key in sentiDict) {
            clusters.push(sentiDict[key].length);
            keys.push(key);
        }

        for(let i = 0; i < keys.length; ++i) {
            sentiDict[keys[i]].forEach((d, i) => {
                cvnodes.push({'idx': i, 'polarity': d.polarity});
            })
            
        }
        console.log("cvnodes", cvnodes);
        
        // var layout = cloud()
        //     .size([width, height])
        //     .words(clusters.map(function(d) {
        //     return {text: d, size: 10 + 10 * d};
        //     }))
        //     .padding(5)
        //     .rotate(0)
        //     .font("Impact")
        //     .fontSize(function(d) { return d.size; })
        //     .on("end", draw);
        
        // layout.start();

        // function draw(clusters) {
        //     console.log(clusters)
        //     g.attr("width", layout.size()[0])
        //     .attr("height", layout.size()[1])
        //     .append("g")
        //     .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
        //     .selectAll("circle")
        //     .data(clusters)
        //     .enter().append("circle")
        //     .attr("r", (d)=>{console.log(d); return d.size / 2})
        //     .attr("transform", function(d) {
        //         return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        //         })
        // }

        var simulation = d3.forceSimulation()
            .force("charge", d3.forceManyBody().strength(-200))
            .force("center", d3.forceCenter(width / 2, height / 2));
        let clusternodes = clusters.map(function(d) {
            return {size: 10 + 10 * d};
            });

        simulation
            .alphaMin(0.7)
            .nodes(clusternodes)
            .on("end", draw);
        
        function draw(clusters) {
            console.log("clusters", clusternodes)
            let nodeXpos = (d, i) => {
                return clusternodes[d.idx].x;
            }

            let nodeYpos = (d, i) => {
                return clusternodes[d.idx].y;
            }

            var circlesimulation = d3.forceSimulation()
                .force("charge", d3.forceManyBody().strength(-30))
                .force('x', d3.forceX().x(nodeXpos))
                .force('y', d3.forceY().y(nodeYpos))

            circlesimulation.nodes(cvnodes)
                .on("tick", ticked)

            var node = g.append("g")
                .attr("class", "nodes")
                .selectAll("circle")
                .data(cvnodes)
                .enter().append("circle")
                .attr("r", 7)
                .classed("clickable", true)
                .attr("fill", function(d) { return "lightblue" })

            function ticked() {
                node.attr("cx", function(d) { return d.x; })
                    .attr("cy", function(d) { return d.y; });
            }

        }

    }

    render() {
        return(
            <div id="bb-contain" className="h-cell">
                <p className="tooltitle">Sentiment View</p>
                <svg ref={(g) => { this.svg = g }} width={this.props.size[0]} height={this.props.size[1]}>
                    <g ref={(g) => { this.g = g }}></g>
                </svg>
                <div id="bb-tooltip" className="tip"></div>
            </div>
        );
    }
}

export default BubbleChart;
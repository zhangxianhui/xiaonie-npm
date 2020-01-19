import React, {Component} from 'react';

import { Button } from 'antd';
import EchartsBar from './echarts/echartsBar'
class MyComponent extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            // echartsdata: {
            //     "xAxis": [
            //     "2016-03",
            //     "2016-04",
            //     "2016-05",
            //     ],
            //     series: [
            //     1938049.2099999995,
            //     2944561.7899999986,
            //     ]
            // }
        }
    }
    
    componentDidMount(){
        console.log("周期")
    }
     //图表配置
     defaultOption(echartsdata){
        return {
            xAxis: {
                type: 'category',
                data: echartsdata.xAxis,
                boundaryGap: false,
               
            },
            yAxis: {
                type: 'value',
                splitLine: { //分行线
                    show: false
                },
              
            },
            series:
            [{
                data: echartsdata.series,
                type: 'line',
            }]

        }
        
    }

    render() {
        let {option} = this.props
        console.log("this.props",this.props)
        return (
            <div>
                {/* <Button type="primary">骚年，写代码快乐 npm</Button> */}
                {/* <EchartsBar option={this.defaultOption(echartsdata)}/> */}
                <EchartsBar option={option}/>
             
            </div>
        )
    }
}
export default MyComponent;






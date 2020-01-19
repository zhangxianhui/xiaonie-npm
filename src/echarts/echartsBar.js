import React, { Component } from 'react';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import "echarts/lib/chart/bar"
import "echarts/lib/chart/line"
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip'; // 提示框组件
import 'echarts/lib/component/title';   // 标题组件
import "echarts/lib/component/legend";  // 图例组件
import "echarts/lib/component/dataZoom";  // 区域缩放组件

class EchartsBar extends Component {
    constructor() {
        super()
        this.chartsRef = React.createRef();
        this.defaultOption = {
            // 提示框组件
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                    crossStyle: {
                        color: '#999',
                    }
                },
                //弹出框样式(白色底色)
                backgroundColor: "rgba(255,255,255,0.8)",
                borderColor: '#ccc',
                padding: 10,
                textStyle: {
                    color: '#656565',
                },
                extraCssText: 'box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);'
            },
            xAxis: [
                {
                    type: 'category',
                    axisPointer: {
                        type: 'shadow'
                    }
                }
            ],
            grid: {
                top: 30,
                bottom: 30,
                left: 55,
                right: 50,
                borderWidth: 1
            },
            yAxis: [
                {
                    type: 'value',
                },
                // {
                //     type: 'value',
                // }
            ]
        }
    }
    render() {
        return (
            <div style={{ width: '100%', height: '100%' }} ref={this.chartsRef} />
        )
    }
    componentDidUpdate() {
        // 基于准备好的dom，初始化echarts实例
        // let myChart = echarts.init(this.chartsRef.current);
        let myChart = this.state.chartsDom
        // 绘制图表
        let parentOption = this.props.option||{};
        let option = {}
        // 将单独的属性合并
        option = Object.assign({}, this.defaultOption, this.props.option)
        for (const key in this.props.option) {
            if (parentOption[key][0]) {
                parentOption[key].forEach((ele, index) => {
                    if (!option[key]) {
                        option[key] = []
                    }
                    let p = this.defaultOption[key] instanceof Array ? this.defaultOption[key][index] : {}
                    option[key][index] = Object.assign({}, p, ele)
                });
            } else {
                option[key] = Object.assign({}, this.defaultOption[key], parentOption[key])
            }
        }
        if (parentOption.dataZoom) {
            option.grid.bottom = 65
        }
        option.color = ['#49A9EE', '#98D87D', '#FFD86E', '#F3857B','#8996E6']
        myChart.setOption(option, { notMerge:true })
        if (option.event) {
            option.event.forEach(val => {
                if (typeof val.callback === 'function') {
                    myChart.off(val.type)
                    myChart.on(val.type, val.callback);

                }
            });
        }
    }
    componentDidMount() {
        let myChart = echarts.init(this.chartsRef.current); //初始化echarts 并存储dom
        this.setState({
            chartsDom: myChart
        })
    }
}

export default EchartsBar;


/** 调用演示*/
/*
<EchartsBar
    option={{
        // 图例
        legend: {
            data:[]
        }
        xAxis:[{
            data: [],
        }],
        yAxis:[
            {
                name: '',
                axisLabel: {    // 刻度设置
                    formatter: '{value} ml'    // 刻度标签的内容
                }
            }
        ],
        series: [
            {
                name: '',
                type: 'line',
                yAxisIndex: 0,
                data: []
            }
        ],
        // 事件
        event:{
            type: 'click',
            callback: this.click
        }
    }}
/>
*/
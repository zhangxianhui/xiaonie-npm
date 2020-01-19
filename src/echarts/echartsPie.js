import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts'

import 'echarts/lib/chart/pie';  //折线图是line,饼图改为pie,柱形图改为bar
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
// 引入图例组件
import 'echarts/lib/component/legend';
class piechars extends Component {
    constructor(props) {
        super(props);
        this.chartsRef = React.createRef();
        this.defaultOption = {
            series: [
                {
                    type: 'pie',
                    radius: "60%",
                    center: ['50%', '50%'],
                    selectedMode: 'single', //点击切换 
                    data: []
                },
            ],
            // 提示框组件
            tooltip: {

                //弹出框样式(白色底色)
                backgroundColor: "rgba(255,255,255,0.8)",
                borderColor: '#ccc',
                padding: 10,
                textStyle: {
                    color: '#656565',
                },
                extraCssText: 'box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);'
            },
        }
    }
    componentDidMount() {
        let myChart = echarts.init(this.chartsRef.current); //初始化echarts 并存储dom
        this.setState({
            chartsDom: myChart
        })
    }
    componentDidUpdate() {
        this.initEchars()
    }
    initEchars = () => {
        let myChart = this.state.chartsDom
        // 绘制图表
        let parentOption = this.props.option

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
                option[key] = Object.assign({}, this.defaultOption[key], this.props.option[key])
            }
        }

        myChart.setOption(option, { notMerge: true })
        if (option.event) {
            option.event.forEach(val => {
                if (typeof val.callback === 'function') {
                    myChart.off(val.type)
                    myChart.on(val.type, val.callback);

                }
            });
        }
    }
    render() {
        return (
            <div style={{ width: '100%', height: '100%' }} ref={this.chartsRef} />
        );
    }
}

export default piechars;
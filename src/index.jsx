import React, {Component} from 'react';

import { Button } from 'antd'

class MyComponent extends Component{
    componentDidMount(){
        console.log("周期")
    }
    render() {
        return (
            <div>
                <Button type="primary">骚年，写代码快乐 npm</Button>
            </div>
        )
    }
}
export default MyComponent;



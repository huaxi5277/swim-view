import React, { Component } from 'react'
import style from  './index.scss'
import {Button} from 'antd'
import {Link,Switch} from 'dva/router'
import Private from '../../../utils/Private'
class index extends Component {
    render() {
        const {routes} =this.props
        return (
            <div className="backstroke-wrap">
                <div className="button-wrap">
                    <Button>
                        <Link to="/study/freestroke/history">自由泳的历史</Link>
                    </Button>
                    <Button>
                        <Link to="/study/freestroke/basic">自由泳基本技巧</Link>
                    </Button>
                    <Button>
                        <Link to="/study/freestroke/senior">自由泳高级技巧</Link>
                    </Button>
                    <Button>
                        <Link to="/study/freestroke/compontation">自由泳与竞赛</Link>
                    </Button>
                </div>
                <div>
                    <Switch>
                            {
                                routes.map((route,i)=>{
                                    return (
                                        <Private {...route} key={i}></Private>
                                    )
                                })
                            }
                    </Switch>
                </div>
            </div>
        )
    }
}
export default  index
import React, { Component } from 'react'
import style from  './index.scss'
import {Button} from 'antd'
import {Link,Switch} from 'dva/router'
import Private from '../../../utils/Private'
class index extends Component {
    render() {
        const {routes} =this.props
        return (
            <div className="butterflystroke-wrap">
                <div className="button-wrap">
                    <Button>
                        <Link to="/study/butterflystroke/history">蝶泳的历史</Link>
                    </Button>
                    <Button>
                        <Link to="/study/butterflystroke/basic">蝶泳基本技巧</Link>
                    </Button>
                    <Button>
                        <Link to="/study/butterflystroke/senior">蝶泳高级技巧</Link>
                    </Button>
                    <Button>
                        <Link to="/study/butterflystroke/compontation">蝶泳与竞赛</Link>
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
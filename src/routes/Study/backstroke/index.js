import React, { Component } from 'react'
import style from  './index.scss'
import {Button} from 'antd'
import {Link,Switch,Redirect} from 'dva/router'
import Private from '../../../utils/Private'
class index extends Component {
    render() {
        const {routes} =this.props
        return (
            <div className="backstroke-wrap">
                <div className="button-wrap">
                    <Button>
                        <Link to="/study/backstroke/history">仰泳的历史</Link>
                    </Button>
                    <Button>
                        <Link to="/study/backstroke/basic">仰泳基本技巧</Link>
                    </Button>
                    <Button>
                        <Link to="/study/backstroke/senior">仰泳高级技巧</Link>
                    </Button>
                    <Button>
                        <Link to="/study/backstroke/compontation">仰泳与竞赛</Link>
                    </Button>
                </div>
               
                    <Switch>
                            {
                                routes.map((route,i)=>{
                                    return (
                                        <Private {...route} key={i}></Private>
                                    )
                                })
                            }
                          <Redirect from="/study/backstroke" to="/study/backstroke/history" exact></Redirect>
                    </Switch>
              
            </div>
        )
    }
}
export default  index
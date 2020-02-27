import React, { Component } from 'react'
import style from './index.scss'
import { Menu, Icon } from 'antd';
import { Link,Switch } from 'dva/router';
import Private from '../../../utils/Private'
const { SubMenu } = Menu;
class index extends Component {
    constructor(){
        super()
        this.state = {
            SelectedKeys : [],
        }
    }
    componentDidMount(){
    const arr =   this.props.location.pathname.split('/')
    this.handleClick(arr[2])
    }
    handleClick(k){
       this.setState({
           SelectedKeys : [k]
       })
    }
    render() {
        const {routes} = this.props

        return (
            <div className="swim-skill">
                <Menu
                 mode="inline"
                 selectedKeys={this.state.SelectedKeys}
                 defaultOpenKeys={['sub1','sub2','sub3']}
                 className="submenu-wrap"
                >
                    <SubMenu
                    key="sub1"
                    title={
                        <span>
                            <span>游泳技巧</span>
                        </span>
                    }
                    >
                     <Menu.ItemGroup key="g1">
                     <Menu.Item key="breaststroke"><Link to="/study/breaststroke">蛙泳</Link></Menu.Item>
                     <Menu.Item key="butterflystroke"><Link to="/study/butterflystroke">蝶泳</Link></Menu.Item>
                     <Menu.Item key="backstroke"><Link to="/study/backstroke">仰泳</Link></Menu.Item>
                     <Menu.Item key="freestroke"><Link to="/study/freestroke">自由泳</Link></Menu.Item>
                     </Menu.ItemGroup>
                    </SubMenu>

                    <SubMenu
                    key="sub2"
                    className="submenu-wrap"
                    title={
                        <span>
                            <span>基础锻炼</span>
                        </span>
                    }
                    >
                        <Menu.ItemGroup key="g2">
                              <Menu.Item key="physical"><Link to="/study/physical">基础锻炼</Link></Menu.Item>
                        </Menu.ItemGroup>
                    

                    </SubMenu>
                    <SubMenu
                    key="sub3"
                    className="submenu-wrap"
                    title={
                        <span>
                            <span>泳前/泳后护理</span>
                        </span>
                    }
                    >
                        <Menu.ItemGroup key="g3">
                        <Menu.Item key="before"><Link to="/study/before">泳前</Link></Menu.Item>
                        <Menu.Item key="after"><Link to="/study/after">泳后</Link></Menu.Item>
                        </Menu.ItemGroup>
                    </SubMenu>

                </Menu>

                <div className="show-wrap">
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
export default index

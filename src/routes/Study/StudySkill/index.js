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
            SelectedKeys : ['breaststroke']
        }
    }
    // componentDidMount(){
    // const arr =   this.props.location.pathname.split('/')
    // this.handleClick(arr[2])
    // }
    // UNSAFE_componentWillReceiveProps(nextProps) {
    //     const { pathname } = this.props.location;
    //     const arr =  pathname.split('/')
    //     if (nextProps.location.pathname !== pathname) {
    //       // 当路由发生改变时, 改变当前菜单选中key值
    //       this.handleSetSelectedKeys(nextProps.location.pathname);
    //     }
    //   }
    handleClick(key){
       const k = key.key
       this.setState({
           SelectedKeys : [k]
       })
    }
    render() {
        const {routes} = this.props
        console.log(this.state.SelectedKeys);
        
        return (
            <div className="swim-skill">
                <Menu
                 mode="inline"
                 defaultSelectedKeys={this.state.SelectedKeys}
                 defaultOpenKeys={['sub1']}
                 onClick={(key)=>this.handleClick(key)}
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
                    ></SubMenu>
                    <SubMenu
                    key="sub3"
                    className="submenu-wrap"
                    title={
                        <span>
                            <span>泳前/泳后护理</span>
                        </span>
                    }
                    ></SubMenu>
                    <SubMenu
                    key="sub4"
                    className="submenu-wrap"
                    title={
                        <span>
                            <span>我的</span>
                        </span>
                    }
                    ></SubMenu>
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

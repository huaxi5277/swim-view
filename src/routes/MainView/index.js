import React, { Component } from 'react'
import styles from './index.scss'
import {Link} from 'dva/router'
import {Card} from 'antd'
export default class index extends Component {
    render() {
        return (
            <div className="main-view">
                <div className='bg-img'>
                <h1 className="display-3 mb-4 main-title">Swimming</h1>
                <p className="lead main-sec-title"> 专业的后台管理  2020-02-24 design-xiaobo </p>
                <div className="btn-wrap">
                    <Link to="/study" className="btn btn-lg btn-light  main-btn">快速了解-></Link>
                </div>
                </div>
                <div className="design-concept">
                    <Card className="design-card">
                        <p>简单易用</p>
                        <span>适配 游泳小程序 操作简单 上手容易 与游泳小程序完美配合</span>
                    </Card >
                    <Card className="design-card">
                        <p>future 概念</p>
                        <span>通过 reducers, effects 和 subscriptions 组织 model，简化 后台管理的复杂度</span>
                    </Card>
                    <Card className="design-card">
                        <p>技术亮点</p>
                        <span>应用前端最前沿的技术 dvajs + antd 后台选用 node 的express  </span>
                    </Card>
                </div>
                <div className="thanks-wrap">
                <div className="thanks">
                    <h3>致谢</h3>
                    <hr/>
                    <p>感谢npm 生态圈所有人对前端的贡献</p>
                    <p>感谢米斯特吴 教给我所有的前端中级技术</p>
                    <p>感谢米斯特吴 教给我所有前端的思想</p>
                    <p>感谢年哥带我走入前端的大门</p>
                    <p>感谢我所使用的所有前端框架</p>
                    <p>感谢我所写的每一个字母 </p>
                </div>
                </div>
            </div>
        )
    }
}

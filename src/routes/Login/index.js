import React, { Component } from 'react';
import { Form, Input, Button, Message } from 'antd';
import { email_reg, pwd_reg } from '../../utils/Regexp.js';
import { connect } from 'dva';
import Logo from '../../assets/bg-swim.png'
import style from './index.scss'
import axios from 'axios'
@connect()
class index extends Component {
    constructor(props){
        super(props)
    }
  // 自定义表单校验规则
  validatorForm = (rule, value, callback) => {
    if (value && rule.pattern && !value.match(rule.pattern)) {
      callback(rule.message);
    } else {
      callback();
    }
  };

  // 自定义校验两次密码是否一致
  validatorPwd = (rule, value, callback) => {
    if (value !== this.props.form.getFieldValue('pwd')) {
      callback(rule.message);
      return;
    }
    callback();
  };

  submit
  async handleSubmit(e) {
    e.preventDefault();
    var res  = {}
    this.props.form.validateFields((err,values)=>{
        const {email,password} = values
        res= {
           email,
           password
        }  
   })
   var respose = await   axios.post('http://localhost:4000/swimmimg/users/login',res)
   if(respose.data.msg==true){
    localStorage.setItem('email', res.email);
    this.props
    .dispatch({
        type:'global/setUserInfo',
        payload : res
    })
    .then(()=>{
        this.props.history.push('/')
    });
   }
   else {
       if(respose.data.email == '用户不存在!'){
        Message.error(respose.data.email)
       }
       else {
        Message.error('账号或密码错误!')
       }
   }
    // this.props.form.validateFields((err, values) => {
    //   if (!err) {
    //     const { email, password } = values;
    //    var respose = await   axios.post('http://localhost:3000/api/register',{email,password})
    //    console.log(respose);
       
    //     // Request('users.json').then(res => {
    //     //   // console.log(res);
    //     //   const { data, status } = res;
    //     //   if (res && status === 200 && data) {
    //     //     let users = [];
    //     //     for (const key in data) {
    //     //       // console.log(data[key]);
    //     //       users.push({
    //     //         ...data[key],
    //     //         key
    //     //       });
    //     //     }
    //     //     // console.log(users);
    //     //     // 账户密码匹配
    //     //     users = users.filter(user => {
    //     //       return user.pwd === pwd && user.email === email;
    //     //     });
    //     //     // console.log(users);
    //     //     // 判断users下是否有内容
    //     //     if (users && users.length) {
    //     //       // 存到ls
    //     //       localStorage.setItem('email', users[0].email);
    //     //       localStorage.setItem('key', users[0].key);

    //     //       // 存储到models里
    //     //       this.props
    //     //         .dispatch({
    //     //           type: 'global/setUserInfo',
    //     //           payload: users[0]
    //     //         })
    //     //         .then(() => {
    //     //           // 页面跳转
    //     //           this.props.history.push('/');
    //     //         });
    //     //     } else {
    //     //       Message.error('邮箱或密码错误, 请重新输入');
    //     //     }
    //     //   }
    //     // });
    //   }
    // });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="account">
        <img src={Logo} alt=""/>
        <Form className="account-form">
          <Form.Item label="邮箱">
            {getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                  message: '邮箱不能为空, 请输入邮箱'
                },
                {
                  pattern: email_reg,
                  validator: this.validatorForm,
                  message: '请输入正确的邮箱格式,如: xxxxxxx@qq.com'
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="密码">
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '密码不能为空，请输入密码！'
                },
                {
                  pattern: pwd_reg,
                  validator: this.validatorForm,
                  message:
                    '请输入正确的密码格式：6-16位字母、数字或特殊字符 _-.'
                }
              ]
            })(
              <Input
                maxLength={16}
                type="password"
                placeholder="请输入6-16位字母、数字或特殊字符的密码"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button onClick={(e)=>this.handleSubmit(e)} className="btn" type="primary">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create()(index);
import React, { Component } from 'react'
//import { Route, Switch } from 'react-router-dom'
import { Form, Icon, Input, Button,Message } from 'antd';
import './css/login.less'
import logo from './imgs/logo.png'

class Login extends Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        Message.success('登录成功',values)
        
      }else{
        Message.error('登录失败',err)
      }
    });
  };
  //密码的验证器
  pswValidator=(rule, value, callback)=>{
  if(value.length<4){
    callback('密码不能小于4位')
  }else if(value.length>12){
    callback('密码必须小于12位')
  }else if(!value){
    callback('密码不能为空')
  }else if(!(/^\w+$/).test(value)){
    callback('密码必须是字母、数字、下划线组成!')
  }else {
    callback()
  }

  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className='login'>
        <header>
          <img src={logo} alt="logo" />
          <h2 className='title'>商品管理系统</h2>
        </header>
        <main>
          <h2 className='user'>用户登录</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入用户名!' },{
                  max:12,  message: '用户名小于等于12位!'},{min:4,  message: '用户名大于等于4位!'},
                  {pattern:/^\w+$/,message: '必须是字母、数字、下划线组成!'}],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                //  用户名/密码的的合法性要求
                //  1). 必须输入
                //  2). 必须大于等于4位
                //  3). 必须小于等于12位
                //  4). 必须是字母、数字、下划线组成
              
               //定义用户名校验规则---“声明式验证”，即：自己不去做实际判断，只是声明
                rules: [{ validator: this.pswValidator }
                  ],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />,
              )}
            </Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
          </Form>

        </main>
      </div>
    )
  }
}

export default Form.create()(Login);
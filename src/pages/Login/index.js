import { Card } from 'antd'
import logo from '@/assets/logo.png'
import './index.scss'
import { Button, Checkbox, Form, Input, message } from 'antd'
import React from 'react'
import { useStore } from '@/store'
import { useNavigate } from 'react-router-dom'

function Login () {
  const { loginStore } = useStore()
  const navigate = useNavigate()
  async function onFinish (values) {
    console.log(values.username, values.password)
    try {
      await loginStore.setToken({
        mobile: values.username,
        code: values.password
      })
      navigate('/', { replace: true })
      message.success('登入成功')
    }
    catch {
      message.success('登入失敗')
    }

  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form initialValues={{
          username: '13911111111',
          password: '246810',
          remember: true
        }}
          validateTrigger={['onBlur', 'onChange']}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: '請輸入帳號!',
                validateTrigger: 'onBlur'
              }
            ]}>
            <Input size="large" placeholder="帳號" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true, message: '請輸入密碼!',
                validateTrigger: 'onBlur'
              }]}>
            <Input size="large" placeholder="密碼" />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox className="login-checkbox-label">
              同意保護隱私條款
            </Checkbox>
          </Form.Item>

          <Form.Item>

            <Button type="primary" htmlType="submit" size="large" block>
              登入
            </Button>
          </Form.Item>
        </Form>
      </Card>

    </div>
  )
}
export default Login
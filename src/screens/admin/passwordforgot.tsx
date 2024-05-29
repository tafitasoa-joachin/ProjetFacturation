import React from 'react';
import { Form, Input, Button } from 'antd';
// import 'antd/dist/antd.css';
import './forgotPassword.css';
import { Link } from 'react-router-dom';

const PasswordForgot = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="illustration">
          <img src="https://via.placeholder.com/300" alt="Forgot Password Illustration" />
        </div>
        <div className="form-content">
          <h2>Forgot Your Password?</h2>
          <Form
            name="reset_password"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your Email Address!' }]}
            >
              <Input type="email" placeholder="Email Address" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="submit-button">
                RESET PASSWORD
              </Button>
            </Form.Item>
          </Form>
          <div className="back-to-signin">
            <Link to={'/login'}>Back to signin</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordForgot;

import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { LockOutlined, MailOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import './adminCSS.css';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { AUTH_USER } from '../../gql/admin';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [authentification, { loading, error }] = useMutation(AUTH_USER);

  const handleSubmit = async () => {
    if (!email || !password) {
      return;
    }
    try {
      const { data } = await authentification({
        variables: {
          email: email,
          motDePasse: password,
        },
      });
      setEmail('');
      setPassword('');
      const token = data.authentification.token;
      localStorage.setItem('token', token);
      navigate('*');
    } catch (err) {
      console.error(err);
    }
  };

  const onFinish = (values: any) => {
    console.log(values);
    handleSubmit();
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="form-left">
          <div style={{ width: '300px', margin: '0 auto', paddingTop: '50px' }}>
            <h2>{t('hello_friend')}</h2>
            <Form
              name="login_form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              layout="vertical"
            >
              <Form.Item
                name="email"
                rules={[{ required: true, message: t('please_input_your_email') }]}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: t('please_input_your_password') }]}
              >
                <Input
                  prefix={<LockOutlined />}
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  suffix={passwordVisible ? 
                    <EyeInvisibleOutlined onClick={togglePasswordVisibility} /> : 
                    <EyeOutlined onClick={togglePasswordVisibility} />
                  }
                />
              </Form.Item>
              <Form.Item>
                <Link style={{ float: 'left' }} to="/signup">
                  {t('signup')}
                </Link>
                <Link style={{ float: 'right' }} to="/forgotpassword">
                  {t('forgot_password')}
                </Link>
              </Form.Item>
              {error && <p style={{ color: 'red' }}>{error?.message}</p>}
              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={loading}>
                  {t('login')}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div className="form-right">
          <h2>{t('glad_to_see_you')}</h2>
          <p>{t('welcome_message')}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;

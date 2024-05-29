import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Alert } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import './adminCSS.css';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../gql/admin';
import { useTranslation } from 'react-i18next';

const Signup = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [addUtilisateur, { loading, error }] = useMutation(ADD_USER);

  const handleSubmit = async (values: { firstName: any; lastName: any; email: any; password: any; confirmPassword: any; }) => {
    const { firstName, lastName, email, password, confirmPassword } = values;
    if (password !== confirmPassword) {
      return; // Handle password mismatch error
    }

    try {
      await addUtilisateur({
        variables: {
          nom: firstName,
          prenom: lastName,
          email: email,
          motDePasse: password,
        },
      });
      form.resetFields();
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="form-left">
          <h2>{t('hello_friend')}</h2>
          <Form
            form={form}
            name="signup_form"
            initialValues={{ remember: true }}
            onFinish={handleSubmit}
            layout="vertical"
          >
            <Form.Item
              name="firstName"
              rules={[{ required: true, message: t('please_input_your_first_name') }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder={t('first_name')}
              />
            </Form.Item>
            <Form.Item
              name="lastName"
              rules={[{ required: true, message: t('please_input_your_last_name') }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder={t('last_name')}
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[{ required: true, type: 'email', message: t('please_input_your_email') }]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="E-mail"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: t('please_input_your_password') }]}
            >
              <Input
                prefix={<LockOutlined />}
                type={passwordVisible ? "text" : "password"}
                placeholder={t('password')}
                suffix={passwordVisible ? 
                  <EyeInvisibleOutlined onClick={togglePasswordVisibility} /> : 
                  <EyeOutlined onClick={togglePasswordVisibility} />
                }
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              rules={[{ required: true, message: t('please_confirm_your_password') }]}
            >
              <Input
                prefix={<LockOutlined />}
                type={passwordVisible ? "text" : "password"}
                placeholder={t('confirm_password')}
                suffix={passwordVisible ? 
                  <EyeInvisibleOutlined onClick={togglePasswordVisibility} /> : 
                  <EyeOutlined onClick={togglePasswordVisibility} />
                }
              />
            </Form.Item>
            <Form.Item
              name="terms"
              valuePropName="checked"
              rules={[{ validator:(_, value) => value ? Promise.resolve() : Promise.reject(t('should_accept_terms_and_conditions')) }]}
            >
              <Checkbox>
                {t('i_read_and_agree_to')} <a href="#">{t('terms_and_conditions')}</a>
              </Checkbox>
            </Form.Item>
            {error && <p style={{ color: 'red' }}>{error.message}</p>}
            <Form.Item>
              <Button type="primary" htmlType="submit" className="submit-button" loading={loading}>
                {t('create_account')}
              </Button>
            </Form.Item>
          </Form>
          <div className="signin-link">
            <span>{t('already_have_an_account')} <Link to="/login">{t('sign_in')}</Link></span>
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

export default Signup;

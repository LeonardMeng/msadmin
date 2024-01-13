import React from 'react';
import './Login.scss'
import {Button, Form, Input, Select} from 'antd';
import {login} from "../../api/sso";


function Login(props) {
    let [form] = Form.useForm();
    const onSubmit = (values) => {
        let params = {
            username: values.username,
            password: values.password
        }
        login(params).then(res => {
            console.log('Success:', res);
        })

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onReset = () => {
        form.resetFields();
    };

    return (
        <div className='login'>
            <div className='login-form'>
                <h2>Admin System</h2>

                <Form
                    name="basic"
                    form={form}
                    labelCol={{
                        span: 5,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        username: '',
                        password: ''
                    }}
                    onFinish={onSubmit}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    {/*<Form.Item*/}
                    {/*    name="remember"*/}
                    {/*    valuePropName="checked"*/}
                    {/*    wrapperCol={{*/}
                    {/*        offset: 8,*/}
                    {/*        span: 16,*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    <Checkbox>Remember me</Checkbox>*/}
                    {/*</Form.Item>*/}

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button htmlType="button"
                                onClick={() => {
                                    form.resetFields()
                                }}>
                            Reset
                        </Button>
                        <Button type="primary" htmlType="submit"
                                style={{marginLeft: '10px'}}
                        >
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default Login;

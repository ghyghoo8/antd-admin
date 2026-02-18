import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader } from 'antd'
import { i18n } from '@lingui/core'
import city from 'utils/city'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

class UserModal extends PureComponent {
  formRef = React.createRef()

  handleOk = () => {
    const { item = {}, onOk } = this.props

    this.formRef.current.validateFields()
      .then(values => {
        const data = {
          ...values,
          key: item.key,
        }
        data.address = data.address.join(' ')
        onOk(data)
      })
      .catch(errorInfo => {
        console.log(errorInfo)
      })
  }

  render() {
    const { item = {}, onOk, form, ...modalProps } = this.props

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form ref={this.formRef} name="control-ref" initialValues={{ ...item, address: item.address && item.address.split(' ') }} layout="horizontal">
          <FormItem name='name' rules={[{ required: true }]}
            label={i18n._('Name')} hasFeedback {...formItemLayout}>
            <Input />
          </FormItem>
          <FormItem name='nickName' rules={[{ required: true }]}
            label={i18n._('NickName')} hasFeedback {...formItemLayout}>
            <Input />
          </FormItem>
          <FormItem name='isMale' rules={[{ required: true }]}
            label={i18n._('Gender')} hasFeedback {...formItemLayout}>
            <Radio.Group>
              <Radio value>
                {i18n._('Male')}
              </Radio>
              <Radio value={false}>
                {i18n._('Female')}
              </Radio>
            </Radio.Group>
          </FormItem>
          <FormItem name='age' label={i18n._('Age')} hasFeedback {...formItemLayout}>
            <InputNumber min={18} max={100} />
          </FormItem>
          <FormItem name='phone' rules={[{ required: true, pattern: /^1[34578]\d{9}$/, message: i18n._('The input is not valid phone!'), }]}
            label={i18n._('Phone')} hasFeedback {...formItemLayout}>
            <Input />
          </FormItem>
          <FormItem name='email' rules={[{ required: true, pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/, message: i18n._('The input is not valid E-mail!'), }]}
            label={i18n._('Email')} hasFeedback {...formItemLayout}>
            <Input />
          </FormItem>
          <FormItem name='address' rules={[{ required: true, }]}
            label={i18n._('Address')} hasFeedback {...formItemLayout}>
            <Cascader
              style={{ width: '100%' }}
              options={city}
              placeholder={i18n._('Pick an address')}
            />
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

UserModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default UserModal

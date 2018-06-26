import React from 'react'
import { Form, Select, Row, Col, Input, Button } from 'antd'
const FormItem = Form.Item
const SelectOption = Select.Option

class Contract extends React.Component {
  constructor(props) {
    super(props)
    this.setRefMeSelect = element => {
      this.refMeSelect = element
    }
  }
  componentDidMount () {
    this.refMeSelect.focus()
    setTimeout(() => {
      this.refMeSelect.blur()
    }, 1000)
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
      } else {
        return
      }
    })
  }
  render () {
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    }
    const tailFormItemLayout = {
      wrapperCol: { span: 16, offset: 8 }
    }
    const {
      getFieldDecorator
    } = this.props.form
    const rules = {
      contract_id: [{
        required: true, message: '请输入合同编号', trigger: 'change'
      }, {
        max: 20, message: '不得超过80字符', trigger: 'change'
      }],
      company_name: [{
        required: true, message: '请输入甲方名称', trigger: 'change'
      }],
      commission: [{
        required: true, message: '委托数量', trigger: 'change'
      }]
    }
    const getRules = (name) => {
      return {rules: rules[name]}
    }
    const MyFormItem = ({label, name, formItemLayout}) => (elem) =>
      <FormItem
      {...formItemLayout}
      label={label}
      key={name}
      >
      {getFieldDecorator(name, getRules(name))(elem)}
      </FormItem>

    const formItemsArr = [{
      label: '合同编号：',
      name: 'contract_id',
      formItemLayout,
      elem: <Input />
    }, {
      label: '甲方名称：',
      name: 'company_name',
      formItemLayout,
      elem: <Input />
    }, {
      label: '委托事项：',
      name: 'commission',
      formItemLayout,
      elem: (<Select allowClear={true} ref={this.setRefMeSelect}>
            <SelectOption value='k1'>商标委托事项</SelectOption>
            <SelectOption value='k2'>专利委托事项</SelectOption>
          </Select>)
    }]
    return (
      <Form onSubmit={this.handleSubmit}>
        {formItemsArr.map(formItem =>
          MyFormItem({
            label: formItem.label,
            name: formItem.name,
            formItemLayout: formItem.formItemLayout
          })(formItem.elem))}
         <FormItem
         {...tailFormItemLayout}
         >
          <Button
            type="primary"
            htmlType="submit"
          >
            提交
          </Button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(Contract)

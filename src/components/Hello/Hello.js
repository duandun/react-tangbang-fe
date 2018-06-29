import React from 'react'
import { Button } from 'antd'
import api from '@/api'
import Vue from 'vue'
import iView from 'iview'
import PropTypes from 'prop-types'
import 'iview/dist/styles/iview.css'
Vue.use(iView)
const Render = require('@didi/form-editor').default

const { PcRender } = Render

class VueDom extends React.Component {
  static propTypes = {
    formId: PropTypes.string,
    formInstance: PropTypes.func,
    allJson: PropTypes.object.isRequired
  }
  setDomRef = (elem) => {
    this.domRef = elem
  }
  componentDidMount () {
    const {formId, formInstance, allJson} = this.props
    const { domRef } = this
    formInstance(createFormDom({
      dom: domRef,
      allJson,
      formId
    }))
  }
  render () {
    return (
      <div ref={this.setDomRef} />
    )
  }
}
const createFormDom = ({dom, allJson, formId}) => new Vue({
  components: {
    PcRender
  },
  el: dom,
  render: (h) => {
    return h(
      'pc-render', {
        props: {
          allJson: allJson,
          formId: formId
        }
      }
    )
  }
  // template: '<div><pc-render :allJson="allJson" :formId="formId" /></div>'
})

export default class Hello extends React.Component {
  state = {
    allJson: void 0
  }
  setFormInstance (instance) {
    console.log(instance)
  }
  loadForm() {
    let fetchFunc = function () {}
    const key = 'BPM_apply_t'
    fetchFunc = api.process.loadFormBykey
    return fetchFunc({
      key,
      tenantId: 'BPM'
    }).then(results => {
      this.allJson = results
      this.setState({
        allJson: results
      })
      // console.log(111, this.state.allJson)
      window.scrollTo(0, 0)
      return results
    })
      .catch(error => {
        console.log(error)
      })
  }
  componentDidMount () {
    this.loadForm()
  }
  render() {
    const { setFormInstance } = this
    const { allJson } = this.state
    return (
      <div>
        <Button type='primary'>button</Button>
        {allJson && <VueDom formId='1' formInstance={setFormInstance} allJson={allJson} /> }
        Hello,React!
      </div>
    )
  }
}

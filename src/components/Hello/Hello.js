import React from 'react'
import { Button } from 'antd'

export default class Hello extends React.Component {
  render() {
    return (
      <div>
        <Button type='primary'>button</Button>
        Hello,React!
      </div>
    )
  }
}
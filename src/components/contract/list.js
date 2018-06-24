import React from 'react'
import { Table } from 'antd'
import { list } from '@/redux/actions/contract'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

@connect(
  state => ({
    tableList: state.contract.tableList,
    total: state.contract.total,
    query: {
      pageStart: state.contract.pageStart,
      pageSize: state.contract.pageSize
    }
  }),
  dispatch => ({search: (params) => dispatch(list(params))})
)
export default class ContractList extends React.Component {
  static propTypes = {
    tableList: PropTypes.array,
    total: PropTypes.number.isRequired,
    onShowSizeChange: PropTypes.func,
    onPageChange: PropTypes.func,
    search: PropTypes.func,
    query: PropTypes.object
  }

  wrapSearch (params) {
    const { search, query } = this.props
    search({
      ...query,
      ...params
    })
  }

  componentDidMount () {
    const { tableList } = this.props
    if (!tableList.length) {
      this.wrapSearch({
        pageStart: 1
      })
    }
  }

  onShowSizeChange = (current, size) => {
    this.wrapSearch({
      pageStart: current,
      pageSize: size
    })
  }

  onPageChange = (page) => {
    this.wrapSearch({
      pageStart: page
    })
  }

  render () {
    const { tableList, total, query } = this.props
    const columns = [{
      title: '序号',
      dataIndex: 'num',
      align: 'center',
      width: 60,
      render: (text, record, index) => {
        return <span>{index + 1}</span>
      }
    }, {
      title: '合同编号',
      dataIndex: 'contract_id'
    }, {
      title: '甲方名称',
      dataIndex: 'company_name'
    }]
    const pagination = {
      showSizeChanger: true,
      total,
      defaultCurrent: query.pageStart,
      defaultPageSize: query.pageSize,
      onShowSizeChange: this.onShowSizeChange,
      onChange: this.onPageChange
    }
    return (
      <div>
        <Table dataSource={tableList} rowKey='id' pagination={pagination} columns={columns} />
      </div>
    )
  }
}

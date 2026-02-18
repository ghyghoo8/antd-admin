import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Avatar } from 'antd'
import { DropOption } from 'components'
import { i18n } from '@lingui/core'
import { Link } from 'umi'
import styles from './List.less'

const { confirm } = Modal

class List extends PureComponent {
  handleMenuClick = (record, e) => {
    const { onDeleteItem, onEditItem } = this.props

    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: i18n._('Are you sure delete this record?'),
        onOk() {
          onDeleteItem(record.id)
        },
      })
    }
  }

  render() {
    const { onDeleteItem, onEditItem, ...tableProps } = this.props

    const columns = [
      {
        title: i18n._('Avatar'),
        dataIndex: 'avatar',
        key: 'avatar',
        width: '7%',
        fixed: 'left',
        render: text => <Avatar style={{ marginLeft: 8 }} src={text} />,
      },
      {
        title: i18n._('Name'),
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => <Link to={`user/${record.id}`}>{text}</Link>,
      },
      {
        title: i18n._('NickName'),
        dataIndex: 'nickName',
        key: 'nickName',
      },
      {
        title: i18n._('Age'),
        dataIndex: 'age',
        width: '6%',
        key: 'age',
      },
      {
        title: i18n._('Gender'),
        dataIndex: 'isMale',
        key: 'isMale',
        width: '7%',
        render: text => <span>{text ? i18n._('Male') : i18n._('Female')}</span>,
      },
      {
        title: i18n._('Phone'),
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: i18n._('Email'),
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: i18n._('Address'),
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: i18n._('CreateTime'),
        dataIndex: 'createTime',
        key: 'createTime',
      },
      {
        title: i18n._('Operation'),
        key: 'operation',
        fixed: 'right',
        width: '8%',
        render: (text, record) => {
          return (
            <DropOption
              onMenuClick={e => this.handleMenuClick(record, e)}
              menuOptions={[
                { key: '1', name: i18n._('Update') },
                { key: '2', name: i18n._('Delete') },
              ]}
            />
          )
        },
      },
    ]

    return (
      <Table
        {...tableProps}
        pagination={{
          ...tableProps.pagination,
          showTotal: total => i18n._('Total {total} Items', { total }),
        }}
        className={styles.table}
        bordered
        scroll={{ x: 1200 }}
        columns={columns}
        simple
        rowKey={record => record.id}
      />
    )
  }
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default List

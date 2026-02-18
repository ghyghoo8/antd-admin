import React, { PureComponent } from 'react'
import { Table, Avatar } from 'antd'
import { i18n } from '@lingui/core'
import { Ellipsis } from 'components'
import styles from './List.less'

class List extends PureComponent {
  render() {
    const { ...tableProps } = this.props
    const columns = [
      {
        title: i18n._('Image'),
        dataIndex: 'image',
        render: text => <Avatar shape="square" src={text} />,
      },
      {
        title: i18n._('Title'),
        dataIndex: 'title',
        render: text => (
          <Ellipsis tooltip length={30}>
            {text}
          </Ellipsis>
        ),
      },
      {
        title: i18n._('Author'),
        dataIndex: 'author',
      },
      {
        title: i18n._('Categories'),
        dataIndex: 'categories',
      },
      {
        title: i18n._('Tags'),
        dataIndex: 'tags',
      },
      {
        title: i18n._('Visibility'),
        dataIndex: 'visibility',
      },
      {
        title: i18n._('Comments'),
        dataIndex: 'comments',
      },
      {
        title: i18n._('Views'),
        dataIndex: 'views',
      },
      {
        title: i18n._('Publish Date'),
        dataIndex: 'date',
      },
    ]

    return (
      <Table
        {...tableProps}
        pagination={{
          ...tableProps.pagination,
          showTotal: total => i18n._('Total {total} Items', { total }),
        }}
        bordered
        scroll={{ x: 1200 }}
        className={styles.table}
        columns={columns}
        simple
        rowKey={record => record.id}
      />
    )
  }
}

export default List

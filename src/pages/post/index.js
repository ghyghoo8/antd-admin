import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import { Tabs } from 'antd'
import { history } from 'umi'
import { stringify } from 'qs'
import { i18n } from '@lingui/core'
import { Page } from 'components'
import List from './components/List'

// use `items` prop instead of Tabs.TabPane

const EnumPostStatus = {
  UNPUBLISH: 1,
  PUBLISHED: 2,
}

@connect(({ post, loading }) => ({ post, loading }))
class Post extends PureComponent {
  handleTabClick = key => {
    const { pathname } = this.props.location

    history.push({
      pathname,
      search: stringify({
        status: key,
      }),
    })
  }

  get listProps() {
    const { post, loading, location } = this.props
    const { list, pagination } = post
    const { query, pathname } = location

    return {
      pagination,
      dataSource: list,
      loading: loading.effects['post/query'],
      onChange(page) {
        history.push({
          pathname,
          search: stringify({
            ...query,
            page: page.current,
            pageSize: page.pageSize,
          }),
        })
      },
    }
  }

  render() {
    const { location } = this.props
    const { query } = location

    return (
      <Page inner>
        <Tabs
          activeKey={
            query.status === String(EnumPostStatus.UNPUBLISH)
              ? String(EnumPostStatus.UNPUBLISH)
              : String(EnumPostStatus.PUBLISHED)
          }
          onChange={this.handleTabClick}
          items={[
            {
              key: String(EnumPostStatus.PUBLISHED),
              label: i18n._('Publised'),
              children: <List {...this.listProps} />,
            },
            {
              key: String(EnumPostStatus.UNPUBLISH),
              label: i18n._('Unpublished'),
              children: <List {...this.listProps} />,
            },
          ]}
        />
      </Page>
    )
  }
}

Post.propTypes = {
  post: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default Post

import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Menu, Layout, Avatar, Popover, Badge, List } from 'antd'
import { Ellipsis } from 'components'
import {
  BellOutlined,
  RightOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'
import { i18n } from '@lingui/core'
import { getLocale, setLocale } from 'utils'
import dayjs from 'dayjs'
import classnames from 'classnames'
import config from 'config'
import styles from './Header.less'



class Header extends PureComponent {
  handleClickMenu = e => {
    e.key === 'SignOut' && this.props.onSignOut()
  }
  render() {
    const {
      fixed,
      avatar,
      username,
      collapsed,
      notifications,
      onCollapseChange,
      onAllNotificationsRead,
    } = this.props

    const userMenuItems = [
      {
        key: 'user',
        label: (
          <Fragment>
            <span style={{ color: '#999', marginRight: 4 }}>
              {i18n._('Hi,')}
            </span>
            <span>{username}</span>
            <Avatar style={{ marginLeft: 8 }} src={avatar} />
          </Fragment>
        ),
            children: [
          {
            key: 'SignOut',
            label: i18n._('Sign out'),
          },
        ],
      },
    ]

    const rightContent = [<Menu key="user" mode="horizontal" onClick={this.handleClickMenu} items={userMenuItems} />]

    if (config.i18n) {
      const { languages } = config.i18n
      const language = getLocale()
      const currentLanguage = languages.find(
        item => item.key === language
      )

      const languageItems = [
        {
          key: 'language',
          label: <Avatar size="small" src={currentLanguage.flag} />,
          children: languages.map(item => ({
            key: item.key,
            label: (
              <>
                <Avatar size="small" style={{ marginRight: 8 }} src={item.flag} />
                {item.title}
              </>
            ),
          })),
        },
      ]

      rightContent.unshift(
        <Menu
          key="language"
          selectedKeys={[currentLanguage.key]}
          onClick={data => {
            setLocale(data.key)
          }}
          mode="horizontal"
          items={languageItems}
        />
      )
    }

    rightContent.unshift(
      <Popover
        placement="bottomRight"
        trigger="click"
        key="notifications"
        overlayClassName={styles.notificationPopover}
        getPopupContainer={() => document.querySelector('#primaryLayout')}
        content={
          <div className={styles.notification}>
            <List
              itemLayout="horizontal"
              dataSource={notifications}
              locale={{
                emptyText: i18n._('You have viewed all notifications.'),
              }}
              renderItem={item => (
                <List.Item className={styles.notificationItem}>
                  <List.Item.Meta
                    title={
                      <Ellipsis tooltip lines={1}>
                        {item.title}
                      </Ellipsis>
                    }
                    description={dayjs(item.date).fromNow()}
                  />
                  <RightOutlined style={{ fontSize: 10, color: '#ccc' }} />
                </List.Item>
              )}
            />
            {notifications.length ? (
              <div
                onClick={onAllNotificationsRead}
                className={styles.clearButton}
              >
                {i18n._('Clear notifications')}
              </div>
            ) : null}
          </div>
        }
      >
        <Badge
          count={notifications.length}
          dot
          offset={[-10, 10]}
          className={styles.iconButton}
        >
          <BellOutlined className={styles.iconFont} />
        </Badge>
      </Popover>
    )

    return (
      <Layout.Header
        className={classnames(styles.header, {
          [styles.fixed]: fixed,
          [styles.collapsed]: collapsed,
        })}
        style={{height: 72, backgroundColor: 'white', paddingInline: 0}}
        id="layoutHeader"
      >
        <div
          className={styles.button}
          onClick={onCollapseChange.bind(this, !collapsed)}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
        <div className={styles.rightContainer}>{rightContent}</div>
      </Layout.Header>
    )
  }
}

Header.propTypes = {
  fixed: PropTypes.bool,
  user: PropTypes.object,
  menus: PropTypes.array,
  collapsed: PropTypes.bool,
  onSignOut: PropTypes.func,
  notifications: PropTypes.array,
  onCollapseChange: PropTypes.func,
  onAllNotificationsRead: PropTypes.func,
}

export default Header

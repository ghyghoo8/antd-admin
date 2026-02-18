import React from 'react'
import PropTypes from 'prop-types'
import { BarsOutlined, DownOutlined } from '@ant-design/icons'
import { Dropdown, Button, Menu } from 'antd'

const DropOption = ({
  onMenuClick,
  menuOptions = [],
  buttonStyle,
  dropdownProps,
}) => {
  const items = menuOptions.map(item => ({ key: item.key, label: item.name }))

  return (
    <Dropdown overlay={<Menu onClick={onMenuClick} items={items} />} {...dropdownProps}>
      <Button style={{ border: 'none', ...buttonStyle }}>
        <BarsOutlined style={{ marginRight: 2 }} />
        <DownOutlined />
      </Button>
    </Dropdown>
  )
}

DropOption.propTypes = {
  onMenuClick: PropTypes.func,
  menuOptions: PropTypes.array.isRequired,
  buttonStyle: PropTypes.object,
  dropdownProps: PropTypes.object,
}

export default DropOption

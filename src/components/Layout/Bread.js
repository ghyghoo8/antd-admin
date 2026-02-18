import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Breadcrumb } from 'antd'
import { Link, withRouter } from 'umi'
import { t } from "@lingui/macro"
import iconMap from 'utils/iconMap'
const { pathToRegexp } = require('path-to-regexp')
import { queryAncestors } from 'utils'
import styles from './Bread.less'

@withRouter
class Bread extends PureComponent {
  generateBreadcrumbItems = paths => {
    return paths
      .map((item, key) => {
        if (!item) return null

        const content = (
          <Fragment>
            {item.icon && <span style={{ marginRight: 4 }}>{iconMap[item.icon]}</span>}
            {item.name}
          </Fragment>
        )

        return ({
          key: item.id || key,
          title: paths.length - 1 !== key ? <Link to={item.route || '#'}>{content}</Link> : content,
        })
      })
      .filter(Boolean)
  }
  render() {
    const { routeList, location } = this.props

    // Find a route that matches the pathname.
    const currentRoute = routeList.find(
      (_) => _.route && pathToRegexp(_.route).exec(location.pathname)
    )

    // Find the breadcrumb navigation of the current route match and all its ancestors.
    const paths = currentRoute
      ? queryAncestors(routeList, currentRoute, 'breadcrumbParentId').reverse()
      : [
          routeList[0],
          {
            id: 404,
            name: t`Not Found`,
          },
        ]

    const items = this.generateBreadcrumbItems(paths)

    return <Breadcrumb className={styles.bread} items={items} />
  }
}

Bread.propTypes = {
  routeList: PropTypes.array,
}

export default Bread

import React, { PureComponent } from 'react'
import { Redirect } from 'umi'
import { i18n } from '@lingui/core'

class Index extends PureComponent {
  render() {
    return <Redirect to={i18n._('/dashboard')} />
  }
}

export default Index

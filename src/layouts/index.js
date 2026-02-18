import React, { Component } from 'react'
import { withRouter } from 'umi'
import { ConfigProvider } from 'antd'
import { i18n } from "@lingui/core"
import { I18nProvider } from '@lingui/react'
import { getLocale } from 'utils'
import config from 'utils/config'
import { zh, en, pt } from 'make-plural/plurals'
import enMessages from '../locales/en/messages.json'
import zhMessages from '../locales/zh/messages.json'
import ptMessages from '../locales/pt-br/messages.json'
import zhCN from 'antd/locale/zh_CN'
import enUS from 'antd/locale/en_US'
import ptBR from 'antd/locale/pt_BR'

import BaseLayout from './BaseLayout'

i18n.loadLocaleData({
  en: { plurals: en },
  zh: { plurals: zh },
  'pt-br': { plurals: pt }
})

// Activate the default language synchronously so I18nProvider doesn't render `null` in dev.
// Avoid activating the user-selected language here because its messages may not be loaded yet.
const configuredDefault = (config && config.i18n && config.i18n.defaultLanguage) || 'en'
const _catalogs = {
  en: enMessages,
  zh: zhMessages,
  'pt-br': ptMessages,
}
try {
  const initialCatalog = _catalogs[configuredDefault]
  if (initialCatalog) {
    i18n.load(configuredDefault, initialCatalog)
  }
  i18n.activate(configuredDefault)
} catch (e) {
  // ignore activation errors during bootstrap
}

// antd
const languages = {
  zh: zhCN,
  en: enUS,
  'pt-br': ptBR
}

const { defaultLanguage } = i18n

@withRouter
class Layout extends Component {
  state = {
  }

  componentDidMount() {
    let language = getLocale()
    if (!languages[language]) language = configuredDefault
    this.loadCatalog(language).catch(() => {})
  }

  loadCatalog = async (lan) => {
    const language = lan || i18n.defaultLanguage
    try {
      const catalogModule = await import(`../locales/${language}/messages.json`)
      const catalog = catalogModule && catalogModule.default ? catalogModule.default : catalogModule

      i18n.load(language, catalog)
      i18n.activate(language)
    } catch (err) {
      // If loading fails, fall back to default language and log a warning.
      console.warn(`Failed to load messages for locale "${language}":`, err)
    }
  }

  render() {
    const { children } = this.props

    let language = getLocale()

    if (!languages[language]) language = configuredDefault

    return (
      <ConfigProvider locale={languages[language]}>
        <I18nProvider i18n={i18n}>
          <BaseLayout>{children}</BaseLayout>
        </I18nProvider>
      </ConfigProvider>
    )
  }
}

export default Layout

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import { Row, Col, Card } from 'antd'
import { Color } from 'utils'
import { Page, ScrollBar } from 'components'
import {
  NumberCard,
  Quote,
  Sales,
  Weather,
  RecentSales,
  Comments,
  Completed,
  Browser,
  Cpu,
  User,
} from './components'
import styles from './index.less'
import store from 'store'

const bodyStyle = {
  styles: {
    body: {
      height: 432,
      background: '#fff',
    },
  },
}

@connect(({ app, dashboard, loading }) => ({
  dashboard,
  loading,
}))
class Dashboard extends PureComponent {
  render() {
    const userDetail = store.get('user')
    const { avatar, username } = userDetail
    const { dashboard, loading } = this.props
    const {
      weather,
      sales,
      quote,
      numbers,
      recentSales,
      comments,
      completed,
      browser,
      cpu,
      user,
    } = dashboard

    const numberCards = numbers.map((item, key) => (
      <Col key={key} lg={6} md={12}>
        <NumberCard {...item} />
      </Col>
    ))

    return (
      <Page
        // loading={loading.models.dashboard && sales.length === 0}
        className={styles.dashboard}
      >
        <Row gutter={24}>
          {numberCards}
          <Col lg={18} md={24}>
            <Card
              variant="shadow"
              styles={{
                body: {
                  padding: '24px 36px 24px 0',
                },
              }}
            >
              <Sales data={sales} />
            </Card>
          </Col>
          <Col lg={6} md={24}>
            <Row gutter={24}>
              <Col lg={24} md={12}>
                <Card
                  variant="shadow"
                  className={styles.weather}
                  styles={{
                    body: {
                      padding: 0,
                      height: 204,
                      background: Color.blue,
                    },
                  }}
                >
                  <Weather
                    {...weather}
                    loading={loading.effects['dashboard/queryWeather']}
                  />
                </Card>
              </Col>
              <Col lg={24} md={12}>
                <Card
                  variant="shadow"
                  className={styles.quote}
                  styles={{
                    body: {
                      padding: 0,
                      height: 204,
                      background: Color.peach,
                    },
                  }}
                >
                  <ScrollBar>
                    <Quote {...quote} />
                  </ScrollBar>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col lg={12} md={24}>
            <Card variant="shadow" {...bodyStyle}>
              <RecentSales data={recentSales} />
            </Card>
          </Col>
          <Col lg={12} md={24}>
            <Card variant="shadow" {...bodyStyle}>
              <ScrollBar>
                <Comments data={comments} />
              </ScrollBar>
            </Card>
          </Col>
          <Col lg={24} md={24}>
            <Card
              variant="shadow"
              styles={{
                body: {
                  padding: '24px 36px 24px 0',
                },
              }}
            >
              <Completed data={completed} />
            </Card>
          </Col>
          <Col lg={8} md={24}>
            <Card variant="shadow" {...bodyStyle}>
              <Browser data={browser} />
            </Card>
          </Col>
          <Col lg={8} md={24}>
            <Card variant="shadow" {...bodyStyle}>
              <ScrollBar>
                <Cpu {...cpu} />
              </ScrollBar>
            </Card>
          </Col>
          <Col lg={8} md={24}>
            <Card
              variant="shadow"
              styles={{ ...bodyStyle.styles, body: { ...bodyStyle.styles.body, padding: 0 } }}
            >
              <User {...user} avatar={avatar} username={username} />
            </Card>
          </Col>
        </Row>
      </Page>
    )
  }
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
  loading: PropTypes.object,
}

export default Dashboard

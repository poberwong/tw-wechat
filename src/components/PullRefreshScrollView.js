import React from 'react'
import { ScrollView, RefreshControl, ColorPropType } from 'react-native'
import PropTypes from 'prop-types'

export default class PullRefreshScrollView extends React.Component {
  static propTypes = {
    ...ScrollView.propTypes,
    refreshing: PropTypes.bool,
    onRefresh: PropTypes.func,
    loaderColor: ColorPropType,
    loaderTopOffset: PropTypes.number,
    refresherProps: PropTypes.object
  }

  static defaultProps = {
    ...ScrollView.defaultPropTypes,
    scrollEventThrottle: 16,
    showsVerticalScrollIndicator: false,
    refreshing: false,
    loaderColor: '#ccc',
    loaderTopOffset: 0
  }

  scrollTo = (...args) => {
    this.refs['sv'] && this.refs['sv'].scrollTo(...args)
  }

  scrollToEnd = (...args) => {
    this.refs['sv'] && this.refs['sv'].scrollToEnd(...args)
  }

  scrollWithoutAnimationTo = (...args) => {
    this.refs['sv'] && this.refs['sv'].scrollWithoutAnimationTo(...args)
  }

  flashScrollIndicators = (...args) => {
    this.refs['sv'] && this.refs['sv'].flashScrollIndicators(...args)
  }

  render () {
    const {refreshing, onRefresh, loaderTopOffset, loaderColor, refresherProps, ...otherProps} = this.props
    return (
      <ScrollView
        ref='sv'
        {...otherProps}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            progressViewOffset={loaderTopOffset}
            colors={[loaderColor]}
            {...refresherProps}
          />
        }
      />
    )
  }
}

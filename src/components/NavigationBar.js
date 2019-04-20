import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ViewPropTypes
} from 'react-native'

export const NAV_BAR_HEIGHT = (iOS ? 44 : 56)
export default class extends Component {
  static propTypes = {
    leftView: PropTypes.node,
    rightView: PropTypes.node,
    title: PropTypes.any,
    rightStyle: ViewPropTypes.style,
    hiddenBack: PropTypes.bool,
    backAction: PropTypes.func,
    rightAction: PropTypes.func,
    titleStyle: Text.propTypes.style
  }

  static defaultProps = {
    hiddenBack: false,
    leftView: null
  }

  render () {
    const { title, leftView, rightView, hiddenBack, rightStyle,
      backAction, rightAction, titleStyle, ...rest } = this.props

    const LeftViewWrapper = hiddenBack ? View : TouchableOpacity
    const leftViewWrapperProps = hiddenBack ? {} : {onPress: backAction, activeOpacity: 0.8}

    const RightViewWrapper = rightAction ? TouchableOpacity : View
    const rightViewWrapperProps = rightAction ? {onPress: rightAction, activeOpacity: 0.8} : {}

    return (
      <SafeAreaView {...rest}>
        <View style={styles.navbar}>
          <LeftViewWrapper style={[styles.actionWrapper, {paddingLeft: 6}]} {...leftViewWrapperProps}>
            {!hiddenBack && leftView}
          </LeftViewWrapper>
          <View style={styles.titleWrapper}>
            <Text numberOfLines={1} style={[styles.title, titleStyle]}>{title}</Text>
          </View>
          <RightViewWrapper style={[styles.actionWrapper, rightStyle]} {...rightViewWrapperProps}>
            {rightView}
          </RightViewWrapper>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    height: NAV_BAR_HEIGHT
  },
  titleWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 4
  },
  title: {
    fontSize: 18,
    color: 'white',
    fontWeight: '400'
  },
  actionWrapper: {
    flex: 1,
    justifyContent: 'center'
  }
})

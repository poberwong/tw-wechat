import React from 'react'
import { ActivityIndicator, View, ViewPropTypes, ColorPropType } from 'react-native'
import PropTypes from 'prop-types'

export default class Loader extends React.Component {
  static propTypes = {
    ...ViewPropTypes,
    size: PropTypes.oneOf(['small', 'large']),
    autoPlay: PropTypes.bool,
    color: ColorPropType
  }

  static defaultProps = {
    size: 'small',
    autoPlay: true
  }

  render () {
    const {style, autoPlay, size, color, children, ...otherProps} = this.props
    return (
      <View style={[{
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
      }, style]} {...otherProps}>
        <ActivityIndicator color={color} animating={autoPlay} size={size} />
        {children}
      </View>
    )
  }
}

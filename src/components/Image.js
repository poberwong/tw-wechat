/**
 * Created by poberwong on 2019-04-20.
 */

import React from 'react'
import { Image, ImageBackground, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'

export default class extends React.Component {
  static propTypes = Image.propTypes
  static defaultProps = {
    defaultSource: require('../assets/default_img.png')
  }

  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      defaultWidth: SCREEN_WIDTH / 3,
      defaultHeight: SCREEN_WIDTH / 3
    }
  }

  _onLoad = ({nativeEvent: {width, height}}) => {
    this.setState({
      isLoading: false,
      defaultWidth: width,
      defaultHeight: height
    })
  }

  render () {
    const {isLoading, defaultHeight, defaultWidth} = this.state
    const {style = {}, source, defaultSource, ...otherProps} = this.props
    const flattenStyle = StyleSheet.flatten(style)
    flattenStyle.height = flattenStyle.height || defaultHeight
    flattenStyle.width = flattenStyle.width || defaultWidth

    if (isLoading) {
      return (
        <ImageBackground
          style={[flattenStyle, {backgroundColor: 'transparent'}]}
          imageStyle={{borderRadius: flattenStyle.borderRadius}}
          source={defaultSource}
          {...otherProps}>
          <FastImage style={{flex: 1}} source={source} onLoad={this._onLoad} />
        </ImageBackground>
      )
    } else {
      return (
        <FastImage {...this.props} style={flattenStyle} />
      )
    }
  }
}

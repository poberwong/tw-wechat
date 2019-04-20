/**
 * Created by poberwong on 2019-04-20.
 */

import Image from './Image'
import React from 'react'
import PropTypes from 'prop-types'
import {StyleSheet} from 'react-native'

export default function Avatar (props) {
  const {size, ...rest} = props
  return (
    <Image style={styles[size]} {...rest} />
  )
}

Avatar.propTypes = {
  size: PropTypes.oneOf(['normal', 'large'])
}

Avatar.defaultProps = {
  size: 'normal'
}

const styles = StyleSheet.create({
  normal: {
    width: 38,
    height: 38,
    borderRadius: 5
  },
  large: {
    width: 75,
    height: 75,
    borderRadius: 12
  }
})

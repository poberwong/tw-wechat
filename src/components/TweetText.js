/**
 * Created by poberwong on 2019-04-20.
 */

import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text } from 'react-native'

export default function TweetText (props) {
  const {content, style, ...rest} = props
  return (
    <Text style={[styles.text, style]} {...rest}>
      {content}
    </Text>
  )
}

TweetText.propTypes = {
  content: PropTypes.string,
  style: Text.propTypes.style
}

TweetText.defaultProps = {
  content: ''
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16
  }
})

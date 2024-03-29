/**
 * Created by poberwong on 2019-04-20.
 */

import React from 'react'
import PropTypes from 'prop-types'
import Image from './Image'
import { StyleSheet, View, ViewPropTypes } from 'react-native'
import { fixRow } from '../helpers/LayoutHelper'

export default function TweetImages (props) {
  const {urls, style} = props
  if (urls.length === 1) {
    return <Image style={style} source={{uri: urls[0]}} />
  }

  let views = urls.slice(0, 9).map((url, index) => (
    <Image
      style={styles.image}
      source={{uri: url}}
      key={index} />
  ))
  views = fixRow(views, 3, styles.image)
  return (
    <View style={[styles.imagesWrapper, style]}>
      {views}
    </View>
  )
}

TweetImages.propTypes = {
  urls: PropTypes.array,
  style: ViewPropTypes.style
}

/**
 * it could be better to caculate marginTop of each image.
 */
const styles = StyleSheet.create({
  imagesWrapper: {
    flex: 1,
    marginRight: 62,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  image: {
    width: '32%',
    aspectRatio: 1, // to make one of width or height same as another
    marginTop: (SCREEN_WIDTH - (62 * 2)) * 0.02,
    overflow: 'hidden'
  }
})

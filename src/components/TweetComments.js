/**
 * Created by poberwong on 2019-04-20.
 */

import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View } from 'react-native'
import { Color } from '../helpers/Constants'

export default function TweetComments (props) {
  const {comments, style} = props
  return (
    <View style={[styles.container, style]}>
      {comments.map((comment, index) => (
        <Text key={index} style={styles.comment}>
          <Text style={styles.commentSender}>{comment.sender.nick}</Text>
          : {comment.content}
        </Text>
      ))}
    </View>
  )
}

TweetComments.propTypes = {
  comments: PropTypes.array,
  style: Text.propTypes.style
}

TweetComments.defaultProps = {
  comments: []
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.background.comment,
    paddingVertical: 3,
    paddingHorizontal: 5
  },
  comment: {
    fontSize: 14
  },
  commentSender: {
    color: Color.nick.tweet,
    fontWeight: '500'
  }
})

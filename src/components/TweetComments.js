/**
 * Created by poberwong on 2019-04-20.
 */
/**
 * Created by poberwong on 2019-04-20.
 */

import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View } from 'react-native'

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
    backgroundColor: '#f2f2f2',
    paddingVertical: 3,
    paddingHorizontal: 5
  },
  comment: {
    fontSize: 14
  },
  commentSender: {
    color: '#4b628D',
    fontWeight: '500'
  }
})

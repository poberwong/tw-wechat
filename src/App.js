/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */

import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import BaseFlatList from './components/BaseFlatList'
import { tweets } from './helpers/data'
import Avatar from './components/Avatar'
import TweetText from './components/TweetText'
import TweetImages from './components/TweetImages'
import TweetComments from './components/TweetComments'
import './helpers/global'

const PAGE_SIZE = 5
const AVALIABLE_TWEETS = tweets.filter(
  tweet => (tweet.images || tweet.content)
)

export default class App extends Component {
  _loadTweets = (offset) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(AVALIABLE_TWEETS.slice(offset, offset + PAGE_SIZE))
      }, 0)
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <BaseFlatList
          keyExtractor={(item, index) => index + ''}
          renderItem={this._renderTweet}
          fetch={this._loadTweets} />
      </View>
    )
  }

  _renderTweet = ({ item }) => {
    return (
      <View style={styles.tweetContainer}>
        <Avatar source={{uri: (item.sender || {}).avatar}} />
        <View style={styles.rightPart}>
          <Text style={styles.nickName}>{(item.sender || {}).nick}</Text>
          {item.content && <TweetText style={{marginTop: 3}} content={item.content} />}
          {(item.images && item.images.length > 0) &&
            <TweetImages urls={item.images.map(item => item.url)} />
          }
          {(item.comments && item.comments.length > 0) &&
            <TweetComments style={{marginTop: 12}} comments={item.comments} />
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF'
  },
  tweetContainer: {
    flexDirection: 'row',
    borderColor: '#ccc',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingVertical: 14,
    paddingHorizontal: 12
  },
  rightPart: {
    flex: 1,
    marginLeft: 12
  },
  nickName: {
    fontSize: 17,
    color: '#4b628D',
    fontWeight: '500'
  }
})

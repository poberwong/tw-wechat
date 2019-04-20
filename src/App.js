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
  _renderProfile = () => {
    return (
      <View style={styles.profileContainer}>
        <Image style={styles.profileBg} source={{uri: profile['profile-image']}} />
        <Avatar size='large' style={styles.profileAvatar} source={{uri: profile.avatar}} />
        <Text style={[styles.nickName, styles.profileNick]}>{profile.nick}</Text>
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
  header: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0
  },
  navbar: {
    height: HEADER_MIN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center'
  },
  navTitle: {
    fontSize: 18,
    fontWeight: '400',
    backgroundColor: 'transparent'
  },
  profileContainer: {
    height: SCREEN_HEIGHT * 0.4,
    marginBottom: 25
  },
  profileBg: {
    width: '100%',
    height: '100%'
  },
  profileAvatar: {
    position: 'absolute',
    right: 12,
    bottom: -25
  },
  profileNick: {
    position: 'absolute',
    right: 100,
    bottom: 8,
    color: 'white',
    fontSize: 16
  },
  tweetContainer: {
    flexDirection: 'row',
    borderColor: '#ccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
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

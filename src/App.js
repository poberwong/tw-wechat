import './helpers/global'
import React, { Component } from 'react'
import { StyleSheet, Text, View, Animated, SafeAreaView } from 'react-native'
import BaseFlatList from './components/BaseFlatList'
import { profile, tweets } from './helpers/data'
import Image from './components/Image'
import Avatar from './components/Avatar'
import TweetText from './components/TweetText'
import TweetImages from './components/TweetImages'
import TweetComments from './components/TweetComments'
import AnimatedImplementation from 'AnimatedImplementation'
import { NAV_BAR_HEIGHT } from './components/NavigationBar'
import { Color } from './helpers/Constants'

/**
 * avaliable tweets and page size
 */
const PAGE_SIZE = 5
const AVALIABLE_TWEETS = tweets.filter(
  tweet => (tweet.images || tweet.content)
)

/**
 * constant of scroll animation
 */
const offset = SCREEN_HEIGHT * 0.4
const HEADER_MAX_HEIGHT = NAV_BAR_HEIGHT + offset
const HEADER_MIN_HEIGHT = NAV_BAR_HEIGHT
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT
const AnimatedSafeAreaView = AnimatedImplementation.createAnimatedComponent(SafeAreaView)

export default class App extends Component {
  state = {
    scrollY: new Animated.Value(0)
  }

  _loadTweets = (offset) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(AVALIABLE_TWEETS.slice(offset, offset + PAGE_SIZE))
      }, 1300)
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <BaseFlatList
          scrollEventThrottle={16}
          data={AVALIABLE_TWEETS.slice(0, 5)}
          onScroll={
            Animated.event([{
              nativeEvent: {contentOffset: {y: this.state.scrollY}}
            }])
          }
          ListHeaderComponent={this._renderProfile}
          keyExtractor={(item, index) => index + ''}
          renderItem={this._renderTweet}
          fetch={this._loadTweets} />
        {this._renderHeader()}
      </View>
    )
  }

  _renderHeader () {
    const navigationOpacity = this.state.scrollY.interpolate({
      inputRange: [HEADER_SCROLL_DISTANCE / 3, HEADER_SCROLL_DISTANCE * 4 / 5],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    })

    return (
      <AnimatedSafeAreaView style={[styles.header, {opacity: navigationOpacity}]}>
        <View style={[styles.navbar, {height: HEADER_MIN_HEIGHT}]}>
          <Text style={[styles.navTitle]}>朋友圈</Text>
        </View>
      </AnimatedSafeAreaView>
    )
  }

  _renderProfile = () => {
    return (
      <View style={styles.profileContainer}>
        <Image style={styles.profileBg} source={{uri: profile['profile-image']}} />
        <Avatar size='large' style={styles.profileAvatar} source={{uri: profile.avatar}} />
        <Text style={[styles.nickName, styles.profileNick]}>{profile.nick}</Text>
      </View>
    )
  }

  _renderTweet = ({item}) => {
    return (
      <View style={styles.tweetContainer}>
        <Avatar source={{uri: (item.sender || {}).avatar}} />
        <View style={styles.rightPart}>
          <Text style={styles.nickName}>{(item.sender || {}).nick}</Text>
          {item.content && <TweetText style={{marginTop: 3}} content={item.content} />}
          {(item.images && item.images.length > 0) &&
          <TweetImages
            style={{marginTop: 12}}
            urls={item.images.map(item => item.url)} />
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
    backgroundColor: Color.background.common
  },
  header: {
    backgroundColor: Color.header.common,
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
    backgroundColor: Color.background.common,
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
    color: Color.nick.profile,
    fontSize: 16
  },
  tweetContainer: {
    backgroundColor: Color.background.tweet,
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
    color: Color.nick.tweet,
    fontWeight: '500'
  }
})

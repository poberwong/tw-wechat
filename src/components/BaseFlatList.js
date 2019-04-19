/**
 * Created by poberwong on 2019-04-19.
 */

import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import Loader from './Loader'
import PullRefreshScrollView from './PullRefreshScrollView'

@observer
export default class BaseFlatList extends React.Component {
  static propTypes = {
    ...FlatList.propTypes,
    fetch: PropTypes.func.isRequired,
    allowRefresh: PropTypes.bool,
    needInit: PropTypes.bool
  }
  static defaultProps = {
    allowRefresh: true,
    needInit: true
  }
  @observable data = []
  @observable action = ''
  @observable hasMore = true
  @observable lastAction = ''
  @observable isNetError = false

  constructor (props) {
    super(props)
    if (props.data && props.data.length) {
      this.data = props.data
    }
  }

  componentDidMount () {
    this.props.needInit && this.refresh()
  }

  refresh = () => {
    this._fetchData('refresh')
  }

  loadMore = () => {
    if (this.isNetError) {
      return
    }
    this._fetchData('more')
  }

  _fetchData = (action) => {
    if (this.action !== '') {
      // 已经有加载数据的动作
      return
    }
    if (action === 'more' && !this.hasMore) {
      return
    }
    this.isNetError = false
    this.action = action
    this.props.fetch(action === 'refresh' ? 0 : this.data.length)
      .then(data => {
        if (action === 'refresh') {
          this.data = data
        } else {
          this.data = this.data.concat(data)
        }
        this.hasMore = data.length !== 0
      })
      .catch(() => {
        this.isNetError = true
      })
      .finally(() => {
        this.lastAction = action
        this.action = ''
      })
  }

  _renderHeader = () => {
    if (this.isNetError && this.lastAction === 'refresh') {
      return this._renderNetError()
    }
    return null
  }

  _renderFooter = () => {
    if (this.action === 'more') {
      return (
        <Loader style={{ alignSelf: 'center', marginVertical: 15, flexDirection: 'row' }}>
          <Text> 正在加载...</Text>
        </Loader>
      )
    }
    if (this.isNetError && this.lastAction === 'more') {
      return this._renderNetError()
    }

    if (!this.hasMore && this.lastAction === 'more') {
      return this._renderNoMore()
    }
    return null
  }

  _renderScrollComponent = (props) => {
    if (this.props.allowRefresh) {
      return (
        <PullRefreshScrollView {...props} refreshing={this.action === 'refresh'} onRefresh={this.refresh} />
      )
    }
    return <ScrollView {...props} />
  }

  render () {
    return (
      <FlatList
        ref='list'
        renderScrollComponent={this._renderScrollComponent}
        data={this.data}
        extraData={this.action}
        onEndReachedThreshold={0.01}
        onEndReached={this.loadMore}
        ListHeaderComponent={this._renderHeader}
        ListFooterComponent={this._renderFooter}
        showsVerticalScrollIndicator={false}
        {...this.props}
        ListEmptyComponent={
          this.action || this.isNetError
            ? null
            : (this.props.ListEmptyComponent || this._renderEmptyList())
        }
      />
    )
  }

  retry = () => {
    this._fetchData(this.lastAction)
  }

  _renderEmptyList = () => (
    <View style={styles.emptyPage}>
      <Text style={styles.noRecord}>No record</Text>
    </View>
  )

  _renderNoMore = () => {
    return (
      <View style={styles.badNetContainer}>
        <Text style={styles.noMoreText}>No more data</Text>
      </View>
    )
  }

  _renderNetError = () => {
    return (
      <View style={styles.badNetContainer}>
        <Text style={styles.sorryText}>抱歉，网络出错啦~</Text>
        <Text style={styles.tipText}>请检查您的网络</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={this.retry} style={{ marginTop: 30, overflow: 'hidden', borderRadius: 50 }}>
          <Text style={styles.retryBtnText}>重新加载</Text>
        </TouchableOpacity>
      </View>
    )
  }

  /** other FlatList function **/

  scrollToEnd = (...args) => {
    this.refs['list'] && this.refs['list'].scrollToEnd(...args)
  }

  scrollToIndex = (...args) => {
    this.refs['list'] && this.refs['list'].scrollToIndex(...args)
  }

  scrollToItem = (...args) => {
    this.refs['list'] && this.refs['list'].scrollToItem(...args)
  }

  scrollToOffset = (...args) => {
    this.refs['list'] && this.refs['list'].scrollToOffset(...args)
  }
}

const styles = StyleSheet.create({
  badNetContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15
  },
  sorryText: {
    fontSize: 14,
    fontFamily: '.PingFangSC-Light',
    color: '#333333',
    marginTop: 15
  },
  tipText: {
    marginTop: 10,
    fontFamily: '.PingFangSC-Light',
    fontSize: 12,
    color: '#666'
  },
  retryBtn: {
    paddingHorizontal: 45.5,
    paddingVertical: 8.5,
    borderRadius: 50,
    overflow: 'hidden'
  },
  retryBtnText: {
    fontSize: 12,
    fontFamily: '.PingFangSC-Light',
    color: '#fff',
    backgroundColor: 'transparent'
  },
  noMoreText: {
    fontSize: 12,
    fontFamily: '.PingFangSC-Light',
    color: 'rgba(255, 255, 255, 0.6)'
  },
  emptyPage: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '30%'
  },
  noRecord: {
    marginTop: 18,
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)'
  }
})

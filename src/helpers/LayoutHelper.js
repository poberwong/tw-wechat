/**
 * Created by poberwong on 2019-04-20.
 */

import React from 'react'
import { View } from 'react-native'

/**
 * @param arr
 * @param rowLength
 * @param style
 * @returns {*}
 */
export function fixRow (arr, rowLength, style) {
  if (arr.length % rowLength === 0) {
    return arr
  }

  const addedCount = rowLength - arr.length % rowLength
  for (let i = 0; i < addedCount; i++) {
    arr.push(
      <View key={`fix-${i}`} style={style} />
    )
  }
  return arr
}

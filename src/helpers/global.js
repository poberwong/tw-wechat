/**
 * Created by poberwong on 2019-04-20.
 */
import { Dimensions, PixelRatio, Platform } from 'react-native'

let {height, width} = Dimensions.get('window')

// 获取屏幕宽度
global.SCREEN_WIDTH = width

// 获取屏幕高度
global.SCREEN_HEIGHT = height

// 获取屏幕分辨率
global.PixelRatio = PixelRatio.get()

// 系统是iOS
global.iOS = (Platform.OS === 'ios')

export default global

import { Easing, Animated } from 'react-native'

module.exports = {
  fast (value, toValue) {
    return new Promise((resolve, reject) =>
      Animated.timing(value, {
        toValue: toValue,
        duration: 100,
      }).start(resolve)
    )
  },
  medium (value, toValue) {
    return new Promise((resolve, reject) =>
      Animated.timing(value, {
        toValue: toValue,
        duration: 300,
      }).start(resolve)
    )
  },
  slow (value, toValue) {
    return new Promise((resolve, reject) =>
      Animated.timing(value, {
        toValue: toValue,
        duration: 1000,
      }).start(resolve)
    )
  },
  continuous (value) {
    value.setValue(0)
    return new Promise((resolve, reject) =>
      Animated.timing(value, {
        toValue: 1,
        duration: 15000,
        easing: Easing.linear
      }).start(() => this.continuous(value))
    )
  },
}

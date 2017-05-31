import { Easing, Animated } from 'react-native'

class Animation {
  constructor (value, inputRange) {
    this.value = new Animated.Value(value)
    this.inputRange = inputRange
  }

  interpolate (outputRange) {
    return this.value.interpolate({
      inputRange: this.inputRange,
      outputRange: outputRange,
    })
  }

  start (toValue, duration) {
    return new Promise((resolve, reject) =>
      Animated.timing(this.value, {
        toValue: toValue,
        duration: duration,
        easing: Easing.cubic,
      }).start(resolve)
    )
  }

  fast (toValue) {
    return this.start(toValue, 100)
  }

  medium (toValue) {
    return this.start(toValue, 300)
  }

  slow (toValue) {
    return this.start(toValue, 1000)
  }

  continuous (value) {
    value.setValue(0)
    return new Promise((resolve, reject) =>
      Animated.timing(this.value, {
        toValue: 1,
        duration: 15000,
        easing: Easing.linear,
      }).start(() => this.continuous(value))
    )
  }
}

module.exports = Animation

import React, { Component } from 'react'
import {
  View,
  Text,
  Button,
  AsyncStorage,
  Share,
} from 'react-native'
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm'

const MessageBar = require('./message-bar')

module.exports = React.createClass({
  componentDidMount () {
    this.syncFCMToken()
    this.listenToNotifications()
    this.listenToTokenRefresh()
  },
  componentWillUnmount () {
    this.notificationListener.remove()
    this.refreshTokenListener.remove()
  },
  getInitialState() {
    return {}
  },
  syncFCMToken () {
    AsyncStorage.getItem('token', (token) => {
      if (!token) {
        try {
          FCM.getFCMToken().then(token => {
            AsyncStorage.setItem('token', token)
            this.registerTokenOnServer(token)
          })
        } catch (e) {
          this.setState({message: {type: 'error', body: e.message}})
        }
      }
    })
  },
  registerTokenOnServer (token) {
    var url = global.domain + 'api/v1/devices'
    var t = new Date()
    var data = {os: global.platform, token: token}

    global.db.log('TOKEN: ' + url + ' => ' + JSON.stringify(data))
    fetch(url, {
      method: 'POST',
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
      .then(() => global.db.log('TOKEN: ' + (new Date() - t)/1000 + ' seconds'))
      .catch((e) => global.db.log('TOKEN: ERROR: ' + e))
  },
  listenToNotifications () {
    this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
      if(notif.local_notification){}
      if(notif.opened_from_tray){}
    })
  },
  listenToTokenRefresh () {
    this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token) => {})
  },
  sendLocalNotification (notif) {
    FCM.presentLocalNotification({
      id: "UNIQ_ID_STRING",
      title: "My Notification Title",
      body: "My Notification Message",
      sound: "default",
      priority: "high",
      click_action: "ACTION",
      badge: 10,
      number: 10,
      ticker: "My Notification Ticker",
      auto_cancel: true,
      large_icon: "ic_launcher",
      icon: "ic_launcher",
      big_text: "Show when notification is expanded",
      sub_text: "This is a subText",
      color: "red",
      vibrate: 300,
      tag: 'some_tag',
      group: "group",
      my_custom_data: 'my_custom_field_value',
      lights: true,
      show_in_foreground: true,
    })
  },
  render () {
    return <MessageBar message={this.state.message}/>
  }
})

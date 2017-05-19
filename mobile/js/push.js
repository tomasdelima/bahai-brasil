import React, { Component } from 'react'
import {
  View,
  Text,
  Button,
  AsyncStorage,
  Share,
} from 'react-native'
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm'

module.exports = React.createClass({
  componentDidMount () {
    FCM.requestPermissions() // for iOS
    this.syncFCMToken()
    this.listenToNotifications()
    this.listenToTokenRefresh()
  },
  syncFCMToken () {
    AsyncStorage.getItem('token', (token) => {
      if (!token) {
        FCM.getFCMToken().then(token => {
          AsyncStorage.setItem('token', token)
          this.registerTokenOnServer(token)
        })
      }
    })
  },
  registerTokenOnServer (token) {
    var url = global.domain + 'api/v1/devices'
    var t = new Date()
    var data = {os: 'android', token: token}

    if (global.db.shouldLog) console.log('TOKEN: ' + url + ' => ' + JSON.stringify(data))
    fetch(url, {
      method: 'POST',
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
      .then(() => { if (global.db.shouldLog) console.log('TOKEN: ' + (new Date() - t)/1000 + ' seconds') })
      .catch((e) => console.log('TOKEN: ERROR: ' + e))
  },
  listenToNotifications () {
    this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
      // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
      if(notif.local_notification){
        //this is a local notification
      }
      if(notif.opened_from_tray){
        //app is open/resumed because user clicked banner
      }

      // if(Platform.OS ==='ios'){
      //   //optional
      //   //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link.
      //   //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
      //   //notif._notificationType is available for iOS platfrom
      //   switch(notif._notificationType){
      //   case NotificationType.Remote:
      //     notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
      //     break
      //   case NotificationType.NotificationResponse:
      //     notif.finish()
      //     break
      //   case NotificationType.WillPresent:
      //     notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
      //     break
      //   }
      // }
    })
  },
  listenToTokenRefresh () {
    this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token) => {
      // fcm token may not be available on first load, catch it here
    })
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
  componentWillUnmount () {
    this.notificationListener.remove()
    this.refreshTokenListener.remove()
  },
  otherMethods (){
    FCM.subscribeToTopic('/topics/foo-bar')
    FCM.unsubscribeFromTopic('/topics/foo-bar')
    FCM.getInitialNotification().then(notif=>console.log(notif))
    FCM.presentLocalNotification({
      id: "UNIQ_ID_STRING",                               // (optional for instant notification)
      title: "My Notification Title",                     // as FCM payload
      body: "My Notification Message",                    // as FCM payload (required)
      sound: "default",                                   // as FCM payload
      priority: "high",                                   // as FCM payload
      click_action: "ACTION",                             // as FCM payload
      badge: 10,                                          // as FCM payload IOS only, set 0 to clear badges
      number: 10,                                         // Android only
      ticker: "My Notification Ticker",                   // Android only
      auto_cancel: true,                                  // Android only (default true)
      large_icon: "ic_launcher",                           // Android only
      icon: "ic_launcher",                                // as FCM payload, you can relace this with custom icon you put in mipmap
      big_text: "Show when notification is expanded",     // Android only
      sub_text: "This is a subText",                      // Android only
      color: "red",                                       // Android only
      vibrate: 300,                                       // Android only default: 300, no vibration if you pass null
      tag: 'some_tag',                                    // Android only
      group: "group",                                     // Android only
      my_custom_data:'my_custom_field_value',             // extra data you want to throw
      lights: true,                                       // Android only, LED blinking (default false)
      show_in_foreground                                  // notification when app is in foreground (local & remote)
    })

    FCM.scheduleLocalNotification({
      fire_date: new Date().getTime(),      //RN's converter is used, accept epoch time and whatever that converter supports
      id: "UNIQ_ID_STRING",    //REQUIRED! this is what you use to lookup and delete notification. In android notification with same ID will override each other
      body: "from future past",
      repeat_interval: "week" //day, hour
    })

    FCM.getScheduledLocalNotifications().then(notif=>console.log(notif))

    //these clears notification from notification center/tray
    FCM.removeAllDeliveredNotifications()
    FCM.removeDeliveredNotification("UNIQ_ID_STRING")

    //these removes future local notifications
    FCM.cancelAllLocalNotifications()
    FCM.cancelLocalNotification("UNIQ_ID_STRING")

    FCM.setBadgeNumber(1);                                       // iOS only and there's no way to set it in Android, yet.
    FCM.getBadgeNumber().then(number=>console.log(number));     // iOS only and there's no way to get it in Android, yet.
    FCM.send('984XXXXXXXXX', {
      my_custom_data_1: 'my_custom_field_value_1',
      my_custom_data_2: 'my_custom_field_value_2'
    })
  },
  render () {
    return <Button title="send a local" onPress={this.sendLocalNotification}/>
  }
})

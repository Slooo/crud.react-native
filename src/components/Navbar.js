import React from 'react'
import {View, StyleSheet, Platform} from 'react-native'
import {THEME} from '../theme'
import {AppText} from './ui/AppText'

export const Navbar = props => (
  <View
    style={{...styles.navbar, ...Platform.select({
      ios: styles.navbarIOS,
      android: styles.navbarAndroid
    })}}
  >
    <AppText type="bold" style={styles.text}>{props.title}</AppText>
  </View>
)

const styles = StyleSheet.create({
  navbar: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 10
  },
  navbarAndroid: {
    backgroundColor: THEME.MAIN_COLOR,
  },
  navbarIOS: {
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 1
  },
  text: {
    color: Platform.OS === 'ios' ? THEME.WHITE_COLOR : '#fff',
    fontSize: 20
  }
})

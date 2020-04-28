import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {THEME} from '../theme'

export const Navbar = props => (
  <View style={styles.navbar}>
    <Text style={styles.text}>{props.title}</Text>
  </View>
)

const styles = StyleSheet.create({
  navbar: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 70,
    backgroundColor: THEME.MAIN_COLOR,
    paddingBottom: 10
  },
  text: {
    color: THEME.WHITE_COLOR,
    fontSize: 20
  }
})

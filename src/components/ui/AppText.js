import React from 'react'
import {Text, StyleSheet} from 'react-native'

export const AppText = props => (
  <Text
    style={props.type === 'bold'
      ? {...styles.bold, ...props.style}
      : {...styles.regular, ...props.style}}
  >
    {props.children}
  </Text>
)

const styles = StyleSheet.create({
  regular: {
    fontFamily: 'roboto-regular'
  },
  bold: {
    fontFamily: 'roboto-bold'
  }
})

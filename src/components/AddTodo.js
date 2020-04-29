import React, {useState} from 'react'
import {View, TextInput, Alert, StyleSheet, Keyboard} from 'react-native'
import {AntDesign} from '@expo/vector-icons'


export const AddTodo = ({onSubmit}) => {
  const [value, setValue] = useState('')

  const pressHandler = () => {
    if (value.trim()) {
      onSubmit(value)
      setValue('')
      Keyboard.dismiss()
    } else {
      Alert.alert('Field is not empty')
    }
  }

  return (
    <View style={styles.block}>
      <TextInput
        style={styles.input}
        onChangeText={setValue}
        value={value}
        placeholder="Write text..."
        autoCorrect={false}
        // keyboardType="numeric"
        autoCapitalize="words"
      />
      <AntDesign.Button onPress={pressHandler} name="pluscircleo">
        Add
      </AntDesign.Button>
    </View>
  )
}

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  input: {
    width: '60%',
    padding: 10,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#3949ab',
  }
})

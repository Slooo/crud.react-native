import React from 'react'
import {Text, View, TouchableOpacity} from 'react-native'

export const Todo = ({todo, onRemove, onOpen}) => (
  <TouchableOpacity
    activeOpacity={0.1}
    onPress={() => onOpen(todo.id)}
    onLongPress={() => onRemove(todo.id)}
  >
    <View style={styles.todo}>
      <Text>{todo.title}</Text>
    </View>
  </TouchableOpacity>
)

const styles = {
  todo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 5,
    marginBottom: 10
  }
}

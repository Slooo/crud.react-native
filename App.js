import React, {useState} from 'react'
import {StyleSheet, View, Alert} from 'react-native'
import * as Font from 'expo-font'
import {AppLoading} from 'expo'

import {Navbar} from './src/components/Navbar'
import {MainScreen} from './src/screens/MainScreen'
import {TodoScreen} from './src/screens/TodoScreen'
import {THEME} from './src/theme'

async function loadApplication() {
  await Font.loadAsync({
    'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf')
  })
}

export default function App() {
  const [loading, setLoading] = useState(false)
  const [todoId, setTodoId] = useState(null)
  const [todos, setTodos] = useState([
    // {id: '1', title: 'Learn React native'},
    // {id: '2', title: 'Learn Angular'},
    // {id: '3', title: 'Learn nodeJS'},
  ])

  if (!loading) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onError={error => console.error(error)}
        onFinish={() => setLoading(true)}
      />
    )
  }

  const addTodo = (title) => {
    setTodos(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        title
      }
    ])
  }

  const removeTodo = id => {
    const todo = todos.find(t => t.id === id)
    Alert.alert(
      'Removing Todo',
      `You ready is removed ${todo.title}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => {
            setTodoId(null)
            setTodos(prev => prev.filter(t => t.id !== id))
          }
        }
      ],
      {cancelable: false}
    )
  }

  const updateTodo = ({id, title}) => {
    setTodos(prev => prev.map(todo => {
      if (todo.id === id) {
        todo.title = title
      }
      return todo
    }))
  }

  let content = (
    <MainScreen
      todos={todos}
      addTodo={addTodo}
      removeTodo={removeTodo}
      openTodo={setTodoId}
    />
  )

  if (todoId) {
    const selectedTodo = todos.find(t => t.id === todoId)
    content = (
      <TodoScreen
        goBack={() => setTodoId(null)}
        onRemove={removeTodo}
        onSave={updateTodo}
        todo={selectedTodo}/>
    )
  }

  return (
    <View>
      <Navbar title="Todo App"/>
      <View style={styles.container}>{content}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 20
  }
})

import React, {useReducer, useContext} from 'react'
import {Alert} from 'react-native'
import {TodoContext} from './todoContext'
import {todoReducer} from './todoReducer'
import {ADD_TODO, REMOVE_TODO, UPDATE_TODO} from '../constants'
import {ScreenContext} from '../screen/screenContext'


export const TodoState = ({children}) => {
  const initialState = {
    todos: [
      {id: '1', title: 'Learn React native'},
      {id: '2', title: 'Learn Angular'},
      {id: '3', title: 'Learn nodeJS'}
    ]
  }

  const {changeScreen} = useContext(ScreenContext)

  const addTodo = title => dispatch({type: ADD_TODO, title})

  const removeTodo = id => {
    const todo = state.todos.find(t => t.id === id)

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
            changeScreen(null)
            dispatch({type: REMOVE_TODO, id})
          }
        }
      ],
      {cancelable: false}
    )
  }

  const updateTodo = ({id, title}) => dispatch({type: UPDATE_TODO, id, title})

  const [state, dispatch] = useReducer(todoReducer, initialState)

  return (
    <TodoContext.Provider
      value={{
        addTodo,
        removeTodo,
        updateTodo,
        todos: state.todos
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}

import React, {useReducer, useContext} from 'react'
import {Alert} from 'react-native'
import {TodoContext} from './todoContext'
import {todoReducer} from './todoReducer'
import {
  ADD_TODO,
  CLEAR_ERROR,
  FETCH_TODOS,
  HIDE_LOADER,
  REMOVE_TODO,
  SHOW_ERROR,
  SHOW_LOADER,
  UPDATE_TODO
} from '../constants'
import {ScreenContext} from '../screen/screenContext'


export const TodoState = ({children}) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null
  }

  const {changeScreen} = useContext(ScreenContext)
  const [state, dispatch] = useReducer(todoReducer, initialState)

  const addTodo = async title => {
    const response = await fetch('https://react-native-todo-54c47.firebaseio.com/todos.json', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({title})
    })

    const data = await response.json()
    dispatch({type: ADD_TODO, title, id: data.name})
  }

  const fetchTodos = async () => {
    const response = await fetch('https://react-native-todo-54c47.firebaseio.com/todos.json', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })

    const data = await response.json()
    const todos = Object.keys(data).map(key => ({...data[key], id: key}))
    dispatch({type: FETCH_TODOS, todos})
  }

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

  const showLoader = () => dispatch({type: SHOW_LOADER})

  const hideLoader = () => dispatch({type: HIDE_LOADER})

  const showError = error => dispatch({type: SHOW_ERROR, error})

  const clearError = () => dispatch({type: CLEAR_ERROR})

  return (
    <TodoContext.Provider
      value={{
        addTodo,
        removeTodo,
        updateTodo,
        fetchTodos,
        todos: state.todos,
        loading: state.loading,
        error: state.error
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}

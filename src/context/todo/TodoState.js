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
import {Http} from '../../http'


export const TodoState = ({children}) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null
  }

  const {changeScreen} = useContext(ScreenContext)
  const [state, dispatch] = useReducer(todoReducer, initialState)

  const addTodo = async title => {
    clearError()
    try {
      const data = await Http.post('https://react-native-todo-54c47.firebaseio.com/todos.json', {title})
      dispatch({type: ADD_TODO, title, id: data.name})
    } catch (e) {
      showError('Some error...')
    }
  }

  const fetchTodos = async () => {
    clearError()
    showLoader()
    try {
      const data = await Http.get('https://react-native-todo-54c47.firebaseio.com/todos.json')
      const todos = Object.keys(data).map(key => ({...data[key], id: key}))
      dispatch({type: FETCH_TODOS, todos})
    } catch (e) {
      showError('Что то пошло не так')
      console.error(e)
    } finally {
      hideLoader()
    }
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
          onPress: async () => {
            changeScreen(null)
            try {
              await Http.delete(`https://react-native-todo-54c47.firebaseio.com/todos/${id}.json`)
              dispatch({type: REMOVE_TODO, id})
            } catch (e) {
              console.error('Some error...')
            }
          }
        }
      ],
      {cancelable: false}
    )
  }

  const updateTodo = async ({id, title}) => {
    clearError()
    showLoader()
    try {
      await Http.patch(`https://react-native-todo-54c47.firebaseio.com/todos/${id}.json`, {title})
      dispatch({type: UPDATE_TODO, title, id})
    } catch (e) {
      showError('Что то пошло не так')
      console.error(e)
    } finally {
      hideLoader()
    }
  }

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

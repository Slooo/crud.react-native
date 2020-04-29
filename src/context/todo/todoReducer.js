import {
  ADD_TODO, REMOVE_TODO, UPDATE_TODO,
  SHOW_ERROR, HIDE_ERROR, SHOW_LOADER,
  HIDE_LOADER, CLEAR_ERROR, FETCH_TODOS
} from '../constants'

const handlers = {
  [ADD_TODO]: (state, {id, title}) => ({
    ...state,
    todos: [
      ...state.todos,
      {
        id,
        title
      }
    ]
  }),
  [UPDATE_TODO]: (state, {id, title}) => ({
    ...state,
    todos: state.todos.map(todo => {
      if (todo.id === id) {
        todo.title = title
      }
      return todo
    }),
  }),
  [REMOVE_TODO]: (state, {id}) => ({
    ...state,
    todos: state.todos.filter(todo => todo.id !== id)
  }),
  [SHOW_LOADER]: state => ({...state, loading: true}),
  [HIDE_LOADER]: state => ({...state, loading: false}),
  [CLEAR_ERROR]: state => ({...state, error: null}),
  [SHOW_ERROR]: (state, {error}) => ({...state, error}),
  [FETCH_TODOS]: (state, {todos}) => ({...state, todos}),
  DEFAULT: state => state
}

export const todoReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}

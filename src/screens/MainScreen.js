import React, {useState, useEffect, useContext, useCallback} from 'react'
import {StyleSheet, View, FlatList, Image, Dimensions} from 'react-native'
import {AddTodo} from '../components/AddTodo'
import {Todo} from '../components/Todo'
import {THEME} from '../theme'
import {TodoContext} from '../context/todo/todoContext'
import {ScreenContext} from '../context/screen/screenContext'
import {AppLoader} from '../components/ui/AppLoader'
import {AppText} from '../components/ui/AppText'
import {AppButton} from '../components/ui/AppButton'


export const MainScreen = () => {
  const width = Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
  const {changeScreen} = useContext(ScreenContext)
  const [deviceWidth, setDeviceWidth] = useState(width)
  const {addTodo, todos, fetchTodos, loading, error, removeTodo} = useContext(TodoContext)

  // для ассинхронного подтягивания
  const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos])

  useEffect(() => {
    loadTodos()
  }, [])

  useEffect(() => {
    const update = () => {
      // высчитываем ширину при изменении ориентации
      const width = Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
      setDeviceWidth(width)
    }

    // При изменении ориентации экрана
    Dimensions.addEventListener('change', update)

    // Unmount
    return () => {
      Dimensions.removeEventListener('change', update)
    }
  })

  if (loading) {
    return <AppLoader/>
  }

  if (error) {
    return (
      <View style={styles.center}>
        <AppText style={styles.error}>{error}</AppText>
        <AppButton onPress={loadTodos}>Repeat</AppButton>
      </View>
    )
  }

  let content = (
    <View style={{deviceWidth}}>
      <FlatList
        data={todos}
        keyExtractor={(item => item.id.toString())}
        renderItem={({item}) => (
          <Todo
            onRemove={removeTodo}
            onOpen={() => changeScreen(item.id)}
            todo={item}
          />
        )}
      />
    </View>
  )

  if (!todos.length) {
    content = (
      <View style={styles.imageWrap}>
        <Image
          style={styles.img}
          source={require('../../assets/photo_2018-12-04_21-21-27.jpg')}
        />
      </View>
    )
  }

  return (
    <View>
      <AddTodo onSubmit={addTodo}/>
      {content}
    </View>
  )
}

const styles = StyleSheet.create({
  imageWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    height: 300
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  },
  error: {
    fontSize: 20,
    color: THEME.DANGER_COLOR
  }
})

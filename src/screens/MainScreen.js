import React, {useState, useEffect} from 'react'
import {StyleSheet, View, FlatList, Image, Dimensions} from 'react-native'
import {AddTodo} from '../components/AddTodo'
import {Todo} from '../components/Todo'
import {THEME} from '../theme'


export const MainScreen = ({addTodo, todos, openTodo, removeTodo}) => {
  const width = Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
  const [deviceWidth, setDeviceWidth] = useState(width)

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

  let content = (
    <View style={{deviceWidth}}>
      <FlatList
        data={todos}
        keyExtractor={(item => item.id.toString())}
        renderItem={({item}) => <Todo onRemove={removeTodo} onOpen={openTodo} todo={item}/>}
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
  }
})

import React from 'react'
import {StyleSheet, View, FlatList, Image} from 'react-native'
import {AddTodo} from '../components/AddTodo'
import {Todo} from '../components/Todo'


export const MainScreen = ({addTodo, todos, openTodo, removeTodo}) => {
  let content = (
    <FlatList
      data={todos}
      keyExtractor={(item => item.id.toString())}
      renderItem={({item}) => <Todo onRemove={removeTodo} onOpen={openTodo} todo={item}/>}
    />
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

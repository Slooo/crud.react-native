import React, {useState} from 'react'
import {StyleSheet, View, Text, Button} from 'react-native'
import {THEME} from '../theme'
import {AppCard} from '../components/ui/AppCard'
import {EditModal} from '../components/EditModal'


export const TodoScreen = ({goBack, todo, onRemove, onSave}) => {
  const [modal, openModal] = useState(false)

  const saveHandler = title => {
    onSave({id: todo.id, title})
    openModal(false)
  }

  return (
    <View style={styles.card}>
      <EditModal
        value={todo.title}
        visible={modal}
        onCancel={() => openModal(false)}
        onSave={saveHandler}
      />

      <Text>Todo screen</Text>
      <AppCard>
        <Text style={styles.text}>{todo.title}</Text>
        <Button title="Edit" onPress={() => openModal(true)}/>
      </AppCard>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button title="Back" color={THEME.GREY_COLOR} onPress={goBack}/>
        </View>
        <View style={styles.button}>
          <Button title="Delete" color={THEME.DANGER_COLOR} onPress={() => onRemove(todo.id)}/>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  card: {
    marginBottom: 20
  },
  button: {
    width: '40%'
  },
  text: {
    fontSize: 20
  }
})

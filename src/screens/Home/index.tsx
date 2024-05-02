import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList, Alert } from "react-native";
import { styles } from "./styles";
import { Participant } from "../../components/Participant";
import { useState } from "react";

export function Home(){
  const [newParticipant, setNewParticipant] = useState('')
  const [participants, setParticipants] = useState<string[]>([])


  function handleParticipantAdd() {
    setParticipants(state => [...state, newParticipant])
    setNewParticipant('')
  }

  function handleParticipantRemove(name: string) {
    


    Alert.alert('Remover participante', `Remover o(a) participante ${name}?`, [
      {
        text: 'Sim',
        onPress: () => setParticipants(state => state.filter(participant => participant !== name))
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ])
  }

  return (
    <View style={ styles.container }>
      <Text style={ styles.eventName } >Nome do Evento</Text>
      <Text style={ styles.eventDate } >Sexta, 4 de Novembro de 2024</Text>

      <View style={styles.form}>
        <TextInput 
          style={styles.input} 
          placeholder="Digite o nome do participante" 
          placeholderTextColor="#6b6b6b"
          onChangeText={setNewParticipant}
          value={newParticipant}
        />

        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        data={participants}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({ item }) => (
          <Participant
            name={item} 
            onRemove={() => handleParticipantRemove(item)} 
        />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmpty}>
            Ninguém chegou no evento ainda? Adicione participantes a sua lista de presença.
          </Text>
        )}
      />

    </View>
  )
}
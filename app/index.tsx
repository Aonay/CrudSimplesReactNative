import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { selectUsuarios, insertUsuario } from '../db/database';
import { useEffect, useState } from 'react';

export default function Index(){

   const [usuarios, setUsuarios] = useState([])
   const [nome, setNome] = useState('')
   const [email, setEmail] = useState('')


   async function exibirUsuarios() {
      const dados = await selectUsuarios()
      setUsuarios(dados)
   }

   async function cadastrarUsuario() {
      await insertUsuario(nome,email)
      await exibirUsuarios()
      setNome("")
      setEmail("")
      
   }

   useEffect(()=>{
      exibirUsuarios()
   },[])

   return(
      <View style={styles.container}>
         <Text style={styles.titleText}>Cadastrar</Text>
            <TextInput
               style={styles.input}
               value={nome}
               onChangeText={setNome}
               placeholder='insira o nome'
            />
            <TextInput
               style={styles.input}
               value={email}
               onChangeText={setEmail}
               placeholder='insira o email'
            />

            <TouchableOpacity onPress={cadastrarUsuario} style={styles.button}>
               <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
            
         <Text style={styles.titleText}>Lista de Usuarios</Text>
         <FlatList 
            data={usuarios}
            keyExtractor={item => item.id}
            renderItem={({item})=>
            <View style={styles.card}>
               <Text>Nome: {item.nome}  </Text>
               <Text>Email: {item.email}</Text>
            </View>
            }
         />
      </View>
   )
}

const styles = StyleSheet.create({
   container:{
      flex: 1,                  // ocupa toda a tela
      backgroundColor: '#F3F4F6', // fundo claro e suave
      paddingHorizontal: 16,    // espaçamento nas laterais
      paddingTop: 24,           // espaçamento no topo

   },
   input:{
    height: 48,
    borderColor: '#ccc',        // cor da borda
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#fff',    // fundo branco
    color: '#333',              // cor do texto
    marginVertical: 8,
   },
   card: {
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      // sombra para iOS
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 3 },
      // sombra para Android
      elevation: 4,
   },
   button: {
      backgroundColor: '#2563EB',   // azul vibrante
      paddingVertical: 14,
      paddingHorizontal: 24,
      borderRadius: 8,
      alignItems: 'center',
      marginVertical: 10,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
      elevation: 3,                 // sombra para Android
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
    titleText: {
      color: '#000',
      fontSize: 16,
      fontWeight: '600',
    },
})


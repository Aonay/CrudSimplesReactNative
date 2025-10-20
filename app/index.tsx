import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { selectUsuarios, insertUsuario, deleteUsuario, updateUsuario } from '../db/database';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {

   const [usuarios, setUsuarios] = useState([])
   const [nome, setNome] = useState('')
   const [email, setEmail] = useState('')

   const [modoEdicao, setModoEdicao] = useState(false)
   const [idEditando, setIdEditando] = useState<number | null>(null)


   async function exibirUsuarios() {
      const dados = await selectUsuarios()
      setUsuarios(dados)
   }

   async function cadastrarUsuario() {
      if (modoEdicao && idEditando !== null) {
         await updateUsuario(idEditando, nome, email)
      } else {
         await insertUsuario(nome, email)
      }
      setModoEdicao(false)
      setIdEditando(null)
      await exibirUsuarios()
      setNome("")
      setEmail("")

   }

   async function exluirUsuario(id: number) {
      await deleteUsuario(id)
      exibirUsuarios()
   }

   async function editarUsuario(item: any) {
      setModoEdicao(true)
      setIdEditando(item.id)
      setNome(item.nome)
      setEmail(item.email)

   }

   useEffect(() => {
      exibirUsuarios()
   }, [])

   return (
      <SafeAreaView style={styles.container}>
         <View style={styles.formContainer}>
            <Text style={styles.titleText}>
               {modoEdicao ? 'Editar Usuario' : 'Cadastrar Usuario'}
            </Text>
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
               <Text style={styles.buttonText}>
                  {modoEdicao ? 'Salvar Alterações' : 'Cadastrar'}
               </Text>
            </TouchableOpacity>
         </View>


         <Text style={styles.titleText}>Lista de Usuarios</Text>
         <FlatList
            data={usuarios}
            keyExtractor={item => item.id}
            renderItem={({ item }) =>
               <View style={styles.card}>
                  <Text>Nome: {item.nome}  </Text>
                  <Text>Email: {item.email}</Text>

                  <View style={styles.botoes}>

                     <TouchableOpacity
                        style={styles.btnEditar}
                        onPress={() => { editarUsuario(item) }}>
                        <Text style={styles.btnTexto}>Editar</Text>
                     </TouchableOpacity>

                     <TouchableOpacity
                        style={styles.btnExcluir}
                        onPress={() => exluirUsuario(item.id)}>
                        <Text style={styles.btnTexto}>Excluir</Text>
                     </TouchableOpacity>
                  </View>

               </View>
            }
         />
      </SafeAreaView>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,                  // ocupa toda a tela
      backgroundColor: '#F3F4F6', // fundo claro e suave
      paddingHorizontal: 16,    // espaçamento nas laterais
      paddingTop: 24,           // espaçamento no topo

   },
   formContainer: {
      width: "100%",
      backgroundColor: "#fff",
      padding: 20,
      borderRadius: 12,
      marginBottom: 20,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 10,
      elevation: 4,
   },

   input: {
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
      fontSize: 24,
      fontWeight: "bold",
      color: "#333",
      textAlign: "center",
      marginBottom: 20,
   },
   botoes: {
      flexDirection: "row",
      justifyContent: "flex-end",
   },
   btnEditar: {
      backgroundColor: "#FFC107",
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 8,
      marginRight: 8,
   },
   btnExcluir: {
      backgroundColor: "#DC3545",
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 8,
   },
   btnTexto: {
      color: "#fff",
      fontWeight: "bold",
   },
})


import { useState } from "react";
import { Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { selectUsuarios } from "../db/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function Login() {
    const [email, setEmail] = useState('');

    async function verificarLogin() {
        if (!email) {
            Alert.alert('Erro', 'Por favor, insira o email!');
            return;
        }

        const usuarios = await selectUsuarios();
        const user = usuarios.find((u: any) => u.email === email);

        if (user) {
            await AsyncStorage.setItem('usuarioLogado', JSON.stringify(user));
            router.replace('/usuario');
        } else {
            Alert.alert('Erro', 'Email inválido!');
        }
    }


    return (
        <SafeAreaView style={styles.container}>
            <Text>Area Restrita</Text>

            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                keyboardType="email-address"
            />

            <TouchableOpacity
                onPress={verificarLogin}>
                <Text >Login</Text>
            </TouchableOpacity>
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
})
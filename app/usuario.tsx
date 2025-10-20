import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";

export default function Usuario() {
    const [emailUsuario, setEmailUsuario] = useState('');
    async function verificarSessao() {
        const usuario = await AsyncStorage.getItem('usuarioLogado');

        if (!usuario) {
            router.replace('/login');
        }
        else {
            const usuarioObj = JSON.parse(usuario);
            setEmailUsuario(usuarioObj.email);
        }
    }

    useEffect(() => {
        verificarSessao();
    }, []);

    async function Sair() {
        await AsyncStorage.removeItem('usuarioLogado');
        router.replace('/login');

    }


    return (
        <View>
            <Text>{emailUsuario}</Text>
            <TouchableOpacity onPress={Sair}>
                <Text>Sair</Text>
            </TouchableOpacity>
        </View>
    )
}
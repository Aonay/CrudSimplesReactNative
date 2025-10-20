import * as SQLite from 'expo-sqlite';
import { Alert } from 'react-native';

export async function Database() {
  try {
    const db = await SQLite.openDatabaseAsync('sistema');
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS usuario (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL
      );

    `);
    console.log('Banco de dados inicializado com sucesso!');
  } catch (error) {
    console.error('Erro ao inicializar o banco:', error);
  }
}

export async function selectUsuarios() {
  try {
    const db = await SQLite.openDatabaseAsync('sistema');
    const resultados = await db.getAllAsync(`SELECT * FROM usuario`);
    return resultados;
  }
  catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return [];
  }
}

export async function insertUsuario(nome: string, email: string) {
  try {
    const db = await SQLite.openDatabaseAsync('sistema');

    if (!nome || !email) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos!');
      return;
    }

    await db.runAsync(`INSERT INTO usuario (nome, email) VALUES (?, ?)`, [nome, email]);
    Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
  }
  catch (error) {
    console.error('Erro ao salvar o usuário:', error);
    Alert.alert('Erro', 'Falha ao salvar o usuário.');
  }
}

export async function deleteUsuario(id: number) {
  try {
    const db = await SQLite.openDatabaseAsync('sistema');
    await db.runAsync(`DELETE FROM usuario WHERE id = ?`, [id]);
    Alert.alert('Sucesso', 'Usuário excluído com sucesso!');
  }
  catch (error) {
    console.error('Erro ao excluir o usuário:', error);
    Alert.alert('Erro', 'Falha ao excluir o usuário.');
  }
}

export async function updateUsuario(id: number, nome: string, email: string) {
  try {
    const db = await SQLite.openDatabaseAsync('sistema');

    if (!nome || !email) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    await db.runAsync(`UPDATE usuario SET nome = ?, email = ? WHERE id = ?`, [nome, email, id]);
    Alert.alert('Sucesso', 'Usuário atualizado com sucesso!');
  }
  catch (error) {
    console.error('Erro ao editar o usuário:', error);
    Alert.alert('Erro', 'Falha ao editar o usuário.');
  }
}
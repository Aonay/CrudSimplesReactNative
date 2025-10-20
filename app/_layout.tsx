import {Stack} from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';
import { useEffect } from 'react';
import { Database } from '../db/database';

export default function RootLayout(){
   useEffect(()=>{
      Database();
   },[])

   return(
      <SQLiteProvider databaseName='sistema.db'>
         <Stack screenOptions={{contentStyle:{backgroundColor:'#F9FAFB'}}}/>
      </SQLiteProvider>
      
   )
}
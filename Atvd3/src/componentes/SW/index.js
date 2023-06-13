import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import apiPersonagem from '../../services/apiPersonagem'; //para consumir a api do personagem
import apiCasa from '../../services/apiCasa'; //para consumir api do planeta
import { LinearGradient } from 'expo-linear-gradient';


export default function SW() {
    const [personaInput, setPersona] = useState('');
    const [personagem, setPersonagem] = useState(null);
    const [planeta, setPlaneta] = useState(null);

    async function handleBuscar() {
        try {
            //Pegando o Personagem e setando em 'response' e posteriormente em 'setPersonagem'
            const response  = await apiPersonagem.get(`people/?search=${personaInput}`);
            const res = response.data.results[0];
            console.log(res);
            
            //Pegando o Planeta do personagem e setando em 'resultado' e posteriormente em 'setPlaneta'
            const resultado  = await apiCasa.get(`${res.homeworld}`);
            const r = resultado.data;
            console.log(r)

            //Passando o Valor recebido pelo 'input', pegando o 'data'
            const { status, data} = response;
            console.log(data);

            if (status != 200 || data.erro) {
                console.log('Ocorreu um erro ao buscar os nomes no input.');
            } else {
                setPersonagem(res); //Para conseguir utilizar os dados de retorno do personagem
                setPlaneta(r); //Para conseguir utilizar os dados de retorno do planeta
            }
        } catch (error) {
            console.log('Ocorreu algum erro!');
        }
    };

    async function handleLimpar() {
        setPersona('');
        setPersonagem(null);
        setPlaneta(null);
    }
    
    
    return (
        <LinearGradient
          colors={['#fcb045', '#951dfd','#833ab4' ]}
          style={styles.linearGradient}
        >
        <View style={styles.container}>

            {!personagem &&
            <TextInput
                style={styles.input}
                onChangeText={setPersona}
                onSubmitEditing={handleBuscar}
                placeholder="Digite o Nome do Personagem que deseja procurar"
                placeholderTextColor="#2F48D4"
                value={personaInput}
            />}
        
            
            <TouchableOpacity
                style={styles.btn}
                activeOpacity={0.8}
                onPress={personagem ? handleLimpar : handleBuscar}>

                <Text style={styles.textoBotao}>
                    {personagem ? 'Limpar' : 'Buscar'}
                </Text>
            </TouchableOpacity>

            {personagem && (
                <View style={styles.campo}>
                    <Text>
                        <Text style={styles.texto}>Nome: </Text>
                        {personagem.name}
                    </Text>
                    
                    <Text>
                        <Text style={styles.texto}>Planeta de Origem: </Text>
                        {planeta.name}
                    </Text>

                    <Text>
                        <Text style={styles.texto}>Altura: </Text>
                        {personagem.height}
                        <Text>cm</Text>
                    </Text>
                    
                    <Text>
                        <Text style={styles.texto}>Cor dos olhos: </Text>
                        {personagem.eye_color}
                    </Text>

                    <Text>
                        <Text style={styles.texto}>Pele: </Text>
                        {personagem.skin_color}
                    </Text>
                </View>
            )}

        </View>
        </LinearGradient>
    );

}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        color:'white',
        flex: '1',
        padding: '20px',
        
      },

      titulo: {
        fontSize: '20px',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
      },

      input: {
        backgroundColor: '#FFF',
        borderRadius: '5px',
        color: '#2F48D4',
        fontSize: '16px',
        marginTop: '20px',
        width: '100%',
        height: '35px',
        padding: '10px',
      },

      btn: {
        alignItems: 'center',
        backgroundColor: '#1C1C1C',
        borderRadius: '5px',
        marginTop: '20px',
        padding: '8px',
        width: '100%',
      },

      textoBotao: {
        color: '#fff',
        fontSize: '18px',
        fontSeight: 'bold',
        textTransform: 'uppercase',
      },

      texto: {
        fontWeight: 'bold',
    },
    
    campo: {
        alignItems: 'left',
        marginTop: '15px',

      },
});
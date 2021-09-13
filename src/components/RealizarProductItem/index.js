import React, { useState, useEffect } from 'react'
import api from '../../services/api'

import { Text } from 'react-native'
import { Button, Block, Input, theme, View, Checkbox } from 'galio-framework';

import { Container, ProductImage, InfoContainer, ProductName } from './styles'

export default function RealizarProductItem({ product }) {

  const [treinorealizado, setTreinoRealizado] = useState([]);
  const [refreshing, setRefreshing]           = useState(false);
  const [disabled, setDisabled]               = useState(false);

  useEffect(() => {

    async function loadTreino() {

      const response = await api.get('/ficha-de-treino')

      const fichadetreino = response.data['data'][0]['id'];

      const treino_realizado = 
      {
        "ficha_de_treino_id": fichadetreino,
        "codigo_treino": product.codigo_treino
      }
      const response3 = await api.post('/consultar-treino-a-realizar/', treino_realizado)
      setTreinoRealizado(response3.data);
      // console.log(response3.data)
    }
    loadTreino();
  }, []);

  async function realizarExercicio() {

    const exerciciorealizado = 
    {
      "treino_realizado_id": treinorealizado.id,
      "treino_exercicio_id": product.exercicio_id.id,
      "status": "fin"
    };

    const response4 = await api.post('/realizar-exercicio/', exerciciorealizado)
    // console.log(response4)
  }

  return (
    <Container>
      <ProductImage
        // source={{ uri: product.url }}
      />
      <InfoContainer>
        <ProductName>{product.codigo_treino}</ProductName>
        <Text>Exercício: {product.exercicio_id.nome}</Text>
        <Text>Descrição: {product.exercicio_id.descricao}</Text>
        <Text>Aparelho: {product.exercicio_id.idaparelho}</Text>
        <Text>Agrupamento Muscular: {product.exercicio_id.idagrupamentomusc}</Text>
        <Text>Ordem: {product.ordem}</Text>
        <Text>Séries: {product.series}</Text>
        <Text>Repetições: {product.repeticoes}</Text>
        <Text>Tempo de Descanso: {product.tempodescansoseg}</Text>
        <Text>Observação: {product.observacao}{'\n'}</Text>
        {/* <Button
        color="success"
        round size="small"
        title="Todos Treinos"
        //onPress={() => navigation.navigate('TodosExerciciosScreen')}
      >
        Ok?
      </Button> */}
      <Checkbox 
        color="success" 
        label="Exercício Realizado?" 
        flexDirection="row" 
        labelStyle={{ fontWeight: 'bold' }}
        disabled={disabled}
        onChange={() => (
          realizarExercicio()
        )}
      />
      </InfoContainer>  
    </Container>
  );
}

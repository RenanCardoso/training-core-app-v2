import React, { useState, useEffect } from 'react'
import api from '../../services/api'

import { Text } from 'react-native'
import { Button, Block, Input, theme, View, Checkbox } from 'galio-framework';

import { Container, TreinoImage, InfoContainer, TreinoName } from './styles'

export default function RealizarTreinoItem({ treino }) {

  const [treinorealizado, setTreinoRealizado] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [disabled, setDisabled] = useState(false);

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
      // console.log(treino_realizado)
    }
    loadTreino();
  }, []);

  async function realizarExercicio() {

    const exerciciorealizado =
    {
      "treino_realizado_id": treinorealizado.id,
      "treino_exercicio_id": treino.exercicio_id.id,
      "status": "fin"
    };

    const response4 = await api.post('/realizar-exercicio/', exerciciorealizado)
    // console.log(response4)
  }

  return (
    <Container>
      <TreinoImage
      // source={{ uri: treino.url }}
      />
      <InfoContainer>
        <TreinoName>{treino.codigo_treino}</TreinoName>
        <Text>Exercício: {treino.exercicio_id.nome}</Text>
        <Text>Descrição: {treino.exercicio_id.descricao}</Text>
        <Text>Aparelho: {treino.exercicio_id.idaparelho}</Text>
        <Text>Agrupamento Muscular: {treino.exercicio_id.idagrupamentomusc}</Text>
        <Text>Ordem: {treino.ordem}</Text>
        <Text>Séries: {treino.series}</Text>
        <Text>Repetições: {treino.repeticoes}</Text>
        <Text>Tempo de Descanso: {treino.tempodescansoseg}</Text>
        <Text>Observação: {treino.observacao}{'\n'}</Text>

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

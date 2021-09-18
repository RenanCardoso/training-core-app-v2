import React from 'react'
import { Text } from 'react-native'

import { Container, TreinoImage, InfoContainer, TreinoName } from './styles'

export default function TreinoItem({ treino }) {
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
        <Text>Observação: {treino.observacao}</Text>
      </InfoContainer>  
    </Container>
  );
}

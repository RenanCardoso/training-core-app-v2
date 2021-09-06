import React from 'react'
import { Text } from 'react-native'

import { Container, ProductImage, InfoContainer, ProductName } from './styles'

export default function ProductItem({ product }) {
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
        <Text>Observação: {product.observacao}</Text>
      </InfoContainer>  
    </Container>
  );
}

import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, Dimensions, ScrollView, Alert, View } from 'react-native'
import PropTypes from 'prop-types'

import api from '../../services/api'
import { deleteUser } from '../../utils'

import { Container, Title, ButtonText, ProductList } from './styles'
import { Button, Block, Text, Input, theme } from 'galio-framework';
import { Icon, Product, Tabs } from '../../components/';
import { DataTable } from 'react-native-paper';

const { width } = Dimensions.get('screen');
import products from '../../constants/products';

export default function TodosExercicios() {
  const [qtdcodexercicios, setQtdCodExercicios] = useState([]);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const codexercicio = ['A', 'B', 'C', 'D', 'E', 'F'];
  const exercicioObj = [
    {
      "exerc_por_codigo": '',
      "exerc_por_codigo_obj": '',
      "codigo_treino": '',

      "nome_exercicio": '',
      "descricao_exercicio": '',
      "tempo_exercicio": '',

      "ordem": '',
      "series": '',
      "repeticoes": '',
      "tempo_descanso_seg": '',

      "agrumapamento_musc": '',
      "aparelho": '',

    }
  ];

  useEffect(() => {

    async function loadTodosExercicios() {

      const response = await api.get('/ficha-de-treino')

      let fichadetreino = response.data['data'][0]['id'];

      const response2 = await api.get('/ficha-de-treino/' + fichadetreino + '/cont-exercicio-por-codigo/')
      setQtdCodExercicios(response2.data);

      const response3 = await api.get('/ficha-de-treino/' + fichadetreino + '/exercicio-por-codigo/')
      setData(response3.data);
    }

    loadTodosExercicios();
  }, []);

  // lógica para loopar os exercícios por código (loopado o header da tabela)
  let treinoporcodigo = []
  for (let i = 0; i < qtdcodexercicios; i++) {

    exercicioObj['exerc_por_codigo']      = data[codexercicio[i]]
    exercicioObj['exerc_por_codigo_obj']  = data[codexercicio[i]][0]
    exercicioObj['codigo_treino']         = data[codexercicio[i]][0]['codigo_treino'],

    // console.log(exercicioObj['codigo_treino'])

    treinoporcodigo.push(
      <DataTable>
        <DataTable.Header style={styles.DataTableHeader}>
          <DataTable.Title><Text style={styles.text} p>Treino: </Text></DataTable.Title>
          <DataTable.Title><Text style={styles.text} p>{exercicioObj['codigo_treino'] != (undefined || null) ? exercicioObj['codigo_treino'] : ''}</Text></DataTable.Title>
          <View style={styles.fixToText}>
            <Button 
              color="success" 
              round size="small" 
              {...styles.fixToText}
              onPress={() => Alert.alert('Simple Button pressed')}  
            >Iniciar Treino</Button>
          </View>
        </DataTable.Header>
      </DataTable>
    )

    //aqui eu faço o loop da quantidade de exercícios por código. Ex: código(A) possui 3 exercícios (loopado o body da tabela)
    for (let k = 0; k < exercicioObj['exerc_por_codigo'].length; k++) {

      exercicioObj['nome_exercicio']      = data[codexercicio[i]][0]['exercicio_id']['nome'],
      exercicioObj['descricao_exercicio'] = data[codexercicio[i]][0]['exercicio_id']['descricao'],
      exercicioObj['tempo_exercicio']     = data[codexercicio[i]][0]['exercicio_id']['tempoexercicio'],

      exercicioObj['ordem']               = data[codexercicio[i]][0]['ordem'],
      exercicioObj['series']              = data[codexercicio[i]][0]['series'],
      exercicioObj['repeticoes']          = data[codexercicio[i]][0]['repeticoes'],
      exercicioObj['tempo_descanso_seg']  = data[codexercicio[i]][0]['tempo_descanso_seg'],

      exercicioObj['agrumapamento_musc']  = data[codexercicio[i]][0]['exercicio_id']['idagrupamentomusc']['nome'],
      exercicioObj['aparelho']            = data[codexercicio[i]][0]['exercicio_id']['idaparelho']['nome'],



      treinoporcodigo.push(

        <DataTable style={styles.DataTable}>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Agrupamento Muscular: </Text></DataTable.Cell>
            <DataTable.Cell><Text style={styles.text}>{exercicioObj['agrumapamento_musc'] != (undefined || null) ? exercicioObj['agrumapamento_musc'] : ''}  </Text></DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Exercício:  </Text></DataTable.Cell>
            <DataTable.Cell><Text style={styles.text}>{exercicioObj['nome_exercicio'] != (undefined || null) ? exercicioObj['nome_exercicio'] : ''}  </Text></DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Aparelho: </Text></DataTable.Cell>
            <DataTable.Cell><Text style={styles.text}>{exercicioObj['aparelho'] != (undefined || null) ? exercicioObj['aparelho'] : ''}  </Text></DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Descrição: </Text></DataTable.Cell>
            <DataTable.Cell><Text style={styles.text}>{exercicioObj['descricao_exercicio'] != (undefined || null) ? exercicioObj['descricao_exercicio'] : ''}  </Text></DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Tempo de Descanso: </Text></DataTable.Cell>
            <DataTable.Cell><Text style={styles.text}>{exercicioObj['tempo_exercicio'] != (undefined || null) ? exercicioObj['tempo_exercicio'] : ''}  </Text></DataTable.Cell>
          </DataTable.Row>

          {/* <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Ordem: </Text></DataTable.Cell>
            <DataTable.Cell><Text style={styles.text}>{exercicioObj['ordem'] != (undefined || null) ? exercicioObj['ordem'] : ''}  </Text></DataTable.Cell>
          </DataTable.Row> */}

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Séries: </Text></DataTable.Cell>
            <DataTable.Cell><Text style={styles.text}>{exercicioObj['series'] != (undefined || null) ? exercicioObj['series'] : ''}  </Text></DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Repetições: </Text></DataTable.Cell>
            <DataTable.Cell><Text style={styles.text}>{exercicioObj['repeticoes'] != (undefined || null) ? exercicioObj['repeticoes'] : ''}  </Text></DataTable.Cell>
          </DataTable.Row>

          {/* <DataTable.Pagination
          page={page}
          numberOfPages={3}
          onPageChange={(page) => setPage(page)}
          label="1-2 of 6"
          optionsPerPage={optionsPerPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          showFastPagination
          optionsLabel={'Rows per page'}
          /> */}

        </DataTable >
      )
    }
  }

  return (
    <Container style={styles.DataTable}>
      <ScrollView>
        {treinoporcodigo}
        {/* <Text>Sair</Text> */}

      </ScrollView>
    </Container>
  );


}

TodosExercicios.navigationOptions = ({ navigation }) => {

  return {
    title: 'TodosExercicios',
    headerBackTitleVisible: true,
    headerRight: () => (
      <TouchableOpacity
        onPress={() => (
          deleteUser().then(() => {
            navigation.navigate('AuthLoading')
          })
        )}
        style={{ marginRight: 10 }}
      >
        <Text>Sair</Text>
      </TouchableOpacity>
    ),
  };

};

TodosExercicios.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
  }).isRequired,
};

const styles = StyleSheet.create({
  TodosExercicios: {
    width: width,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
    zIndex: 2,
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.50,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '300'
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
  },
  products: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
  },
  DataTableHeader: {
    backgroundColor: '#3c4b64',
    margin: 10
  },
  DataTable: {
    marginBottom: 2,
    backgroundColor: '#45546c',
  },
  text: {
    color: "#ffffff"
  },
  textTitulo: {
    marginLeft: 5 
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -5
  },
});

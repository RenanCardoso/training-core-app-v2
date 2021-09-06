import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, Dimensions, ScrollView, Alert, View } from 'react-native'
import PropTypes, { number } from 'prop-types'

import api from '../../services/api'
import { deleteUser } from '../../utils'

import { Container, Title, ButtonText, ProductList } from './styles'
import { Button, Block, Text, Input, theme } from 'galio-framework';
import { Icon, Product, Tabs } from '../../components/';
import { DataTable } from 'react-native-paper';

const { width } = Dimensions.get('screen');
import products from '../../constants/products';

export default function TodosExercicios() {
  const [qtdexercicios, setQtdExercicios]       = useState([]);
  const [qtdcodexercicios, setQtdCodExercicios] = useState(0);
  const [data, setData]                         = useState([]);
  const [treino, setTreino]                     = useState([]);
  const [treinos, setTreinos]                   = useState([]);
  const [exercicios, setExercicios]             = useState([]);
  const [agrupamentos_musc, setAgrupMusc]       = useState([]);
  const [aparelhos, setAparelho]                = useState([]);
  const [refreshing, setRefreshing]             = useState(false);

  const codexercicio = ['A', 'B', 'C', 'D', 'E', 'F'];

  useEffect(() => {

    async function loadTodosExercicios() {

      const response = await api.get('/ficha-de-treino')

      const fichadetreino = response.data['data'][0]['id'];

      const response2 = await api.get('/ficha-de-treino/' + fichadetreino + '/cont-total-exercicio-por-codigo/')
      setQtdCodExercicios(response2.data);

      const response3 = await api.get('/ficha-de-treino/' + fichadetreino + '/cont-exercicio-por-codigo/')
      setQtdExercicios(response3.data);


      setInterval(async () => {
        const response4 = await api.get('/ficha-de-treino/' + fichadetreino + '/exercicio-por-codigo/')
        setData(response4.data);

      }, 3000);


      console.log(data)
      

      // setExercicio(response4.data['exercicio_id']);
      // setAgrupMusc(response4.data['exercicio_id']['idagrupamentomusc']);
      // setAparelho(response4.data['exercicio_id']['idaparelho']);

      // lógica para loopar os exercícios por código (loopado o header da tabela)
      for (let i = 0; i < qtdcodexercicios; i++) {

        //aqui eu faço o loop da quantidade de exercícios por código. Ex: código(A) possui 3 exercícios (loopado o body da tabela)
        for (let k = 0; k < qtdexercicios[codexercicio[i]]; k++) {

          // treino[k]                     = data[codexercicio[i]]
          // treinos[k]                    = data[codexercicio[i]][0]
          // exercicios[k]                 = data[codexercicio[i]][0]['exercicio_id']
          // agrupamentos_musc[k]          = data[codexercicio[i]][0]['exercicio_id']['idagrupamentomusc']
          // aparelhos[k]                  = data[codexercicio[i]][0]['exercicio_id']['idaparelho']
          
          // setTreino(treino[k]);
          // setTreinos(treinos[k]);
          // setExercicios(exercicios[k]);
          // setAgrupMusc(agrupamentos_musc[k]);
          // setAparelho(aparelhos[k]);
        }
      }
    }

    loadTodosExercicios();
  }, []);

  // lógica para loopar os exercícios por código (loopado o header da tabela)
  let treinoporcodigo = []
  let treinosporcodigo = []
  let exerciciosporcodigo = []
  let agrupamentos_muscporcodigo = []
  let aparelhosporcodigo = []

  let contexercicios = 0;

  let totalexercicios = 0;
  for (let i = 0; i < qtdcodexercicios; i++) {
    totalexercicios += qtdexercicios[codexercicio[i]] 
  }

  for (let i = 0; i < qtdcodexercicios; i++) {

    treinoporcodigo.push(
        <DataTable.Header style={styles.DataTableHeader}>
          <DataTable.Title><Text style={styles.text} p>Treino: </Text></DataTable.Title>
          <DataTable.Title><Text style={styles.text} p>{codexercicio[i] != (undefined || null) ? codexercicio[i] : ''}</Text></DataTable.Title>
          <View style={styles.fixToText}>
            <Button
              color="success"
              round size="small"
              {...styles.fixToText}
              onPress={() => Alert.alert('Simple Button pressed')}
            >Iniciar Treino</Button>
          </View>
        </DataTable.Header>
    )

  // const numbers = [1, 2, 3, 4, 5];
  // const doubled = numbers.map((number) => number);
  // console.log(doubled);

    //aqui eu faço o loop da quantidade de exercícios por código. Ex: código(A) possui 3 exercícios (loopado o body da tabela)
    for (let k = 0; k < qtdexercicios[codexercicio[i]]; k++) {

      // console.log(data[contexercicios]['codigo_treino'])
      // treinosporcodigo[contexercicios]        = data[contexercicios]
      // exerciciosporcodigo[contexercicios]         = data[contexercicios]['exercicio_id']
      // agrupamentos_muscporcodigo[i][k]  = data[codexercicio[i]][0]['exercicio_id']['idagrupamentomusc']
      // aparelhosporcodigo[i][k]          = data[codexercicio[i]][0]['exercicio_id']['idaparelho']

      treinoporcodigo.push(

        <DataTable style={styles.DataTable}>
          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Agrupamento Muscular: </Text></DataTable.Cell>
            <DataTable.Cell><Text style={styles.text}>{data[contexercicios]['exercicio_id']['idagrupamentomusc']['nome'] != (undefined || null) ? data[contexercicios]['exercicio_id']['idagrupamentomusc']['nome'] : ''}  </Text></DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Exercício:  </Text></DataTable.Cell>
            <DataTable.Cell><Text style={styles.text}>{data[contexercicios]['exercicio_id']['nome'] != (undefined || null) ? data[contexercicios]['exercicio_id']['nome'] : ''}  </Text></DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Aparelho: </Text></DataTable.Cell>
            <DataTable.Cell><Text style={styles.text}>{data[contexercicios]['exercicio_id']['idagrupamentomusc']['nome'] != (undefined || null) ? data[contexercicios]['exercicio_id']['idagrupamentomusc']['nome'] : ''}  </Text></DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Descrição: </Text></DataTable.Cell>
            <DataTable.Cell><Text style={styles.text}>{data[contexercicios]['exercicio_id']['descricao'] != (undefined || null) ? data[contexercicios]['exercicio_id']['descricao'] : ''}  </Text></DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Tempo de Descanso: </Text></DataTable.Cell>
            <DataTable.Cell><Text style={styles.text}>{data[contexercicios]['tempodescansoseg'] != (undefined || null) ? data[contexercicios]['tempodescansoseg'] : ''}  </Text></DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Ordem: </Text></DataTable.Cell>
            <DataTable.Cell><Text style={styles.text}>{data[contexercicios]['ordem'] != (undefined || null) ? data[contexercicios]['ordem'] : ''}  </Text></DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Séries: </Text></DataTable.Cell>
            <DataTable.Cell><Text style={styles.text}>{data[contexercicios]['series'] != (undefined || null) ? data[contexercicios]['series'] : ''}  </Text></DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Repetições: </Text></DataTable.Cell>
            <DataTable.Cell><Text style={styles.text}>{data[contexercicios]['repeticoes'] != (undefined || null) ? data[contexercicios]['repeticoes'] : ''}  </Text></DataTable.Cell>
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
      contexercicios++;
    }
  }


  return (
    <Container style={styles.container}>
      <ScrollView>
        {treinoporcodigo}
        {/* <Text>AA</Text> */}
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
    borderWidth: 2,
    borderColor: '#3c4b64',
    borderBottomColor: '#ffffff',
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
  container: {
    backgroundColor: '#45546c',
  }
});

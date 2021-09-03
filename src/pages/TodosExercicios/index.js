import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native'
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

  const [
    exercicioObj = [
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
  ], setExercicioObj] = useState([]);

  const codexercicio = ['A', 'B', 'C', 'D', 'E', 'F'];
  const exerciciocod = [];

  useEffect(() => {

    async function loadTodosExercicios() {

      const response = await api.get('/ficha-de-treino')

      let fichadetreino = response.data['data'][0]['id'];

      const response2 = await api.get('/ficha-de-treino/' + fichadetreino + '/cont-exercicio-por-codigo/')
      setQtdCodExercicios(response2.data);

      const response3 = await api.get('/ficha-de-treino/' + fichadetreino + '/exercicio-por-codigo/')
      setData(response3.data);

      // console.log(response3.data)

      // lógica para loopar os exercícios por código
      for (let i = 0; i < qtdcodexercicios; i++) {

        exercicioObj[i]['exerc_por_codigo']      = data[codexercicio[i]],
        exercicioObj[i]['exerc_por_codigo_obj']  = data[codexercicio[i]][0]

        //aqui eu faço o loop da quantidade de exercícios por código. Ex: código(A) possui 3 exercícios
        for (let k = 0; k < exercicioObj[i]['exerc_por_codigo'].length; k++) {

          exercicioObj[i]['codigo_treino']       = data[codexercicio[i]][0]['codigo_treino'],
          exercicioObj[i]['nome_exercicio']      = data[codexercicio[i]][0]['exercicio_id']['nome'],
          exercicioObj[i]['descricao_exercicio'] = data[codexercicio[i]][0]['exercicio_id']['descricao'],
          exercicioObj[i]['tempo_exercicio']     = data[codexercicio[i]][0]['exercicio_id']['tempoexercicio'],

          exercicioObj[i]['ordem']               = data[codexercicio[i]][0]['ordem'],
          exercicioObj[i]['series']              = data[codexercicio[i]][0]['series'],
          exercicioObj[i]['repeticoes']          = data[codexercicio[i]][0]['repeticoes'],
          exercicioObj[i]['tempo_descanso_seg']  = data[codexercicio[i]][0]['tempo_descanso_seg'],

          exercicioObj[i]['agrumapamento_musc']  = data[codexercicio[i]][0]['exercicio_id']['idagrupamentomusc']['nome'],
          exercicioObj[i]['aparelho']            = data[codexercicio[i]][0]['exercicio_id']['idaparelho']['nome'],

          console.log(exercicioObj[i])
          // exerciciocod.push(ExercPorCod(exercicioObj[i]));
          setExercicioObj(exercicioObj[i])
        }
      }
    }

    loadTodosExercicios();
  }, []);

  function ExercPorCod(exercicioObj) {

    return (
      <ScrollView>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title><Text style={styles.text} p>Código: </Text></DataTable.Title>
            <DataTable.Title>{exercicioObj['exerc_por_codigo'] != (undefined || null) ? exercicioObj['exerc_por_codigo'] : ''}</DataTable.Title>
          </DataTable.Header>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Descrição </Text></DataTable.Cell>
            {/* <DataTable.Cell>{data['descricao'] != (undefined || null) ? data['descricao'] : ''}</DataTable.Cell> */}
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

        </DataTable>

      </ScrollView>
    )
  }

  return (
    <Container>
      {/* {exerciciocod} */}
      <ExercPorCod />
      {/* {console.log(exerciciocod)} */}
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
});

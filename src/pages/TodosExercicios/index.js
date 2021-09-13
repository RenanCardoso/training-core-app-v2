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

import ProductItem from '../../components/ProductItem'


export default function TodosExercicios({ navigation }) {
  const [qtdexercicios, setQtdExercicios]       = useState([]);
  const [qtdcodexercicios, setQtdCodExercicios] = useState(0);
  const [data, setData]                         = useState([]);
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

      const response4 = await api.get('/ficha-de-treino/' + fichadetreino + '/exercicio-por-codigo/')
      setData(response4.data.treinos);
    }

    loadTodosExercicios();
  }, []);

  // lógica para loopar os exercícios por código (loopado o header da tabela)
  let treinoporcodigo = []

  for (let i = 0; i < qtdcodexercicios; i++) {

    treinoporcodigo.push(
        <DataTable.Header style={styles.DataTableHeader}>
          <DataTable.Title><Text style={styles.text} p>Cód Agrupamento: </Text></DataTable.Title>
          <DataTable.Title style={styles.textTitulo}><Text style={styles.text} p>{codexercicio[i] != (undefined || null) ? codexercicio[i] : ''}</Text></DataTable.Title>
          <View style={styles.fixToText}>
            <Button
              color="success"
              round size="small"
              title="Iniciar Treino"
              onPress={() => navigation.navigate('RealizarExercicios')}
              >Iniciar Treino
            </Button>
          </View>
        </DataTable.Header>
    )
  }

  var renderListItem = ({ item }) => <ProductItem product={item} />

  return (
    <Container style={styles.container}>
      <ScrollView>
        {treinoporcodigo}
        <ProductList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={renderListItem}
        // onRefresh={loadProducts}
        // refreshing={refreshing}
        />
        {/* <ProductItem /> */}
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
    color: "#ffffff",
    fontSize: 20
  },
  textTitulo: {
    color: "#ffffff",
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
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

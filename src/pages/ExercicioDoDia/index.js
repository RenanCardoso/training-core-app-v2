import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native'
import PropTypes from 'prop-types'

import api from '../../services/api'
import { deleteUser } from '../../utils'

import { Container, Title, ButtonText, ProductList } from './styles'
import { Button, Block, Text, Input, theme } from 'galio-framework';
import { Icon, Product, Tabs } from '../../components/';

const { width } = Dimensions.get('screen');
import products from '../../constants/products';

export default function ExercicioDoDia() {
  const [fichadetreino, setFichaDeTreino] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {

    async function loadExercicioDoDia() {

      const response = await api.get('/ficha-de-treino')

      setFichaDeTreino(response.data['data'][0]);

      // const response = await api.get('/exercicio-do-dia')

      // console.log(response.data['data'][0])

      // setData(response.data['data'][0]);
    }

    loadExercicioDoDia();
  }, []);

  // renderListItem = ({ item }) => <ProductItem product={item} />

  return (
    <Container>

      {/* <ScrollView>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title><Text style={styles.text} p>{data['nome'] != (undefined || null) ? data['nome'] : ''}</Text></DataTable.Title>
          </DataTable.Header>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Altura </Text></DataTable.Cell>
            <DataTable.Cell>{data['altura'] != (undefined || null) ? data['altura'] : ''}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Peso </Text></DataTable.Cell>
            <DataTable.Cell>{data['peso'] != (undefined || null) ? data['peso'] : ''}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>IMC </Text></DataTable.Cell>
            <DataTable.Cell>{data['imc'] != (undefined || null) ? data['imc'] : ''}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Medida Biceps Direito </Text></DataTable.Cell>
            <DataTable.Cell>{data['medidabicepsdir'] != (undefined || null) ? data['medidabicepsdir'] : ''}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Medida Biceps Esquerdo </Text></DataTable.Cell>
            <DataTable.Cell>{data['medidabicepsesq'] != (undefined || null) ? data['medidabicepsesq'] : ''}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Medida Costas </Text></DataTable.Cell>
            <DataTable.Cell>{data['medidacostas'] != (undefined || null) ? data['medidacostas'] : ''}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Medida Coxa Direita </Text></DataTable.Cell>
            <DataTable.Cell>{data['medidacoxadir'] != (undefined || null) ? data['medidacoxadir'] : ''}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Medida Coxa Esquerda </Text></DataTable.Cell>
            <DataTable.Cell>{data['medidacoxaesq'] != (undefined || null) ? data['medidacoxaesq'] : ''}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Medida Ombro </Text></DataTable.Cell>
            <DataTable.Cell>{data['medidaombro'] != (undefined || null) ? data['medidaombro'] : ''}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Medida Panturrilha Direito </Text></DataTable.Cell>
            <DataTable.Cell>{data['medidapanturrilhadir'] != (undefined || null) ? data['medidapanturrilhadir'] : ''}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Medida Panturrilha Esquerdo </Text></DataTable.Cell>
            <DataTable.Cell>{data['medidapanturrilhaesq'] != (undefined || null) ? data['medidapanturrilhaesq'] : ''}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Medida Triceps Direito </Text></DataTable.Cell>
            <DataTable.Cell>{data['medidatricepsdir'] != (undefined || null) ? data['medidatricepsdir'] : ''}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Medida Triceps Esquerdo </Text></DataTable.Cell>
            <DataTable.Cell>{data['medidatricepsesq'] != (undefined || null) ? data['medidatricepsesq'] : ''}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Percentual de Gordura Corporal </Text></DataTable.Cell>
            <DataTable.Cell>{data['percgorduracorporal'] != (undefined || null) ? data['percgorduracorporal'] : ''}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Possui Lesão? </Text></DataTable.Cell>
            <DataTable.Cell>{data['flpossuilesao'] != (undefined || null) ? data['flpossuilesao'] : ''}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Deficiente Físico? </Text></DataTable.Cell>
            <DataTable.Cell>{data['fldeficiente'] != (undefined || null) ? data['fldeficiente'] : ''}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>observacao </Text></DataTable.Cell>
            <DataTable.Cell>{data['observacao'] != (undefined || null) ? data['observacao'] : ''}</DataTable.Cell>
          </DataTable.Row> */}
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

        {/* </DataTable>
      </ScrollView> */}
    </Container>
  );
}

ExercicioDoDia.navigationOptions = ({ navigation }) => {

  return {
    title: 'ExercicioDoDia',
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

ExercicioDoDia.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
  }).isRequired,
};

const styles = StyleSheet.create({
  ExercicioDoDia: {
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

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
import { DataTable } from 'react-native-paper';

export default function AvaliacaoMedica() {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {

    async function loadAvaliacaoMedica() {

      const response = await api.get('/avaliacao-medica')

      // console.log(response.data['data'][0])

      setData(response.data['data'][0]);
    }

    loadAvaliacaoMedica();
  }, []);

  return (
    <Container style={styles.DataTable}>

      <ScrollView>
        <DataTable>
          {/* <DataTable.Header>
          <DataTable.Title><Text style={styles.text} p>{data['nome'] != (undefined || null) ? data['nome'] : ''}</Text></DataTable.Title>
        </DataTable.Header> */}

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Altura </Text></DataTable.Cell>
            <DataTable.Cell><Text style={styles.text}>{data['altura'] != (undefined || null) ? data['altura'] : ''}</Text></DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Peso </Text></DataTable.Cell>
            <DataTable.Cell><Text style={styles.text}>{data['peso'] != (undefined || null) ? data['peso'] : ''}</Text></DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>IMC </Text></DataTable.Cell>
            <DataTable.Cell><Text style={styles.text}>{data['imc'] != (undefined || null) ? data['imc'] : ''}</Text></DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Medida Biceps Direito </Text></DataTable.Cell>
            <DataTable.Cell><Text style={styles.text}>{data['medidabicepsdir'] != (undefined || null) ? data['medidabicepsdir'] : ''}</Text></DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Medida Biceps Esquerdo </Text></DataTable.Cell>
            <DataTable.Cell><Text style={styles.text}>{data['medidabicepsesq'] != (undefined || null) ? data['medidabicepsesq'] : ''}</Text></DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Medida Costas </Text></DataTable.Cell>
            <DataTable.Cell><Text style={styles.text}>{data['medidacostas'] != (undefined || null) ? data['medidacostas'] : ''}</Text></DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Medida Coxa Direita </Text></DataTable.Cell>
            <DataTable.Cell><Text style={styles.text}>{data['medidacoxadir'] != (undefined || null) ? data['medidacoxadir'] : ''}</Text></DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Medida Coxa Esquerda </Text></DataTable.Cell>
            <DataTable.Cell><Text style={styles.text}>{data['medidacoxaesq'] != (undefined || null) ? data['medidacoxaesq'] : ''}</Text></DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Medida Ombro </Text></DataTable.Cell>
            <DataTable.Cell><Text style={styles.text}>{data['medidaombro'] != (undefined || null) ? data['medidaombro'] : ''}</Text></DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Medida Panturrilha Direito </Text></DataTable.Cell>
            <DataTable.Cell><Text style={styles.text}>{data['medidapanturrilhadir'] != (undefined || null) ? data['medidapanturrilhadir'] : ''}</Text></DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Medida Panturrilha Esquerdo </Text></DataTable.Cell>
            <DataTable.Cell><Text style={styles.text}>{data['medidapanturrilhaesq'] != (undefined || null) ? data['medidapanturrilhaesq'] : ''}</Text></DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Medida Triceps Direito </Text></DataTable.Cell>
            <DataTable.Cell><Text style={styles.text}>{data['medidatricepsdir'] != (undefined || null) ? data['medidatricepsdir'] : ''}</Text></DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Medida Triceps Esquerdo </Text></DataTable.Cell>
            <DataTable.Cell><Text style={styles.text}>{data['medidatricepsesq'] != (undefined || null) ? data['medidatricepsesq'] : ''}</Text></DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Percentual de Gordura Corporal </Text></DataTable.Cell>
            <DataTable.Cell><Text style={styles.text}>{data['percgorduracorporal'] != (undefined || null) ? data['percgorduracorporal'] : ''}</Text></DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Possui Lesão? </Text></DataTable.Cell>
            <DataTable.Cell><Text style={styles.text}>{data['flpossuilesao'] != (undefined || null) ? data['flpossuilesao'] : ''}</Text></DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Deficiente Físico? </Text></DataTable.Cell>
            <DataTable.Cell><Text style={styles.text}>{data['fldeficiente'] != (undefined || null) ? data['fldeficiente'] : ''}</Text></DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Observação </Text></DataTable.Cell>
            <DataTable.Cell><Text style={styles.text}>{data['observacao'] != (undefined || null) ? data['observacao'] : ''}</Text></DataTable.Cell>
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
    </Container>
  );
}

AvaliacaoMedica.navigationOptions = ({ navigation }) => {

  return {
    title: 'AvaliacaoMedica',
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

AvaliacaoMedica.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
  }).isRequired,
};

const styles = StyleSheet.create({
  AvaliacaoMedica: {
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
  DataTable: {
    marginBottom: 2,
    backgroundColor: '#45546c',
  },
  text: {
    color: "#ffffff"
  }
});
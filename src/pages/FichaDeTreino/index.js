import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native'
import PropTypes from 'prop-types'

import api from '../../services/api'
import { deleteUser } from '../../utils'

import { Container, Title, ButtonText, ProductList } from './styles'
import { Button, Block, Text, Input, theme, Card } from 'galio-framework';
import { Icon, Product, Tabs } from '../../components/';
import { DataTable } from 'react-native-paper';

const { width } = Dimensions.get('screen');
import products from '../../constants/products';

export default function FichaDeTreino() {
  const [data, setData] = useState([]);
  const [dificuldadetreino, setdificuldadetreino] = useState([]);
  const [objtreino, setObjTreino] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {

    async function loadFichaDeTreino() {

      const response = await api.get('/ficha-de-treino')

      setData(response.data['data'][0]);
      // console.log(response.data['data'][0]['iddificuldadetreino'])

      setdificuldadetreino(response.data['data'][0]['iddificuldadetreino']);
      setObjTreino(response.data['data'][0]['idobjetivotreino']);
    }

    loadFichaDeTreino();
  }, []);

  return (
    <Container style={styles.DataTable}>

      <DataTable style={styles.DataTable}>
        <DataTable.Header style={styles.DataTableHeader}>
          <DataTable.Title><Text style={styles.text} p>{data['nome'] != (undefined || null) ? data['nome'] : ''}</Text></DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell><Text style={styles.text}>Descrição </Text></DataTable.Cell>
          <DataTable.Cell><Text style={styles.text}>{data['descricao'] != (undefined || null) ? data['descricao'] : ''}</Text></DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell><Text style={styles.text}>Data Início </Text></DataTable.Cell>
          <DataTable.Cell><Text style={styles.text}>{data['datainicio'] != (undefined || null) ? data['datainicio'] : ''}</Text></DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell><Text style={styles.text}>Data Fim </Text></DataTable.Cell>
          <DataTable.Cell><Text style={styles.text}>{data['datafim'] != (undefined || null) ? data['datafim'] : ''}</Text></DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell><Text style={styles.text}>Iniciante? </Text></DataTable.Cell>
          <DataTable.Cell><Text style={styles.text}>{data['fliniciante'] != (undefined || null) ? data['fliniciante'] : ''}</Text></DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell><Text style={styles.text}>Objetivo do Treino </Text></DataTable.Cell>
          <DataTable.Cell><Text style={styles.text}>{dificuldadetreino['nome'] != (undefined || null) ? dificuldadetreino['nome'] : ''}</Text></DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell><Text style={styles.text}>Dificuldade do Treino </Text></DataTable.Cell>
          <DataTable.Cell><Text style={styles.text}>{objtreino['nome'] != (undefined || null) ? objtreino['nome'] : ''}</Text></DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell><Text style={styles.text}>Tempo de Treino Aprox. </Text></DataTable.Cell>
          <DataTable.Cell><Text style={styles.text}>{data['tempotreino'] != (undefined || null) ? data['tempotreino'] : ''}</Text></DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell><Text style={styles.text}>Status </Text></DataTable.Cell>
          <DataTable.Cell><Text style={styles.text}>{data['status'] != (undefined || null) ? data['status'] : ''}</Text></DataTable.Cell>
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
    </Container>
  );
}

FichaDeTreino.navigationOptions = ({ navigation }) => {

  return {
    title: 'FichaDeTreino',
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

FichaDeTreino.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
  }).isRequired,
};

const styles = StyleSheet.create({
  FichaDeTreino: {
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
  blockcard: {
    margin: 10,
    backgroundColor: '#ebedef',
    borderRadius: 10
  },
  DataTableHeader: {
    backgroundColor: '#3c4b64',
  },
  DataTable: {
    marginBottom: 2,
    backgroundColor: '#45546c',
  },
  text: {
    color: "#ffffff"
  }
});

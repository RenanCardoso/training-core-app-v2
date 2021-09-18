import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, Dimensions, ScrollView, View } from 'react-native'
import PropTypes from 'prop-types'
import api from '../../services/api'
import { deleteUser } from '../../utils'
import { Container, Title, ButtonText, ProductList } from './styles'
import { Button, Block, Text, Input, theme } from 'galio-framework';
import { DataTable } from 'react-native-paper';
const { width } = Dimensions.get('screen');

export default function AvaliacaoMedica() {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {

    async function loadAvaliacaoMedica() {

      const response = await api.get('/avaliacao-medica')
      setData(response.data['data'][0]);
    }

    loadAvaliacaoMedica();
  }, []);

  return (
    <Container style={styles.DataTable}>

      <ScrollView>
        <DataTable>

          <DataTable.Header style={styles.DataTableHeader}>
              <DataTable.Title style={styles.textTitle}><Text style={styles.text} p>Ficha Técnica da Avaliação Médica</Text></DataTable.Title>
            </DataTable.Header>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Altura </Text></DataTable.Cell>
            <View style={styles.fixToText}>
              <DataTable.Cell><Text style={styles.text}>{data['altura'] != (undefined || null) ? data['altura'] : ''}</Text></DataTable.Cell>
            </View>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Peso </Text></DataTable.Cell>
            <View style={styles.fixToText}>
              <DataTable.Cell><Text style={styles.text}>{data['peso'] != (undefined || null) ? data['peso'] : ''}</Text></DataTable.Cell>
            </View>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>IMC </Text></DataTable.Cell>
            <View style={styles.fixToText}>
              <DataTable.Cell><Text style={styles.text}>{data['imc'] != (undefined || null) ? data['imc'] : ''}</Text></DataTable.Cell>
            </View>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Medida do Biceps Direito </Text></DataTable.Cell>
            <View style={styles.fixToText}>
              <DataTable.Cell><Text style={styles.text}>{data['medidabicepsdir'] != (undefined || null) ? data['medidabicepsdir'] : ''}</Text></DataTable.Cell>
            </View>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Medida do Biceps Esquerdo </Text></DataTable.Cell>
            <View style={styles.fixToText}>
              <DataTable.Cell><Text style={styles.text}>{data['medidabicepsesq'] != (undefined || null) ? data['medidabicepsesq'] : ''}</Text></DataTable.Cell>
            </View>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Medida das Costas </Text></DataTable.Cell>
            <View style={styles.fixToText}>
              <DataTable.Cell><Text style={styles.text}>{data['medidacostas'] != (undefined || null) ? data['medidacostas'] : ''}</Text></DataTable.Cell>
            </View>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Medida da Coxa Direita </Text></DataTable.Cell>
            <View style={styles.fixToText}>
              <DataTable.Cell><Text style={styles.text}>{data['medidacoxadir'] != (undefined || null) ? data['medidacoxadir'] : ''}</Text></DataTable.Cell>
            </View>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Medida da Coxa Esquerda </Text></DataTable.Cell>
            <View style={styles.fixToText}>
              <DataTable.Cell><Text style={styles.text}>{data['medidacoxaesq'] != (undefined || null) ? data['medidacoxaesq'] : ''}</Text></DataTable.Cell>
            </View>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Medida do Ombro </Text></DataTable.Cell>
            <View style={styles.fixToText}>
              <DataTable.Cell><Text style={styles.text}>{data['medidaombro'] != (undefined || null) ? data['medidaombro'] : ''}</Text></DataTable.Cell>
            </View>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Medida da Panturrilha Direita </Text></DataTable.Cell>
            <View style={styles.fixToText}>
              <DataTable.Cell><Text style={styles.text}>{data['medidapanturrilhadir'] != (undefined || null) ? data['medidapanturrilhadir'] : ''}</Text></DataTable.Cell>
            </View>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Medida da Panturrilha Esquerda </Text></DataTable.Cell>
            <View style={styles.fixToText}>
              <DataTable.Cell><Text style={styles.text}>{data['medidapanturrilhaesq'] != (undefined || null) ? data['medidapanturrilhaesq'] : ''}</Text></DataTable.Cell>
            </View>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Medida do Triceps Direito </Text></DataTable.Cell>
            <View style={styles.fixToText}>
              <DataTable.Cell><Text style={styles.text}>{data['medidatricepsdir'] != (undefined || null) ? data['medidatricepsdir'] : ''}</Text></DataTable.Cell>
            </View>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Medida do Triceps Esquerdo </Text></DataTable.Cell>
            <View style={styles.fixToText}>
              <DataTable.Cell><Text style={styles.text}>{data['medidatricepsesq'] != (undefined || null) ? data['medidatricepsesq'] : ''}</Text></DataTable.Cell>
            </View>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Percentual de Gordura Corporal </Text></DataTable.Cell>
            <View style={styles.fixToText}>
              <DataTable.Cell><Text style={styles.text}>{data['percgorduracorporal'] != (undefined || null) ? data['percgorduracorporal'] : ''}</Text></DataTable.Cell>
            </View>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Possui Lesão? </Text></DataTable.Cell>
            <View style={styles.fixToText}>
              <DataTable.Cell><Text style={styles.text}>{data['flpossuilesao'] != (undefined || null) ? data['flpossuilesao'] : ''}</Text></DataTable.Cell>
            </View>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Deficiente Físico? </Text></DataTable.Cell>
            <View style={styles.fixToText}>
              <DataTable.Cell><Text style={styles.text}>{data['fldeficiente'] != (undefined || null) ? data['fldeficiente'] : ''}</Text></DataTable.Cell>
            </View>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell><Text style={styles.text}>Observação </Text></DataTable.Cell>
            <View style={styles.fixToText}>
              <DataTable.Cell><Text style={styles.text}>{data['observacao'] != (undefined || null) ? data['observacao'] : ''}</Text></DataTable.Cell>
            </View>
          </DataTable.Row>
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
  DataTableHeader: {
    backgroundColor: '#3c4b64',
  },
  text: {
    color: "#ffffff",
  },
  textTitle: {
    color: "#ffffff",
    fontSize: 18
  },
  fixToText: {
    marginRight: 50
    // justifyContent: 'center',
    // alignItems: 'center'
  },
});

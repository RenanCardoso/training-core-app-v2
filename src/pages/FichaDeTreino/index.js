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

export default function FichaDeTreino() {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {

    async function loadFichaDeTreino() {

      const response = await api.get('/ficha-de-treino')

      console.log(response.data)

      setData(response.data.products);
    }

    loadFichaDeTreino();
  }, []);

  // renderListItem = ({ item }) => <ProductItem product={item} />


  return (
    <Container>
      {/* Tabs */}
      {/* <Block row style={styles.tabs}>
        <Button shadowless style={[styles.tab, styles.divider]} onPress={() => navigation.navigate('App')}>
          <Block row middle>
            <Icon name="grid" family="feather" style={{ paddingRight: 6 }} />
            <Text size={16} style={styles.tabTitle}>Treino do Dia</Text>
          </Block>
        </Button>
        <Button shadowless style={styles.tab} onPress={() => navigation.navigate('App')}>
          <Block row middle>
            <Icon name="grid" family="feather" style={{ paddingRight: 6 }} />
            <Text size={16} style={styles.tabTitle}>Ficha de Treino</Text>
          </Block>
        </Button>
      </Block> */}
      <Text>Ficha de Treino</Text>
      {/* Fim Tabs */}

      {/* <ProductList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={renderListItem}
        // onRefresh={loadFichaDeTreino}
        // refreshing={refreshing}
      /> */}
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
});

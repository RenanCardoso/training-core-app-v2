import React, { useState, useEffect, Component } from 'react'
import { TouchableOpacity, Text, View, StyleSheet, Alert } from 'react-native'
import PropTypes from 'prop-types'
import { Header } from 'react-native-elements';
import { Left, Right, Icon } from 'native-base';


import api from '../../services/api'
import { deleteUser } from '../../utils'
import ProductItem from '../../components/ProductItem'

import { Container, Title, Button, ButtonText, ProductList } from './styles'

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

export default function Home() {

  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    async function loadProducts() {

      const response = await api.get('/ficha-de-treino')

      console.log(response.data)

      // setData(response.data.products);
    }

    loadProducts();
  }, []);

  // renderListItem = ({ item }) => <ProductItem product={item} />

  function HomeScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home</Text>
      </View>
    );
  }

  function MeusDados() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Meus Dados</Text>
      </View>
    );
  }

  function Sair() {
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Meus Dados</Text>
    </View>
    );
  }

  const Drawer = createDrawerNavigator();

  function MyDrawer() {
    return (

      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeScreen} options={{ drawerLabel: "Home" }}/>
        <Drawer.Screen name="Meus Dados" component={MeusDados} options={{ drawerLabel: "Meus Dados" }}/>
        <Drawer.Screen name="Sair" component={Sair} options={{ drawerLabel: "Sair" }}/>
      </Drawer.Navigator>
      
    );
  }

  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
    // <Container>
    //   <ProductList
    //     data={data}
    //     keyExtractor={item => String(item.id)}
    //     // renderItem={renderListItem}
    //     // onRefresh={loadProducts}
    //     // refreshing={refreshing}
    //   />
    // </Container>
  );
}

Home.navigationOptions = ({ navigation }) => {

  return {
    title: 'Home',
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

Home.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
  }).isRequired,
};
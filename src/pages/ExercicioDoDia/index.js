import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, Dimensions, ScrollView, Alert } from 'react-native'
import PropTypes from 'prop-types'

import api from '../../services/api'
import { deleteUser } from '../../utils'

import { Container, Title, ButtonText, ProductList } from './styles'
import { Button, Block, Text, Input, theme, View } from 'galio-framework';
import { Icon, Product, Tabs } from '../../components/';

const { width } = Dimensions.get('screen');
import products from '../../constants/products';
import { DataTable } from 'react-native-paper';
import { StackActions, NavigationActions } from 'react-navigation'
import RealizarExercicios from '../RealizarExercicios'
import TodosExerciciosScreen from '../TodosExercicios'
import ExerciciododiaScreen from '../ExercicioDoDia'

import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import ProductItem from '../../components/ProductItem'
import RealizarProductItem from '../../components/RealizarProductItem'


export default function ExercicioDoDia({ navigation }) {
  const [codexercicio, setCodExercicio] = useState([]);
  const [data, setData] = useState([]);
  const [treinosarealizar, setTreinoARealizar] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {

    async function loadExercicioDoDia() {

      const response = await api.get('/ficha-de-treino')

      const fichadetreino = response.data['data'][0]['id'];

      const response2 = await api.get('/ficha-de-treino/' + fichadetreino + '/treino-do-dia/')
      setData(response2.data);
      setCodExercicio(response2.data[0].codigo_treino);

      const treino_realizado = 
      {
        "ficha_de_treino_id": fichadetreino,
        "codigo_treino": codexercicio
      }
      const response3 = await api.post('/consultar-treino-a-realizar/', treino_realizado)
      setTreinoARealizar(response3.data);
      // console.log(response3.data)
    }
    loadExercicioDoDia();
  }, []);

  async function iniciarTreino() {

    console.log(treinosarealizar.id)

    const response4 = await api.put('/iniciar-treino/' + treinosarealizar.id)
    // console.log(response4.status)
  }

  async function finalizarTreino() {

    console.log(treinosarealizar.id)

    const response5 = await api.put('/finalizar-treino/' + treinosarealizar.id)
    // console.log(response4.status)
  }

  var renderListItem = ({ item }) => <ProductItem product={item} />
  var renderListTreino = ({ item }) => <RealizarProductItem product={item} />

  function TreinoDoDiaScreen({ navigation }) {
    return (
      <Container style={styles.DataTable}>
        <DataTable>
          <DataTable style={styles.fixToText}>
            <Button
              color="success"
              round size="small"
              onPress={() => (
                iniciarTreino().then(() => {
                  navigation.navigate('RealizarExercicios')
                })
              )}
            >Iniciar Treino</Button>
          </ DataTable>

          <DataTable.Header style={styles.DataTableHeader}>
            <DataTable.Title style={styles.textTitulo}><Text style={styles.text} p>Cód Agrupamento: </Text></DataTable.Title>
            <DataTable.Title style={styles.textTitulo}><Text style={styles.text} p>{codexercicio != (undefined || null) ? codexercicio : ''}</Text></DataTable.Title>

          </DataTable.Header>
        </ DataTable>
        <ScrollView>
          <ProductList
            data={data}
            keyExtractor={item => String(item.id)}
            renderItem={renderListItem}
          // onRefresh={loadProducts}
          // refreshing={refreshing}
          />

        </ScrollView>
      </Container>
    );
  }

  function RealizarExerciciosScreen({ navigation }) {
    useFocusEffect(
      React.useCallback(() => {
        // alert('Entrei na tela');
        // Do something when the screen is focused

        // return () => {
        //   alert('Screen was unfocused');
        //   // Do something when the screen is unfocused
        //   // Useful for cleanup functions
        // };
      }, [])
    );

    return (
      // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>



      <Container style={styles.DataTable}>
        <DataTable style={styles.fixToText}>
          <DataTable.Header style={styles.DataTableHeader}>
            <DataTable.Title style={styles.textTitulo}><Text style={styles.text} p>Cód Agrupamento: </Text></DataTable.Title>
            <DataTable.Title style={styles.textTitulo}><Text style={styles.text} p>{codexercicio != (undefined || null) ? codexercicio : ''}</Text></DataTable.Title>

          </DataTable.Header>
        </ DataTable>
        <ScrollView>
          <ProductList
            data={data}
            keyExtractor={item => String(item.id)}
            renderItem={renderListTreino}
          // onRefresh={loadProducts}
          // refreshing={refreshing}
          />

        </ScrollView>
        <DataTable style={styles.fixToText}>

          <Button
            color="success"
            round size="small"
            title="Todos Treinos"
            onPress={() => (
              finalizarTreino().then(() => {
                Alert.alert(
                  'Treino Finalizado Com Sucesso!',
                  'Parabéns, você terminou o treino de hoje com sucesso! Volte amanhã e continue evoluindo.',
                  [ { text: 'OK' } ],
                  { cancelable: false },
                ),
                navigation.navigate('TreinoDoDia')
              })
            )}
          >
            Finalizar Treino
          </Button>
        </ DataTable>

      </Container>

    );
  }

  function HomeScreen({ navigation }) {
    return (
      // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      // <Button
      // title="Go to Details"
      // onPress={() => navigation.navigate('Details')}
      // />
      // </View>
    );
  }

  function DetailsScreen({ navigation }) {
    return (
      // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      // <Button
      // title="Go to Details... again"
      // onPress={() => navigation.push('Details')}
      // />
      // </View>
    );
  }
  const Tab = createBottomTabNavigator();
  const TreinoDoDiaStack = createNativeStackNavigator();
  const HomeStack = createNativeStackNavigator();

  return (
    <NavigationContainer independent={true}>

      <Container>
        <Tab.Navigator
          // screenOptions={{ headerShown: false }}
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Treino do Dia') {
                iconName = focused
                  ? 'weight-lifter'
                  : 'weight-lifter';
              } else if (route.name === 'Todos Os Treinos') {
                iconName = focused ? 'arm-flex' : 'arm-flex';
              }

              // You can return any component that you like here!
              return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'blue',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Treino do Dia" screenOptions={{ headerShown: false }}>
            {() => (
              // <TreinoDoDiaStack.Navigator >
              <TreinoDoDiaStack.Navigator screenOptions={{ headerShown: false }}>
                <TreinoDoDiaStack.Screen
                  name="TreinoDoDia"
                  component={TreinoDoDiaScreen}
                />
                <TreinoDoDiaStack.Screen name="RealizarExercicios" component={RealizarExerciciosScreen} />
              </TreinoDoDiaStack.Navigator>
            )}
          </Tab.Screen>
          <Tab.Screen name="Todos Os Treinos" screenOptions={{ headerShown: false }}>
            {() => (
              // <HomeStack.Navigator>
              <HomeStack.Navigator screenOptions={{ headerShown: false }}>
                <HomeStack.Screen name="TodosExerciciosScreen" component={TodosExerciciosScreen} />
                <HomeStack.Screen name="Details" component={DetailsScreen} />
              </HomeStack.Navigator>
            )}
          </Tab.Screen>
        </Tab.Navigator>
      </Container>
    </NavigationContainer>

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
  DataTableHeader: {
    backgroundColor: '#3c4b64',
    margin: 10
  },
  DataTable: {
    marginBottom: 2,
    backgroundColor: '#45546c',
  },
  text: {
    color: "#ffffff",
    fontSize: 20
  },
  textTitulo: {
    color: "#ffffff",
    marginLeft: 5,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  fixToText: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
    flexDirection: 'column',
  }
});

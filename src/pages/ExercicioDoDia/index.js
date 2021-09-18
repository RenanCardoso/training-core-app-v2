import React, { useState, useEffect, useRef } from 'react'
import { TouchableOpacity, StyleSheet, Dimensions, ScrollView, Alert, View } from 'react-native'
import PropTypes from 'prop-types'

import api from '../../services/api'
import { deleteUser } from '../../utils'

import { Container, Title, ButtonText, ProductList } from './styles'
import { Button, Block, Text, Input, theme } from 'galio-framework';
import { Icon, Product, Tabs } from '../../components/';

const { width } = Dimensions.get('screen');
import products from '../../constants/products';
import { DataTable } from 'react-native-paper';
import { StackActions, NavigationActions } from 'react-navigation'
// import RealizarTodosExerciciosScreen from '../TodosExercicios'
// import TodosExerciciosScreen from '../TodosExercicios'
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

  const [fichadetreino, setFichaDeTreino] = useState([]);
  const [qtdexercicios, setQtdExercicios] = useState([]);
  const [qtdcodexercicios, setQtdCodExercicios] = useState(0);
  const [treinosporcodigo, setTreinosPorCodigo] = useState([]);
  const [todostreinos, setTodosTreinos] = useState([]);
  const [codrealizarexerc, setCodRealizarExerc] = useState([]);

  const codigoexercicios = ['A', 'B', 'C', 'D', 'E', 'F'];

  useEffect(() => {

    async function loadExercicioDoDia() {

      const response = await api.get('/ficha-de-treino')

      let fichadetreino = response.data['data'][0]['id'];
      setFichaDeTreino(fichadetreino);

      const response2 = await api.get('/ficha-de-treino/' + fichadetreino + '/treino-do-dia/')
      setData(response2.data);
      setCodExercicio(response2.data[0].codigo_treino);

      const response4 = await api.get('/ficha-de-treino/' + fichadetreino + '/cont-total-exercicio-por-codigo/')
      setQtdCodExercicios(response4.data);

      const response5 = await api.get('/ficha-de-treino/' + fichadetreino + '/cont-exercicio-por-codigo/')
      setQtdExercicios(response5.data);

      const response6 = await api.get('/ficha-de-treino/' + fichadetreino + '/exercicio-por-codigo/')
      setTodosTreinos(response6.data.treinos);
    }

    loadExercicioDoDia();
  }, []);

  async function iniciarTreino() {

    // console.log(treinosarealizar)

    const response4 = await api.put('/iniciar-treino/' + treinosarealizar.id).catch(function (error) {
      if (error.response.status == 400) {
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);

        Alert.alert(
          'Atenção!',
          'Não é possível iniciar um treino caso você já tenha algum treino em andamento.',
          [{ text: 'OK' }],
          { cancelable: true },
        )
      }
    });
  }

  async function iniciarTreinos(codexercicio) {

    // console.log(codexercicio)
    setCodRealizarExerc(codexercicio)

    var treino_realizado =
    {
      "ficha_de_treino_id": fichadetreino,
      "codigo_treino": codexercicio
    }

    var response7 = await api.post('/consultar-treino-filtrado-codigo/', treino_realizado)
    setTreinosPorCodigo(response7.data)

    // console.log(treinosporcodigo)

    var response8 = await api.post('/consultar-treino-a-realizar/', treino_realizado)
    setTreinoARealizar(response8.data);

    // console.log(treinosarealizar)

    var response6 = await api.put('/iniciar-treino/' + treinosarealizar.id).catch(function (error) {
      if (error.response.status == 400) {
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);

        Alert.alert(
          'Atenção!',
          'Não é possível iniciar um treino caso você já tenha algum treino em andamento.',
          [{ text: 'OK' }],
          { cancelable: true },
        )
      }
    });
  }

  async function finalizarTreino() {

    // console.log(treinosarealizar.id)
    const response5 = await api.put('/finalizar-treino/' + treinosarealizar.id).catch(function (error) {
      if (error.response.status == 400) {
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);

        Alert.alert(
          'Atenção!',
          'Não é possível finalizar um treino caso você já tenha algum treino em andamento.',
          [{ text: 'OK' }],
          { cancelable: true },
        )
      }
    });
  }

  var renderListItem = ({ item }) => <ProductItem product={item} />
  var renderListTreino = ({ item }) => <RealizarProductItem product={item} />

  function TreinoDoDiaScreen({ navigation }) {

    // useEffect(() => {

    //   async function loadExercicioDoDia() {

    //     const response = await api.get('/ficha-de-treino')

    //     const responsefichadetreino = await api.get('/ficha-de-treino')
    //     setFichaDeTreino(response.data['data'][0]['id']);

    //     const response2 = await api.get('/ficha-de-treino/' + fichadetreino + '/treino-do-dia/')
    //     setData(response2.data);
    //     setCodExercicio(response2.data[0].codigo_treino);

    //     const treino_realizado =
    //     {
    //       "ficha_de_treino_id": fichadetreino,
    //       "codigo_treino": codexercicio
    //     }
    //     const response3 = await api.post('/consultar-treino-a-realizar/', treino_realizado)
    //     setTreinoARealizar(response3.data);
    //   }

    //   loadExercicioDoDia();
    // }, [data]);


    return (
      <Container style={styles.DataTable}>
        <DataTable>
            <DataTable.Header style={styles.DataTableHeader}>
            <View style={styles.title}>
            <DataTable.Title><Text style={styles.text} p>Treino do Dia: </Text></DataTable.Title>
          </View>
            <DataTable.Title style={styles.textTitulo}><Text style={styles.text} p>{codexercicio != (undefined || null) ? codexercicio : ''}</Text></DataTable.Title>
            <View style={styles.fixToText}>
            <Button
              color="success"
              round size="small"
              onPress={() => (
                iniciarTreino().then(() => {
                  navigation.navigate('RealizarExercicios')
                })
              )}
            >Iniciar Treino</Button>
          </View>
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

    return (
      <Container style={styles.DataTable}>
        <DataTable style={styles.fixToText}>
          <DataTable.Header style={styles.DataTableHeader}>
            <DataTable.Title style={styles.textTitulo}><Text style={styles.text} p>Treino: </Text></DataTable.Title>
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
                  [{ text: 'OK' }],
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

  function TodosExerciciosScreen({ navigation }) {

    // useEffect(() => {
    //   async function loadTodosExercicios() {

    //     const response4 = await api.get('/ficha-de-treino/' + fichadetreino + '/cont-total-exercicio-por-codigo/')
    //     setQtdCodExercicios(response4.data);

    //     const response5 = await api.get('/ficha-de-treino/' + fichadetreino + '/cont-exercicio-por-codigo/')
    //     setQtdExercicios(response5.data);

    //     const response6 = await api.get('/ficha-de-treino/' + fichadetreino + '/exercicio-por-codigo/')
    //     setTodosTreinos(response6.data.treinos);
    //   }

    //   loadTodosExercicios();
    // }, [todostreinos])

    let treinoporcodigo = []

    for (let i = 0; i < qtdcodexercicios; i++) {

      treinoporcodigo.push(
        <DataTable.Header style={styles.DataTableHeader}>
          <View style={styles.title}>
            <DataTable.Title><Text style={styles.text} p>Treino: </Text></DataTable.Title>
          </View>

          <DataTable.Title style={styles.textTitulo}><Text style={styles.text} p>{codigoexercicios[i] != (undefined || null) ? codigoexercicios[i] : ''}</Text></DataTable.Title>
          <View style={styles.fixToText}>
            <Button
              color="success"
              round size="small"
              title="Iniciar Treino"
              onPress={() => (
                iniciarTreinos(codigoexercicios[i]).then(() => {
                  navigation.navigate('RealizarTodosExercicios')
                })
              )}
            >Iniciar Treino
            </Button>
          </View>
        </DataTable.Header>
      )
    }

    var renderListItems = ({ item }) => <ProductItem product={item} />
    var renderListTreino = ({ item }) => <RealizarProductItem product={item} />

    return (
      <Container style={styles.DataTable}>
        <ScrollView>
          {treinoporcodigo}
          <ProductList
            data={todostreinos}
            keyExtractor={item => String(item.id)}
            renderItem={renderListItems}
          // onRefresh={loadProducts}
          // refreshing={refreshing}
          />
          {/* <ProductItem /> */}
        </ScrollView>
      </Container>
    );
  }

  function RealizarTodosExerciciosScreen({ navigation }) {
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
      <Container style={styles.DataTable}>
        <DataTable style={styles.fixToText}>
          <DataTable.Header style={styles.DataTableHeader}>
            <DataTable.Title style={styles.textTitulo}><Text style={styles.text} p>Treino: </Text></DataTable.Title>
            <DataTable.Title style={styles.textTitulo}><Text style={styles.text} p>{codrealizarexerc != (undefined || null) ? codrealizarexerc : ''}</Text></DataTable.Title>
          </DataTable.Header>
        </ DataTable>
        <ScrollView>
          <ProductList
            data={treinosporcodigo}
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
                  [{ text: 'OK' }],
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
                <HomeStack.Screen name="RealizarTodosExercicios" component={RealizarTodosExerciciosScreen} />
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
    fontSize: 18
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

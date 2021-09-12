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

import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


export default function ExercicioDoDia(props) {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [exercicio, setExercicio] = useState([]);
  const [agrupamento_musc, setAgrupMusc] = useState([]);
  const [aparelho, setAparelho] = useState([]);

  useEffect(() => {

    async function loadExercicioDoDia() {

      const response = await api.get('/ficha-de-treino')

      let fichadetreino = response.data['data'][0]['id'];

      const response2 = await api.get('/ficha-de-treino/' + fichadetreino + '/treino-do-dia/')
      setData(response2.data);
      setExercicio(response2.data['exercicio_id']);
      setAgrupMusc(response2.data['exercicio_id']['idagrupamentomusc']);
      setAparelho(response2.data['exercicio_id']['idaparelho']);

      // console.log(response2.data['exercicio_id']['idagrupamentomusc']['nome'])
    }

    loadExercicioDoDia();
  }, []);


  function TreinoDoDiaScreen({ navigation }) {
    return (
  
        <Container style={styles.DataTable}>
          
          <ScrollView>
            <DataTable>
              <DataTable style={styles.fixToText}>
                <Button
                  color="success"
                  round size="small"
                  title="Iniciar Treino"
                  onPress={() => navigation.navigate('RealizarExercicios')}
                  >Iniciar Treino
                </Button>
              </DataTable>
  
              <DataTable.Header style={styles.DataTableHeader}>
                <DataTable.Title><Text style={styles.text} p>Cód Agrupamento: </Text></DataTable.Title>
                <DataTable.Title><Text style={styles.text} p>{data['codigo_treino'] != (undefined || null) ? data['codigo_treino'] : ''}</Text></DataTable.Title>
  
              </DataTable.Header>
              <DataTable.Row>
                <DataTable.Cell><Text style={styles.text}>Agrupamento Muscular: </Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.text}>{exercicio['idagrupamentomusc'] != (undefined || null) ? exercicio['idagrupamentomusc'] : ''}  </Text></DataTable.Cell>
              </DataTable.Row>
  
              <DataTable.Row>
                <DataTable.Cell><Text style={styles.text}>Exercício:  </Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.text}>{exercicio['nome'] != (undefined || null) ? exercicio['nome'] : ''}  </Text></DataTable.Cell>
              </DataTable.Row>
  
              <DataTable.Row>
                <DataTable.Cell><Text style={styles.text}>Aparelho: </Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.text}>{exercicio['idaparelho'] != (undefined || null) ? exercicio['idaparelho'] : ''}  </Text></DataTable.Cell>
              </DataTable.Row>
  
              <DataTable.Row>
                <DataTable.Cell><Text style={styles.text}>Descrição: </Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.text}>{exercicio['descricao'] != (undefined || null) ? exercicio['descricao'] : ''}  </Text></DataTable.Cell>
              </DataTable.Row>
  
              <DataTable.Row>
                <DataTable.Cell><Text style={styles.text}>Tempo de Descanso: </Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.text}>{exercicio['tempoexercicio'] != (undefined || null) ? exercicio['tempoexercicio'] : ''}  </Text></DataTable.Cell>
              </DataTable.Row>
  
              <DataTable.Row>
                <DataTable.Cell><Text style={styles.text}>Ordem: </Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.text}>{data['ordem'] != (undefined || null) ? data['ordem'] : ''}  </Text></DataTable.Cell>
              </DataTable.Row>
  
              <DataTable.Row>
                <DataTable.Cell><Text style={styles.text}>Séries: </Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.text}>{data['series'] != (undefined || null) ? data['series'] : ''}  </Text></DataTable.Cell>
              </DataTable.Row>
  
              <DataTable.Row>
                <DataTable.Cell><Text style={styles.text}>Repetições: </Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.text}>{data['repeticoes'] != (undefined || null) ? data['repeticoes'] : ''}  </Text></DataTable.Cell>
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
  
            </DataTable >
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

        <Button
        title="Go to TreinoDoDia"
        onPress={() => navigation.navigate('TreinoDoDia')}
      >
          Go to TreinoDoDia
        </Button>
  
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
    color: "#ffffff"
  },
  textTitulo: {
    marginLeft: 5
  },
  fixToText: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
    flexDirection: 'column',
  }
});

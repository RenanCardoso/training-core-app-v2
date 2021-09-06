import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import api from '../../services/api'
import { deleteUser } from '../../utils'
import { Container, Title, ButtonText, ProductList } from './styles'
import { Button, Block, Text, Input, View, theme } from 'galio-framework';
const { width } = Dimensions.get('screen');
import products from '../../constants/products';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Icon, Header, DrawerCustomItem } from '../../components';
import { Images, materialTheme } from "../../constants";

import CustomDrawerContent from '../../navigation/Menu';

import FichadeTreinoScreen from '../FichaDeTreino'
import MeusDadosScreen from '../MeusDados/'
import AvaliacaoMedicaScreen from '../AvaliacaoMedica/'
import TodosExerciciosScreen from '../TodosExercicios/'
import ExercicioDoDiaScreen from '../ExercicioDoDia/'
import AuthLoadingScreen from '../AuthLoadingScreen'


import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import { color } from 'react-native-reanimated'

export default function Home() {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    async function loadTodosTreinos() {

      // setInterval(async () => {
      //   const response4 = await api.get('/ficha-de-treino/' + fichadetreino + '/exercicio-por-codigo/')
      //   console.log(response4.data)
      // }, 3000);

      // const response4 = await api.get('/ficha-de-treino/' + fichadetreino + '/exercicio-por-codigo/')
      // setData(response4.data);
      // console.log(response4.data)
    }

    loadTodosTreinos();
  }, []);

  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          onPress={() => (
            deleteUser().then(() => {
              navigation.navigate('AuthLoading')
            })
          )}
          label={
            ({ focused, color }) =>
              <Text style={{ color: "#ffffff" }}>{focused ? 'Sair' : 'Sair'}</Text>
          }
          icon={({ focused, size }) =>
            <MaterialCommunityIcons
              size={26}
              color={"#ffffff"}
              style={{ marginLeft: 6, marginRight: 4 }}
              name={focused ? 'logout' : 'logout'}
              focused={true}
            />}
        />
      </DrawerContentScrollView>
    );
  }

  const Drawer = createDrawerNavigator();

  function MyDrawer() {
    return (
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        initialRouteName="ExercicioDoDia"
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#3c4b64',
            // width: 240,
          }
        }}
      >
        <Drawer.Screen
          name="Treino Do Dia"
          component={ExercicioDoDiaScreen}
          options={{
            drawerLabel: ({ focused, color }) => (
              <Text color={focused ? "#ffffff" : "#ffffff"}>Treino Do Dia</Text>
            ),
            drawerIcon: ({ focused, size }) => (
              <MaterialCommunityIcons
                name="weight-lifter"
                size={size}
                color={focused ? "#ffffff" : theme.COLORS.MUTED}
                style={{ marginLeft: 4, marginRight: 4 }}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Todos Treinos"
          component={TodosExerciciosScreen}
          options={{
            drawerLabel: ({ focused, color }) => (
              <Text color={focused ? "#ffffff" : "#ffffff"}>Todos Treinos</Text>
            ),
            drawerIcon: ({ focused, size }) => (
              <MaterialCommunityIcons
                name="arm-flex"
                size={size}
                color={focused ? "#ffffff" : theme.COLORS.MUTED}
                style={{ marginLeft: 4, marginRight: 4 }}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Ficha De Treino"
          component={FichadeTreinoScreen}
          options={{
            drawerLabel: ({ focused, color }) => (
              <Text color={focused ? "#ffffff" : "#ffffff"}>Ficha de Treino</Text>
            ),
            drawerIcon: ({ focused, size }) => (
              <MaterialCommunityIcons
                name="card-account-details"
                size={size}
                color={focused ? "#ffffff" : theme.COLORS.MUTED}
                style={{ marginLeft: 4, marginRight: 4 }}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Avaliação Médica"
          component={AvaliacaoMedicaScreen}
          options={{
            drawerLabel: ({ focused, color }) => (
              <Text color={focused ? "#ffffff" : "#ffffff"}>Avaliação Médica</Text>
            ),
            drawerIcon: ({ focused, size }) => (
              <MaterialCommunityIcons
                name="heart"
                size={size}
                color={focused ? "#ffffff" : theme.COLORS.MUTED}
                style={{ marginLeft: 4, marginRight: 4 }}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    )
  }

  return (
    <Container>
      <MyDrawer />
    </Container>

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

const styles = StyleSheet.create({
  home: {
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
    width: width * 0.46,
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

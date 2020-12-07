import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import Login from './Login';
import ListProducts from './ListProducts';
import UserDetail from './UserDetail';
import About from './About';
import ListBill from './ListBill';


const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen

          name="Login"
          component={Login}
          options={{
            title: 'Đăng nhập',
            headerTintColor: 'white',
            headerStyle: { backgroundColor: '#e66f00' },
          }}

        />

        <Stack.Screen
          name="ListProducts"
          component={ListProducts}
          options={{
            headerShown: false,
            title: 'Danh sách sản phẩm',
            headerTintColor: 'white',
            headerStyle: { backgroundColor: '#009e8c' },
          }}
        />

        <Stack.Screen
          name="About"
          component={About}
          options={{
            title: 'Giới thiệu',
            headerTintColor: 'white',
            headerStyle: { backgroundColor: '#009e8c' },
          }}
        />

        <Stack.Screen
          name="UserDetail"
          component={UserDetail}
          options={{
            title: 'Thông tin tài khoản',
            headerTintColor: 'white',
            headerStyle: { backgroundColor: '#009e8c' },
          }}
        />

        <Stack.Screen
          name="ListBill"
          component={ListBill}
          options={{
            title: 'Danh sách hóa đơn',
            headerTintColor: 'white',
            headerStyle: { backgroundColor: '#009e8c' },
          }}
        />
      </Stack.Navigator>

    </NavigationContainer>
  );
}


//Nhập câu lệnh :
//npm install @react-navigation/native @react-navigation/stack
//expo install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view

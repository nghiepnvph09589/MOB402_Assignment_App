import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Text, TouchableOpacity, TextInput, View } from 'react-native';

export default function About({ navigation }) {


  return (
    <View style={styles.container}>

      <Image style={styles.logo} source={require("./assets/Laptopone.png")} />

      <Text style={styles.text1}>Tao là: NGUYỄN VĂN NGHIỆP</Text>
      <Text style={styles.gach}></Text>
      <Text style={styles.text2}>Laptop One là  một trong những doanh nghiệp tiên phong trong lĩnh vực kinh doanh Laptop tại Hà Nội.</Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.text3}>Địa chỉ: </Text>
        <Text style={styles.text31}>KTX Mỹ Đình</Text>
      </View>

      <View style={{ flexDirection: 'row' }}>
      <Text style={styles.text3}>Số điện thoại: </Text>
        <Text style={styles.text31}>0368138670</Text>
      </View>
      
      <Text style={styles.textv}>Phiên bản: 1.0.0</Text>
      <Text style={styles.text4}>2020 © Copyrights NGUYENVANNGHIEP</Text>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    borderColor: '#e66f00',
    borderRadius: 16,
    borderWidth: 1,
    height: 150,
    width: 310,
    overflow: 'hidden',
    marginTop: 30,
    marginBottom: 30
  },
  text1: {
    fontSize: 20,
    textAlign: "center",
    color: '#e66f00',
    fontWeight: 'bold',
    fontStyle: 'italic'

  },
  gach: {
    borderBottomColor: '#e66f00',
    borderBottomWidth: 6,
    borderRadius: 6,
    width: 300
  },
  text2: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  text3: {
    fontSize: 14,
    textAlign: "center",
  },
  text31: {
    fontSize: 14,
    textAlign: "center",
    color: '#0026ff'
  },
  textv: {
    marginTop: 70
  },
  text4: {
    color: '#e66f00',
    fontSize: 14,
    textAlign: "center",
  }
});

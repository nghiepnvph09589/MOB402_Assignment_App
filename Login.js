import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Text, KeyboardAvoidingView, Alert, TouchableOpacity, TextInput, View } from 'react-native';
import Dialog from "react-native-dialog";
//npm install react-native-dialog --save
export default function Login({ navigation }) {

  const [userName, setuserName] = useState();
  const [passWord, setpassWord] = useState();
  const [fetch1, setFetch1] = useState('true');
  const [listU, setListU] = useState([]);

  const [Name, setName] = useState('');
  const [User, setUser] = useState('');
  const [Pass, setPass] = useState('');
  const [Pass2, setPass2] = useState('');
  const [Phone, setPhone] = useState('');
  const [Adress, setAdress] = useState('');


  //dialog

  if (fetch1 == 'true') {
    fetch('http://172.20.10.1:9994/getJsonUser')
      .then((response) => response.json())
      .then((json) => {
        setListU(json)
        console.log(listU)
        setFetch1('false')
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    handleCancel = () => {
      setDialogVisible(false);
    };
    showDialog = () => {
      setDialogVisible(true);
    };


  })


  const [dialogVisible, setDialogVisible] = useState(false);



  return (
    <KeyboardAvoidingView style={styles.container}>

      <Image style={styles.logo} source={require("./assets/Laptopone2.png")} />

      <TextInput style={styles.input} placeholder='username' onChangeText={(text) => setuserName(text)} />
      <TextInput style={styles.input} secureTextEntry={true} placeholder='password' onChangeText={(text) => setpassWord(text)} />
      <TouchableOpacity style={styles.login} onPress={() => {


        for (var i = 0; i < listU.length; i++) {
          if (userName == listU[i].User && passWord == listU[i].Pass) {
            navigation.navigate('ListProducts', { uId: listU[i]._id, uUser: listU[i].User, uName: listU[i].Name });
            return;
            //navigation.navigate('ListProducts');
          }
        }
        Alert.alert(
          "",
          "Tài khoản hoặc mật khẩu không chính xác",
          [
            {
              text: "",
              style: "cancel"
            },
            { text: "OK" }
          ],
          { cancelable: true }
        );

      }}>
        <Text style={styles.textLogin}>Login</Text>
      </TouchableOpacity>



      <Dialog.Container visible={dialogVisible}>
        <Dialog.Title style={{ color: 'red' }}>Đăng kí tài khoản</Dialog.Title>
        <Dialog.Input label='Họ và tên' style={styles.labelInput} onChangeText={(text) => { setName(text) }} />
        <Dialog.Input label='Tên đăng nhập' style={styles.labelInput} onChangeText={(text) => { setUser(text) }} />
        <Dialog.Input label='Mật khẩu' style={styles.labelInput} secureTextEntry={true} value={Pass} onChangeText={(text) => { setPass(text) }} />
        <Dialog.Input label='Nhập lại mật khẩu' style={styles.labelInput} secureTextEntry={true} value={Pass2} onChangeText={(text) => { setPass2(text) }} />
        <Dialog.Input label='Điện thoại' style={styles.labelInput} onChangeText={(text) => { setPhone(text) }} />
        <Dialog.Input label='Địa chỉ' style={styles.labelInput} onChangeText={(text) => { setAdress(text) }} />

        <Dialog.Button label="Hủy" onPress={() => {
          handleCancel()
        }
        } />

        <Dialog.Button style={styles.buttonSua} label="Đăng kí" onPress={() => {
          {

            if (Name == '' || Pass == '' || User == '' || Phone == '' || Adress == '') {
              Alert.alert(
                "",
                "Không để trống trường nào",
                [
                  {
                    text: "",
                    style: "cancel"
                  },
                  { text: "Đã hiểu" }
                ],
                { cancelable: true }
              );
              return;
            } else if (Pass != Pass2) {
              Alert.alert(
                "",
                "Mật khẩu không giống nhau!",
                [
                  {
                    text: "",
                    style: "cancel"
                  },
                  { text: "Đã hiểu" }
                ],
                { cancelable: true }
              );
              return;
            }
            //
            fetch('http://172.20.10.14:9994/addUserApp', {
              method: 'post',
              body: new URLSearchParams({
                Name: Name,
                User: User,
                Pass: Pass,
                Phone: Phone,
                Adress: Adress,
              }).toString(),
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            })
              .then(response => response.json())
              .then(json =>
                console.log('Them tk')
              )
            //
            setFetch1('true')
            handleCancel()
            Alert.alert(
              "",
              "Thêm tài khoản thành công!",
              [
                {
                  text: "",
                  style: "cancel"
                },
                { text: "Đã hiểu" }
              ],
              { cancelable: true }
            );
        

          }
        }
        } />
      </Dialog.Container>
      <View style={styles.viewRow}>
        <Text>Chưa có tài khoản? </Text>
        <TouchableOpacity onPress={() => { showDialog() }}>
          <Text style={styles.textRegister}>Đăng kí ngay</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  input: {
    width: 300,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    paddingLeft: 20,
    paddingTop: 4,
    paddingBottom: 4,
    marginTop: 10,
    fontSize: 16
  },
  login: {
    marginTop: 30,
    width: 300,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    backgroundColor: '#e88d1e',
    alignSelf: 'center',
    padding: 4,
  },
  textLogin: {
    fontSize: 16,
    alignSelf: 'center',
    color: '#fff'
  },
  labelInput: {
    color: '#ff4800',
    borderColor: '#e66f00',
    borderBottomWidth: 1,
    paddingBottom: 2
  },
  buttonSua: {
    color: '#fff',
    borderColor: '#e66f00',
    borderRadius: 4,
    borderWidth: 1,
    width: 100,
    backgroundColor: '#e66f00',
    marginLeft: 10
  },
  viewRow: {
    flexDirection: 'row',
    marginTop: 10
  },
  textRegister: {
    color: '#0077ff'
  },
  viewLogo: {

  },
  logo: {
    borderColor: '#e66f00',
    borderRadius: 16,
    borderWidth: 1,
    height: 150,
    width: 310,
    overflow: 'hidden',
    marginTop: 30,
    marginBottom: 100
  }
});

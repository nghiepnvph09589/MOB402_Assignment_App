import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Alert, Switch, TouchableOpacity, TextInput, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Dialog from "react-native-dialog";

export default function UserDetail({ navigation, route }) {

  const { uId } = route.params;
  const [listUser, setListUser] = useState([]);
  const [passView, setPassView] = useState('******');
  const [dem, setDem] = useState(0);
  const [fetch1, setFetch1] = useState('true');


  const [Id, setId] = useState();
  const [Name, setName] = useState();
  const [User, setUser] = useState();
  const [Pass, setPass] = useState();
  const [Pass2, setPass2] = useState();
  const [Phone, setPhone] = useState();
  const [Adress, setAdress] = useState();




  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => { { setIsEnabled(previousState => !previousState); } };

  if (fetch1 == 'true') {
    fetch('http://172.20.10.14:9994/detailUserApp', {
      method: 'post',
      body: new URLSearchParams({
        uId: uId,
      }).toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then((response) => response.json())
      .then((json) => {
        setListUser(json)
      })
      .catch((error) => {
        console.error(error);
      });

    setFetch1('false')
  }



  showDialog = () => {
    setDialogVisible(true);
  };

  handleCancel = () => {
    setDialogVisible(false);
  };
  const [dialogVisible, setDialogVisible] = useState(false);


  return (
    <View style={styles.container}>



      <FlatList
        data={listUser}
        renderItem={({ item }) => <View style={styles.FlatListView}>
          <Text style={styles.textUser}>Tên người dùng: {item.Name}</Text>
          <Text style={styles.textDetail}>Tên đăng nhập:  {item.User}</Text>
          <View style={styles.viewPass}>
            <Text style={styles.textPass}>Mật khẩu:           {passView}</Text>
            <Switch
              style={styles.SwitchView}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => {
                toggleSwitch();
                if (dem % 2 == 0) {
                  setPassView(item.Pass);
                  setDem(parseInt(dem) + 1)
                } else {
                  setPassView('*****');
                  setDem(parseInt(dem) + 1)
                }
              }}
              value={isEnabled}
            />
          </View>
          <Text style={styles.textDetail}>Số điện thoại:    {item.Phone}</Text>
          <Text style={styles.textDetail}>Địa chỉ:               {item.Adress}</Text>
          <TouchableOpacity style={styles.login} onPress={() => {
            showDialog();
            setId(item._id);
            setName(item.Name);
            setUser(item.User);
            setPass(item.Pass);
            setPhone(item.Phone);
            setAdress(item.Adress);

          }}>
            <Text style={styles.textLogin}>Sửa thông tin</Text>
          </TouchableOpacity>

        </View>
        }
        keyExtractor={item => item._id}
      />




      <Dialog.Container visible={dialogVisible}>
        <Dialog.Title style={{ color: 'red' }} >Sửa thông tin người dùng</Dialog.Title>
        <Dialog.Input label='Họ và tên' style={styles.labelInput} value={Name} onChangeText={(text) => { setName(text) }} />
        <Dialog.Input label='Tên đăng nhập' style={styles.labelInput} value={User} onChangeText={(text) => { setUser(text) }} />
        <Dialog.Input label='Mật khẩu' style={styles.labelInput} secureTextEntry={true} value={Pass} onChangeText={(text) => { setPass(text) }} />
        <Dialog.Input label='Nhập lại mật khẩu' style={styles.labelInput} secureTextEntry={true} value={Pass2} onChangeText={(text) => { setPass2(text) }} />
        <Dialog.Input label='Điện thoại' style={styles.labelInput} value={Phone} onChangeText={(text) => { setPhone(text) }} />
        <Dialog.Input label='Địa chỉ' style={styles.labelInput} value={Adress} onChangeText={(text) => { setAdress(text) }} />


        <Dialog.Button style={styles.buttonHuy} label="Hủy" onPress={
          handleCancel
        } />

        <Dialog.Button style={styles.buttonSua} label="Sửa" onPress={() => {
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
                "Mật khẩu không giống nhau",
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

            fetch('http://172.20.10.14:9994/updateUserApp', {
              method: 'post',
              body: new URLSearchParams({
                Id: Id,
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
              .then(json => {
                console.log('update tk 2')

              }
              )
            //
            setFetch1('true');
            handleCancel()
            Alert.alert(
              "",
              "Đã sửa thông tin",
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



    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e6e6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  FlatListView: {
    alignItems: "stretch"
  },

  SwitchView: {
    position: 'absolute',
    right: 5,
    top: 5
  },

  textUser: {
    color: '#c77a00',
    fontWeight: "bold",
    fontSize: 16,
    borderColor: '#000000',
    borderRadius: 4,
    borderWidth: 1,
    marginTop: 20,
    padding: 4
  },
  textDetail: {
    color: '#c77a00',
    fontSize: 16,
    borderColor: '#000000',
    borderRadius: 4,
    borderWidth: 1,
    marginTop: 20,
    padding: 4
  },
  viewPass: {
    borderColor: '#000000',
    borderRadius: 4,
    borderWidth: 1,
    marginTop: 20,
    padding: 4
  },
  textPass: {
    color: '#c77a00',
    fontSize: 16,
  },
  login: {
    marginTop: 30,
    width: 300,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    backgroundColor: '#a6aaff',
    alignSelf: 'center',
    padding: 5,
  },
  textLogin: {
    fontSize: 20,
    alignSelf: 'center',
    color: '#ff0000',
  },
  buttonSua: {
    color: '#fff',
    borderColor: '#e66f00',
    borderRadius: 4,
    borderWidth: 1,
    width: 70,
    backgroundColor: '#e66f00',
    marginLeft: 10
  },

  buttonHuy: {
    color: '#e66f00',
    width: 70,
  },
  labelInput: {
    color: '#ff4800',
    borderColor: '#e66f00',
    borderBottomWidth: 1,
    paddingBottom: 2
  }



});

import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, Alert, Image, Text, TouchableOpacity, TextInput, View } from 'react-native';
import Dialog from "react-native-dialog";
//npm install react-native-dialog --save
export default function ListBill({ navigation, route }) {

  const { uId } = route.params;
  const [listBill, setListBill] = useState();
  const [fetch1, setFetch1] = useState('true');


  const [bId, setBId] = useState();
  const [pName, setPName] = useState('');
  const [pidproduct, setPidproduct] = useState();
  const [pPrice, setPPrice] = useState();
  const [bAmount, setBAmount] = useState();
  const [bTotal, setBTotal] = useState();
  const [uName, setuName] = useState();


  //dialog

  if (fetch1 == 'true') {
    fetch('http://172.20.10.14:9994/getUserBillApp', {
      method: 'post',
      body: new URLSearchParams({
        uId: uId,
      }).toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => response.json())
      .then(json => {
        setListBill(json)
        console.log(listBill)
        setFetch1('false')
      }
      )
  }
  //





  const [dialogVisible, setDialogVisible] = useState(false);
  showDialog = () => {
    setDialogVisible(true);
  };

  handleCancel = () => {
    setDialogVisible(false);
  };



  const [dialogVisibleCT, setDialogVisibleCT] = useState(false);
  showDialogCT = () => {
    setDialogVisibleCT(true);
  };

  handleCancelCT = () => {
    setDialogVisibleCT(false);
  };


  const [dialogVisibleS, setDialogVisibleS] = useState(false);
  showDialogS = () => {
    setDialogVisibleS(true);
  };

  handleCancelS = () => {
    setDialogVisibleS(false);
  };



    return (
      <View style={styles.container}>
        <FlatList
          data={listBill}

          renderItem={({ item }) => <View style={styles.viewList}>

            <TouchableOpacity >
              <Image
                style={{ width: 100, height: 100, borderWidth: 0.05, borderRadius: 4, overflow: 'hidden', margin: 5 }}
                //style={{ width: 165, height: 100, borderWidth: 0.05, borderRadius: 5, overflow: 'hidden' }}

                source={{ uri: 'http://172.20.10.14:9994/' + item.Img }}>
              </Image>
            </TouchableOpacity >
            <View style={styles.viewText}>
              <Text style={styles.textProd}>Sản Phẩm: {item.productname}</Text>
              <Text style={styles.textDetail}>Tổng tiền: {item.Total} VNĐ</Text>
              <Text style={styles.textDetail}>Người mua: {item.userName}</Text>
              <View style={styles.action}>


                <TouchableOpacity style={styles.row} onPress={() => {
                  showDialogCT();
                  setBId(item._id);
                  setPName(item.productname);
                  setBAmount(item.Amount);
                  setBTotal(item.Total);
                  setuName(item.userName)
                }}>
                  <Image source={require("./assets/baseline_more_black_18dp.png")} style={{ width: 20, height: 20 }} ></Image>
                  <Text style={{ fontSize: 14 }}>Chi tiết</Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.row} onPress={() => {
                  showDialogS();
                  setBId(item._id);
                  setPName(item.productname);
                  setBAmount(item.Amount);

                  setBTotal(item.Total);
                  setPidproduct(item.idproduct);
                  setPPrice(item.Price)
                  console.log('Giá: ' + item.Price)
                  console.log('Id prod: ' + item.idproduct)
                  setuName(item.userName);
                }}>
                  <Image source={require("./assets/baseline_update_black_18dp.png")} style={{ width: 20, height: 20 }}  ></Image>
                  <Text>Sửa</Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.row} onPress={() => {
                  showDialog();
                  setBId(item._id);
                  setPName(item.productname);
                  setBAmount(item.Amount);
                  setBTotal(item.Total);
                  setuName(item.userName)
                }}>
                  <Image source={require("./assets/baseline_delete_forever_black_18dp.png")} style={{ width: 20, height: 20 }} ></Image>
                  <Text style={{ color: 'red' }}>Xóa</Text>
                </TouchableOpacity>
              </View>
            </View>



          </View>
          }
          numColumns={1}
          keyExtractor={item => item._id}
        />


        <Dialog.Container visible={dialogVisible}>
          <Dialog.Title style={{ color: 'red' }}>Xóa hóa đơn</Dialog.Title>
          <Dialog.Description style={styles.labelInput}>Bạn có muốn xóa hóa đơn: {pName} ?</Dialog.Description>
          <Dialog.Description style={styles.description}>Số lượng: {bAmount}</Dialog.Description>
          <Dialog.Description style={styles.description}>Tổng tiền: {bTotal} VNĐ</Dialog.Description>
          <Dialog.Description style={styles.description}>Người mua: {uName}</Dialog.Description>

          <Dialog.Button style={styles.buttonHuy} label="Hủy" onPress={
            handleCancel
          } />

          <Dialog.Button label="Xóa" style={styles.buttonSua} onPress={() => {
            {
              //
              fetch('http://172.20.10.14:9994/deleteBillApp', {
                method: 'post',
                body: new URLSearchParams({
                  id: bId,
                }).toString(),
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
              })
                .then(response => response.json())
                .then(json =>
                  console.log('Xoa bill')
                )
              //
              setFetch1('true')
              handleCancel()
              Alert.alert(
                "",
                "Đã xóa hóa đơn ",
                [
                  {
                    text: "",
                    style: "cancel"
                  },
                  { text: "Ok" }
                ],
                { cancelable: true }
              );
            }
          }
          } />
        </Dialog.Container>


        <Dialog.Container visible={dialogVisibleCT}>
          <Dialog.Title style={{ color: 'red' }}>Chi tiết hóa đơn</Dialog.Title>
          <Dialog.Description style={styles.description}>Mã hóa đơn: {bId}</Dialog.Description>
          <Dialog.Description style={styles.description}>Sản phẩm: {pName}</Dialog.Description>
          <Dialog.Description style={styles.description}>Số lượng: {bAmount}</Dialog.Description>
          <Dialog.Description style={styles.description}>Tổng tiền: {bTotal}</Dialog.Description>

          <Dialog.Description style={styles.description}>Tài khoản mua: {uName}</Dialog.Description>


          <Dialog.Button style={styles.buttonSua} label="Hủy" onPress={
            handleCancelCT
          } />
        </Dialog.Container>


        <Dialog.Container visible={dialogVisibleS}>
          <Dialog.Title style={{ color: 'red' }}>Sửa hóa đơn</Dialog.Title>
          <Dialog.Description>Tên sản phẩm: {pName}</Dialog.Description>
          <Dialog.Description>Giá: {pPrice}</Dialog.Description>
          <Dialog.Description>Tài khoản mua: {uName}</Dialog.Description>
          <Dialog.Input keyboardType='numeric' style={styles.labelInput} label='Nhập số lượng' onChangeText={(text) => { setBAmount(text); setBTotal(parseInt(pPrice) * parseInt(text)) }
          } >{bAmount}</Dialog.Input>

          <Dialog.Description>Tổng tiền: {bTotal} </Dialog.Description>


          <Dialog.Button style={styles.buttonHuy} label="Hủy" onPress={
            handleCancelS
          } />
          <Dialog.Button style={styles.buttonSua} label="Sửa" onPress={() => {
            {


              if (bAmount == '') {
                Alert.alert(
                  "",
                  "Vui lòng nhập số lượng",
                  [
                    {
                      text: "",
                      style: "cancel"
                    },
                    { text: "Ok" }
                  ],
                  { cancelable: true }
                );
                return;
              } else if (!Number.isInteger(Number(bAmount)) || Number(bAmount) < 1) {
                Alert.alert(
                  "",
                  "Số lượng sản phẩm mua phải là số nguyên lớn hơn 0",
                  [
                    {
                      text: "",
                      style: "cancel"
                    },
                    { text: "Ok" }
                  ],
                  { cancelable: true }
                );
                return;
              }
              //
              fetch('http://172.20.10.14:9994/editBillApp', {
                method: 'post',
                body: new URLSearchParams({
                  BId: bId,
                  idUser: uId,
                  idProducts: pidproduct,
                  Amount: bAmount,
                  Total: bTotal,

                }).toString(),
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
              })
                .then(response => response.json())
                .then(json =>
                  console.log('Sua bill')
                )
              //
              setFetch1('true')
              handleCancelS()
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
    backgroundColor: '#757471',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  viewList: {
    flexDirection: 'row',
    backgroundColor: '#dce6e5',
    borderWidth: 0.05,
    borderRadius: 5,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 16,
    marginTop: 8,
    justifyContent: "flex-start"
  },
  viewText: {
    flexDirection: 'column',
    justifyContent: "center",

  },
  textProd: {
    color: '#edb202'
  },
  textDetail: {
    color: '#000000',
    fontSize: 11
  },
  action: {
    flexDirection: 'row',
    justifyContent: "space-around"
  },
  row: {
    flexDirection: 'row',
    marginLeft: 8,
    borderWidth: 0.1,
    borderRadius: 5,
    borderColor: '#ff0077',
    alignItems: "center",
    backgroundColor: '#fca430',
    paddingRight: 4,
  },
  labelInput: {
    color: '#ff4800',
    borderColor: '#e66f00',
    borderBottomWidth: 1,
    paddingBottom: 2
  },
  description: {
    color: '#4a2400',
    borderColor: '#e66f00',
    borderBottomWidth: 1,
    paddingBottom: 2
  },

  buttonSua: {
    color: '#fff',
    borderColor: '#e66f00',
    borderRadius: 4,
    borderWidth: 1,
    width: 70,
    marginLeft: 10,
    backgroundColor: '#e66f00'
  },

  buttonHuy: {
    color: '#e66f00'
  },
});

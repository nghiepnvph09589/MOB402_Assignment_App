import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, FlatList, Alert, TouchableOpacity, Button, Image, Text, View, ImageBackground } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';


//autocomplete
import Autocomplete from 'react-native-autocomplete-input';
//npm install --save react-native-material-menu
import Dialog from "react-native-dialog";
import { TextInput } from 'react-native-gesture-handler';
export default function ListProducts({ navigation, route }) {
  //lay route
  const { uId } = route.params;
  const { uUser } = route.params;
  const { uName } = route.params;

  const [uUser2, setUUser2] = useState(uUser + '');
  //set  san pham
  const [pId, setPId] = useState('');
  const [pName, setPName] = useState('');
  const [pType, setPType] = useState('');
  const [pPrice, setPPrice] = useState('');
  const [pAmount, setPAmount] = useState('');
  const [pTotal, setPTotal] = useState('0');

  //tim kiếm sản phẩm
  const [search, setSearch] = useState('')


  //set list sp
  const [products, setProducts] = useState([]);
  const [fetch1, setFetch1] = useState('true');

  //set list product in autocomplete
  const [autocomplete, setAutocomplete] = useState([]);

  const [query, setQuery] = useState('');






  if (fetch1 == 'true') {
    fetch('http://172.20.10.14:9994/getJsonProducts')
      .then((response) => response.json())
      .then((json) => {
        setProducts(json)
        setAutocomplete(json)
        console.log(products)
        setFetch1('false')
      })
      .catch((error) => {
        console.error(error);
      });

  }

  //menu
  const menu = useRef();
  const hideMenu = () => menu.current.hide();
  const showMenu = () => menu.current.show();


  useEffect(() => {

    showDialog = () => {
      setDialogVisible(true);
    };
    handleCancel = () => {
      setDialogVisible(false);
    };
    ////dialog show logout
    
    showDialogLogout = () => {
      setDialogVisibleLogout(true);
    };

    handleCancelLogout = () => {
      setDialogVisibleLogout(false);
    };
  })


  //dialog show sp
  const [dialogVisible, setDialogVisible] = useState(false);





  //dialog show logout
  const [dialogVisibleLogout, setDialogVisibleLogout] = useState(false);






  if (products != null) {

    return (
      <View style={styles.container}>

        <View style={styles.toolbar1}>
          <Text style={styles.asignment}>LaptopOne</Text>
          <Menu ref={menu} button={<TouchableOpacity onPress={showMenu}><Image source={require("./assets/more_white.png")} style={{ width: 27, height: 27 }} ></Image></TouchableOpacity>}>
            <MenuItem onPress={() => { hideMenu(); navigation.navigate('UserDetail', { uId: uId }) }}>Thông tin tài khoản</MenuItem>
            <MenuItem onPress={() => { hideMenu(); navigation.navigate('ListBill', { uId: uId }) }}>Danh sách hóa đơn</MenuItem>
            <MenuItem onPress={() => { hideMenu(); navigation.navigate('About') }}>Giới thiệu</MenuItem>
            <MenuItem onPress={() => { hideMenu(); showDialogLogout() }}>Đăng xuất</MenuItem>
          </Menu>
        </View>




        <View style={styles.viewSearch}>
          <View style={styles.viewSearchInput}>
            <TextInput style={styles.textSearch} placeholder='Tìm kiếm sản phẩm' onChangeText={(text) => { setSearch(text) }} />
          </View>
          <TouchableOpacity style={styles.touchSearch} onPress={() => {
            fetch('http://172.20.10.14:9994/searchProductsApp', {
              method: 'post',
              body: new URLSearchParams({
                Search: search,
              }).toString(),
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            })
              .then(response => response.json())
              .then(json => {
                setProducts(json)
                console.log(json)
              }
              )
          }}>
            <Image source={require("./assets/baseline_search_white_18dp.png")} />
          </TouchableOpacity>
        </View>

        <FlatList
          style={{ alignSelf: 'flex-start', marginLeft: 7, marginRight: 7 }}
          data={products}

          renderItem={({ item }) => <View style={styles.viewList}>

            <TouchableOpacity >
              <ImageBackground
                style={{ width: 165, height: 165, borderWidth: 0.05, overflow: 'hidden' }}
                //style={{ width: 165, height: 100, borderWidth: 0.05, borderRadius: 5, overflow: 'hidden' }}

                source={{ uri: 'http://172.20.10.14:9994/' + item.Img }}>

                <View style={styles.viewTextImg}>
                  <Text style={styles.textImg}>Tên: {item.Name}</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity >


            <TouchableOpacity onPress={() => {
              showDialog();
              setPId(item._id);
              setPName(item.Name);
              setPType(item.Type);
              setPPrice(item.Price);

            }}>
              <Text style={styles.textDatMua}>Chi tiết</Text>
            </TouchableOpacity>



          </View>
          }
          numColumns={2}
          keyExtractor={item => item._id}
        />

        <Dialog.Container visible={dialogVisible}>
          <Dialog.Title style={{ color: 'red' }}>Thông tin sản phẩm</Dialog.Title>
          <Dialog.Description style={styles.labelInput}>Tên sản phẩm: {pName}</Dialog.Description>
          <Dialog.Description>Loại: {pType}</Dialog.Description>
          <Dialog.Description>Giá: {pPrice}</Dialog.Description>
          <Dialog.Description>Tài khoản mua: {uName}</Dialog.Description>
          <Dialog.Input label='Nhập số lượng' style={styles.labelInput} keyboardType='numeric' onChangeText={(text) => { setPAmount(text); setPTotal(parseInt(pPrice) * parseInt(text)) }
          } />
          <Dialog.Description>Tổng tiền: {pTotal} VNĐ</Dialog.Description>

          <Dialog.Button label="Hủy" onPress={() => {
            handleCancel()
          }

          } />

          <Dialog.Button style={styles.buttonSua} label="Đặt mua" onPress={() => {
            {
              if (pAmount == '') {
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
              } else if (!Number.isInteger(Number(pAmount)) || Number(pAmount) < 1) {
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
              fetch('http://172.20.10.14:9994/addBillApp', {
                method: 'post',
                body: new URLSearchParams({
                  idUser: uId,
                  idProducts: pId,
                  Amount: pAmount,
                  Total: pTotal,

                }).toString(),
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
              })
                .then(response => response.json())
                .then(json =>
                  console.log('Them bill')
                )

                setPAmount('')
              //
              //setFetch1('true')
              setPTotal('0');
              handleCancel();
              Alert.alert(
                "",
                "Đặt hàng thành công",
                [
                  {
                    text: "",
                    style: "cancel"
                  },
                  { text: "" }
                ],
                { cancelable: true }
              );

            }
          }
          } />
        </Dialog.Container>


        <Dialog.Container visible={dialogVisibleLogout}>
          <Dialog.Title>Bạn có muốn đăng xuất tài khoản: "{uUser2}" ?</Dialog.Title>
          <Dialog.Button style={styles.buttonHuy} label="Hủy" onPress={() => {
            handleCancelLogout()
          }
          } />
          <Dialog.Button style={styles.buttonSua} label="Đăng xuất" onPress={() => {
            handleCancelLogout()
            navigation.navigate('Login')
          }} />

        </Dialog.Container>



      </View>
    );
  }
  else {
    return (
      <View style={styles.container}>
        <View style={styles.toolbar1}>

          <Text style={styles.asignment}>Asignment</Text>
          <Menu ref={menu} button={<TouchableOpacity onPress={showMenu}><Image source={require("./assets/more_white.png")} style={{ width: 27, height: 27 }} ></Image></TouchableOpacity>}>
            <MenuItem onPress={() => { hideMenu(); navigation.navigate('Dating') }}>Dating Group</MenuItem>
            <MenuItem onPress={() => { hideMenu(); navigation.navigate('About') }}>About</MenuItem>
          </Menu>

        </View>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    flex: 1,
    backgroundColor: '#262626',
    alignItems: 'center',
    justifyContent: 'flex-start',
    //width: "100%",
  },

  viewTextImg: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 5,
    left: 5
  },
  textImg: {
    color: '#00e3d4',
    fontSize: 15,
    textShadowColor: '#292929',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
  },
  row: {
    justifyContent: 'space-around'
  },


  toolbar1: {
    flexDirection: "row",
    height: 50,
    backgroundColor: '#262626',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#ff9900',
    borderBottomWidth: 2,
    width: "100%",
    paddingLeft: 20,
    paddingRight: 10,
    marginBottom: 10
  },
  asignment: {
    color: 'white',
    fontSize: 23,
    //fontWeight: 'bold',
    //marginLeft: 20
  },

  viewList: {
    backgroundColor: '#dce6e5',
    width: 165,
    height: 195,
    borderWidth: 0.05,
    borderRadius: 5,
    marginLeft: 4,
    marginRight: 4,
    marginBottom: 16,


  },

  textDatMua: {
    alignSelf: 'center',
    color: '#ff9900',
    fontSize: 16
  },
  viewSearch: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: "space-around",

  },
  textSearch: {
    fontSize: 14,
    color: '#fca430'
  },
  touchSearch: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#fca430',
    backgroundColor: '#fca430',
    marginLeft: 10,
  },
  viewSearchInput: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#fca430',
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    flex: 0.9
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
    width: 120,
    backgroundColor: '#e66f00',
    marginLeft: 10
  },
  buttonHuy: {
    color: '#e66f00',
    width: 70,
  },

});

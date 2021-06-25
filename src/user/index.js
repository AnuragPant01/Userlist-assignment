import React, { Component } from "react";
import {
  SafeAreaView,
  BackHandler,
  Text,
  View,
  Alert,
  StyleSheet,
  Image,
} from "react-native";

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remember: false,
      isConnected: false,
      backHandler: null,
      name: [],
      email: [],
      avatar: [],
    };
  }

  componentDidMount() {
    this.state.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackPress
    );
    this.getUser();
  }

  componentDidUpdate() {
    console.log(this.props.page);
  }

  handleBackPress = () => {
    Alert.alert(
      "",
      "Do you really want to quit the application?",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Yes", onPress: () => BackHandler.exitApp() },
      ],
      { cancelable: false }
    );
    return true;
  };

  getUser = async () => {
    let name = [];
    let email = [];
    let avatar = [];
    // console.log(this.props.page);
    try {
      const data = await fetch(
        `https://reqres.in/api/users?page=${this.props.page}`
      );
      const user = await data.json();
      // console.log(data.data);
      // const objData = data.data;
      user.data.map((item) => {
        name.push(`${item.first_name} ${item.last_name}`);
        email.push(item.email);
        avatar.push(item.avatar);
        this.setState({ name });
        this.setState({ email });
        this.setState({ avatar });
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <View>
        <View name="card" style={styles.card}>
          <Image
            style={{
              marginTop: 30,
              width: 300,
              height: 400,
              alignSelf: "center",
            }}
            source={{
              uri: this.state.avatar[this.props.index],
            }}
          />
          <View
            style={{
              flexDirection: "row",
              padding: 10,
              marginLeft: 30,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Name:</Text>
            <Text style={{ marginLeft: 20 }}>
              {this.state.name[this.props.index]}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              padding: 10,
              marginLeft: 30,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Email:</Text>
            <Text style={{ marginLeft: 20 }}>
              {this.state.email[this.props.index]}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  card: {
    width: "auto",
    height: 520,
    borderColor: "gray",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    marginBottom: 10,
    elevation: 2,
  },
});

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import User from "./src/user";
import Dots from "react-native-dots-pagination";
export default function App() {
  const [active, setactive] = useState(0);
  const arr = [0, 1, 2, 3, 4, 5];
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 30,
          marginBottom: 30,
          fontWeight: "bold",
          color: "#1d76a3",
        }}
      >
        List of users in page
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {arr.map((index) => (
          <User index={index} key={index} page={active + 1} />
        ))}
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          active === 0 ? setactive(active + 1) : setactive(active - 1);
        }}
      >
        <Dots length={2} active={active} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 40,
    backgroundColor: "#fff",
  },
});

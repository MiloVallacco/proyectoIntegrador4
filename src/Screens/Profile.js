import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.contenedor}>

        <Text style={styles.texto}>Profile</Text>
      

        <Pressable  style={styles.boton} onPress={() => this.props.navigation.navigate("Login")}>

            <Text 
                 style={styles.textoBoton}>Desloguearte
            </Text>

        </Pressable>
    
    </View>
    );
  }
}

const styles = StyleSheet.create({
   contenedor: {
    flex: 1,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: {
    fontSize: 22,
    color: "white",
    marginBottom: 20,
  },
  boton: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  textoBoton: {
    color: "green",
    fontSize: 16,
  },
});

export default Profile;

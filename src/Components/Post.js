import React, { Component } from "react";
import { View, Text } from "react-native-web";
import { StyleSheet } from "react-native";
class Post extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.contenedor}>
                <Text style={styles.usuario}>{this.props.data.userName}</Text>
                <Text style={styles.descripcion}>{this.props.data.descripcion}</Text>
                <Text style={styles.fecha}>Creado: {this.props.data.createdAt}</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: "lightblue",
        padding: 15,
        marginVertical: 8,
        borderRadius: 8
    },
    usuario: {
        fontWeight: "bold",
        fontSize: 16
    },
    email: {
        color: "#666",
        fontSize: 12
    },
    descripcion: {
        fontSize: 14,
        marginVertical: 8
    },
    fecha: {
        color: "#888",
        fontSize: 10
    }
})
export default Post;
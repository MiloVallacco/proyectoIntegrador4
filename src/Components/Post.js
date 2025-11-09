import React, { Component } from "react";
import { View, Text, Pressable } from "react-native";
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
                <Pressable onPress={() => this.props.navigation.navigate("Comentarios", { postId: this.props.id })}>
                    <Text style={styles.comentar}>Comentar</Text>
                </Pressable>
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
    descripcion: {
        fontSize: 14,
        marginVertical: 8
    },
    fecha: {
        color: "#888",
        fontSize: 10
    },
    comentar: {
        color: "blue",
        textAlign: "right",
        marginTop: 10
    }
})

export default Post;
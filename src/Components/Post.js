import React, { Component } from "react";
import { View, Text, Pressable } from "react-native";
import { StyleSheet } from "react-native";
import { auth, db } from "../fireBase/Config";
import firebase from "firebase";
class Post extends Component {
    constructor(props) {
        super(props);
    }
    likearPost() {
        let likes = this.props.data.likes  || [];
        let userEmail = auth.currentUser.email;
        let yaLikeado = likes.includes(userEmail);
        if (yaLikeado) {
            db.collection("posts").doc(this.props.id).update({
                likes: firebase.firestore.FieldValue.arrayRemove(userEmail)
            })
        } else {
            db.collection("posts").doc(this.props.id).update({
                likes: firebase.firestore.FieldValue.arrayUnion(userEmail)
            })
        }
    }
    
    render() {
        let likes = this.props.data.likes  || [];
        let cantidadLikes = likes.length;
        return (
            <View style={styles.contenedor}>
                <Text style={styles.usuario}>{this.props.data.userName}</Text>
                <Text style={styles.descripcion}>{this.props.data.descripcion}</Text>
                <Pressable onPress={() => this.likearPost()}>
                    <Text style={styles.meGusta}>Me gusta</Text>
                </Pressable>
                <Text style={styles.likes}>{cantidadLikes} me gusta</Text>
                <Text style={styles.fecha}>Creado: {new Date(this.props.data.createdAt).toLocaleString('es-AR' , {hour12: false})}</Text>
                <Pressable onPress={() => this.props.navigation.navigate("Comentarios", { postId: this.props.id })}>
                    <Text style={styles.comentar}>Comentar</Text>
                </Pressable>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: "#000000",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#2F3336"
    },
    usuario: {
        fontWeight: "bold",
        fontSize: 15,
        color: "#FFFFFF",
        marginBottom: 5
    },
    descripcion: {
        fontSize: 15,
        color: "#FFFFFF",
        marginVertical: 10,
        lineHeight: 20
    },
    meGusta: {
        color: "#1DA1F2",
        fontSize: 14,
        marginTop: 10,
        fontWeight: "600"
    },
    likes: {
        fontSize: 13,
        color: "#71767A",
        marginTop: 5
    },
    fecha: {
        color: "#71767A",
        fontSize: 13,
        marginTop: 5
    },
    comentar: {
        color: "#1DA1F2",
        fontSize: 14,
        marginTop: 10,
        fontWeight: "600"
    }
})

export default Post;
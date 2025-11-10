import React, {Component} from "react";
import { View, Text, Pressable, TextInput } from "react-native-web";
import { StyleSheet} from "react-native"
import { auth, db } from "../fireBase/Config.js";
class NuevoPost extends Component{
    constructor(props){
        super(props);
        this.state = {
            descripcion: ""
        }
    }
    crearPost (){
        db.collection("users").where("email", "==", auth.currentUser.email).onSnapshot(
            docs => {
                let userName = "";
                docs.forEach(doc => {
                    userName = doc.data().userName;
                })
                db.collection("posts").add({
                    user: auth.currentUser.email,
                    userName: userName,
                    descripcion: this.state.descripcion,
                    likes: [],
                    createdAt: Date.now()
                })
                .then(() => {
                    this.setState({ descripcion: "" });
                    this.props.navigation.navigate("Home");
                })
                .catch(error => {
                    console.log("Error al crear post:", error);
                })
            }
        )
    }
    onSubmit = () => {
        this.crearPost()
    }
    render(){
          return (
            <View style={styles.contenedor}>
                <Text style={styles.titulo}>Crear Nuevo Post</Text>
                <Text style={styles.subtitulo}>Compartí lo que estás pensando</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Escribe tu mensaje aquí"
                    onChangeText={text => this.setState({ descripcion: text })}
                    value={this.state.descripcion}
                />
                <Pressable onPress={() => this.onSubmit()} style={styles.boton}>
                    <Text style={styles.texto}>Publicar Post</Text>
                </Pressable>
                <Pressable onPress={() => this.props.navigation.navigate("Home")}>
                    <Text style={styles.volver}>Volver al inicio</Text>
                </Pressable>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: "#000000",
        padding: 20,
        paddingTop: 60
    },
    titulo: {
        fontWeight: "bold",
        fontSize: 24,
        color: "#FFFFFF",
        marginBottom: 20
    },
    input: {
        minHeight: 120,
        backgroundColor: "#202327",
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: "#2F3336",
        borderRadius: 4,
        marginVertical: 15,
        color: "#FFFFFF",
        fontSize: 16,
        textAlignVertical: "top"
    },
    boton: {
        backgroundColor: "#1DA1F2",
        paddingVertical: 15,
        borderRadius: 25,
        marginTop: 20,
        alignItems: "center"
    },
    texto: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold"
    },
    volver: {
        textAlign: "center",
        padding: 15,
        color: "#1DA1F2",
        fontSize: 15,
        marginTop: 20
    },
    subtitulo: {
        color: "#71767A",
        fontSize: 15,
        marginBottom: 15
    }
})
export default NuevoPost;
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
                <Text>Compartí lo que estás pensando</Text>
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
        paddingHorizontal: 10,
        marginTop: 20
    },
    titulo: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 10
    },
    input: {
        height: 100,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderStyle: "solid",
        borderRadius: 6,
        marginVertical: 10
    },
    boton: {
        backgroundColor: "#28A745",
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: "center",
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#28A745",
        marginTop: 10
    },
    texto: {
        color: "#fff",
        textAlign: "center"
    },
    volver: {
        textAlign: "center",
        padding: 16,
        borderRadius: 10,
        backgroundColor: "lightblue",
        fontWeight: "bold",
        marginTop: 20
    }
})
export default NuevoPost;
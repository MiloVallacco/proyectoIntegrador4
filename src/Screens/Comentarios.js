import React, {Component} from "react";
import { View, Text, Pressable, TextInput, FlatList } from "react-native";
import { StyleSheet} from "react-native"
import { auth, db } from "../fireBase/Config"
import firebase from "firebase";

class Comentarios extends Component{
    constructor(props) {
        super(props);
        this.state ={
            comentario: "",
            comentarios: []
        }
    }

    componentDidMount() {
        this.getComentarios();
    }

    getComentarios(){
        let postId = this.props.route.params.postId;
        db.collection('posts').doc(postId).onSnapshot(
            doc => {
                let comentarios = [];
                if(doc.data().comentarios) {
                    comentarios = doc.data().comentarios;
                }
                this.setState({ comentarios: comentarios });
            }
        )
    }

    agregarComentario(){
        let postId = this.props.route.params.postId;
        let userEmail = auth.currentUser.email;
        
        db.collection("users").where("email", "==", userEmail).onSnapshot(
            docs => {
                let userName = "";
                docs.forEach(doc => {
                    userName = doc.data().userName;
                })
                
                let nuevoComentario = {
                    user: userEmail,
                    userName: userName,
                    comentario: this.state.comentario,
                    createdAt: Date.now()
                };
                
                db.collection('posts').doc(postId).update({
                    comentarios: firebase.firestore.FieldValue.arrayUnion(nuevoComentario)
                })
                .then(() => {
                    this.setState({ comentario: "" });
                })
            }
        )
    }

    render(){
        return(
            <View style={styles.contenedor}>
                <Text style={styles.titulo}>Comentarios</Text>
                
                <TextInput
                    style={styles.input}
                    placeholder="Escribe tu comentario..."
                    onChangeText={text => this.setState({ comentario: text })}
                    value={this.state.comentario}
                />
                
                <Pressable onPress={() => this.agregarComentario()} style={styles.boton}>
                    <Text style={styles.texto}>Comentar</Text>
                </Pressable>

                <Text>Comentarios:</Text>
                
                <FlatList
                    data={this.state.comentarios}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.comentario}>
                            <Text style={styles.userName}>{item.userName}</Text>
                            <Text style={styles.comentarioText}>{item.comentario}</Text>
                        </View>
                    )}
                />
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
    input: {
        minHeight: 60,
        backgroundColor: "#202327",
        borderWidth: 1,
        borderColor: "#2F3336",
        borderRadius: 4,
        marginVertical: 10,
        padding: 15,
        color: "#FFFFFF",
        fontSize: 16
    },
    boton: {
        backgroundColor: "#1DA1F2",
        padding: 15,
        borderRadius: 25,
        marginVertical: 15,
        alignItems: "center"
    },
    texto: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold"
    },
    titulo: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFFFFF",
        textAlign: "center",
        marginBottom: 30
    },
    comentario: {
        backgroundColor: "#202327",
        padding: 15,
        borderRadius: 12,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: "#2F3336"
    },
    userName: {
        fontWeight: "bold",
        color: "#FFFFFF",
        fontSize: 15,
        marginBottom: 5
    },
    subtitulo: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginVertical: 15
    },
    comentarioText: {
        color: "#FFFFFF",
        fontSize: 15
    }
})

export default Comentarios;
import React, {Component} from "react";
import { View, Text, Pressable, TextInput, FlatList } from "react-native";
import { StyleSheet} from "react-native"
import { auth, db } from "../fireBase/Config"

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
        
        db.collection("users").where("email", "==", auth.currentUser.email).onSnapshot(
            docs => {
                let userName = "";
                docs.forEach(doc => {
                    userName = doc.data().userName;
                })
                
                let nuevoComentario = {
                    user: auth.currentUser.email,
                    userName: userName,
                    comentario: this.state.comentario,
                    createdAt: Date.now()
                };
                
                let nuevosComentarios = [];
                if(this.state.comentarios) {
                    nuevosComentarios = this.state.comentarios;
                }
                nuevosComentarios.push(nuevoComentario);
                
                db.collection('posts').doc(postId).update({
                    comentarios: nuevosComentarios
                })
                .then(() => {
                    this.setState({ comentario: "" });
                    this.props.navigation.navigate("HomeMenu");
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
                            <Text>{item.comentario}</Text>
                        </View>
                    )}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contenedor: {
        padding: 20,
        marginTop: 50
    },
    input: {
        height: 60,
        borderWidth: 1,
        borderColor: "#ccc",
        marginVertical: 10,
        padding: 10
    },
    boton: {
        backgroundColor: "blue",
        padding: 15,
        marginVertical: 10
    },
    texto: {
        color: "white",
        textAlign: "center"
    },
    titulo: {
        fontSize: 20,
        textAlign: "center",
        marginBottom: 20
    },
    comentario: {
        backgroundColor: "lightgray",
        padding: 15,
        marginVertical: 5
    },
    userName: {
        fontWeight: "bold"
    }
})

export default Comentarios;
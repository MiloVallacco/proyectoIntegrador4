import React, {Component} from "react";
import { View, Text, Pressable, TextInput } from "react-native-web";
import { StyleSheet} from "react-native"
import { db, auth } from '../fireBase/Config';
class DynamicForm extends Component{
    constructor(props) {
        super(props);
        this.state ={
            comentario: ""
        }
    }
    onSubmit = () => {
        console.log("Comentario:", this.state.comentario);
        db.collection('posts').add({
            owner: auth.currentUser.email,
            description: this.state.comentario,
            createdAt: Date.now(),
        })
        .then(() => {
            console.log("Post creado correctamente");
            this.setState({ comentario: "" });
        })
        .catch(e => console.log(e))
    }
    render(){
        return(
            <View style={styles.contenedor}>
                <Text style={styles.titulo}>Crear Nuevo Post</Text>
                <TextInput
                    style={styles.input}
                    placeholder="¿Qué estás pensando?"
                    onChangeText={text => this.setState({comentario: text})}
                    value={this.state.comentario}
                />
                <Pressable onPress={() => this.onSubmit()} style={styles.boton}>
                    <Text style={styles.texto}>Publicar</Text>
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
    input: {
        height: 20,
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
        borderColor: "#28A745"
    },
    texto: {
        color: "#fff"
    },
    titulo: {
        fontWeight: "bold",
        fontSize: 20
    }
});
export default DynamicForm;
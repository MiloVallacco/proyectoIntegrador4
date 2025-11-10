import React, {Component} from "react";
import { View, Text, Pressable, TextInput  } from "react-native";
import { StyleSheet} from "react-native"
import { auth, db } from "../fireBase/Config"

class Register extends Component{
    constructor(props) {
        super(props);
        this.state ={
            email: "",
            password: "",
            userName:"",
            error: ""
        }
    }

    register(email, pass, userName){
        auth.createUserWithEmailAndPassword(email, pass)
        .then( response => {
            db.collection('users').add({
                userName: userName,
                email: email,
                createdAt: Date.now()
            })
            .then(() => {
                this.props.navigation.navigate("Login");
            })
        })
        .catch( error => {
            this.setState({error: error.message})
        })
    }

    onSubmit = () => {
        this.setState({error: ""});
      
        if (this.state.userName.length === 0) {
            this.setState({error: "El nombre de usuario es obligatorio"});
            return;
        }
        this.register(this.state.email, this.state.password, this.state.userName);
    }

    render(){
        return(
            <View style={styles.contenedor}>
                <Text style={styles.titulo}>Registrarse</Text>
                
                {this.state.error ? <Text style={styles.error}>{this.state.error}</Text> : null}

                <TextInput  
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={text => this.setState({email: text})}
                    value={this.state.email}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Nombre de usuario"
                    onChangeText={text => this.setState({userName: text})}
                    value={this.state.userName}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Contraseña"
                    secureTextEntry={true}
                    onChangeText={text => this.setState({password: text})}
                    value={this.state.password}
                />
                
                <Pressable onPress={this.onSubmit} style={styles.boton}>
                    <Text style={styles.texto}>Registrarse</Text>
                </Pressable>

                <Pressable onPress={() => this.props.navigation.navigate("Login")}>
                    <Text style={styles.login}>¿Ya tienes cuenta? Inicia sesión</Text>
                </Pressable>
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
        height: 40,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        marginVertical: 10,
        padding: 10
    },
    boton: {
        backgroundColor: "blue",
        padding: 15,
        borderRadius: 5,
        marginVertical: 10
    },
    texto: {
        color: "white",
        textAlign: "center"
    },
    login: {
        textAlign: "center",
        padding: 10,
        color: "blue"
    },
    titulo: {
        fontSize: 20,
        textAlign: "center",
        marginBottom: 20
    },
    error: {
        color: "red",
        textAlign: "center"
    }
})

export default Register;
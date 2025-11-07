import React, {Component} from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import { StyleSheet} from "react-native"
import { auth, db } from "../fireBase/Config"

class Profile extends Component{
    constructor(props) {
        super(props);
        this.state ={
            userPosteos: [],
            userName: ""
        }
    }

    componentDidMount() {
        this.dataUsuario();
        this.dataPosteos();
    }

    dataUsuario(){
        db.collection("users").where("email", "==", auth.currentUser.email).onSnapshot(
            docs => {
                let userName = "";
                docs.forEach(doc => {
                    userName = doc.data().userName;
                })
                this.setState({ userName: userName });
            }
        )
    }

    dataPosteos(){
        db.collection('posts').onSnapshot(
            docs => {
                let posteos = [];
                let userEmail = auth.currentUser.email;
                
                docs.forEach(doc => {
                    let postData = doc.data();
                    if(postData.user === userEmail) {
                        posteos.push({
                            id: doc.id,
                            data: postData
                        })
                    }
                })
                
                this.setState({
                    userPosteos: posteos
                })
            }
        )
    }

    Logout(){
        auth.signOut();
        this.props.navigation.navigate("Login");
    }

    render(){
        let user = auth.currentUser;

        return(
            <View style={styles.contenedor}>
                <Text style={styles.titulo}>Mi Perfil</Text>
                
                <View style={styles.userInfo}>
                    <Text>Usuario: {this.state.userName}</Text>
                    <Text>Email: {user.email}</Text>
                </View>

                <Text style={styles.subtitulo}>Mis Posts:</Text>
                
                <FlatList
                    data={this.state.userPosteos}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.posteos}>
                            <Text>{item.data.descripcion}</Text>
                        </View>
                    )}
                />

                <Pressable onPress={() => this.Logout()} style={styles.boton}>
                    <Text style={styles.texto}>Cerrar Sesión</Text>
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
    userInfo: {
        backgroundColor: "lightblue",
        padding: 15,
        borderRadius: 5,
        marginVertical: 10
    },
    posteos: {
        backgroundColor: "lightgray",
        padding: 15,
        borderRadius: 5,
        marginVertical: 5
    },
    boton: {
        backgroundColor: "red",
        padding: 15,
        borderRadius: 5,
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
    subtitulo: {
        fontSize: 16,
        marginVertical: 10
    }
})

export default Profile;
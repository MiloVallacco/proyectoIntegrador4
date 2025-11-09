import React, {Component} from "react";
import { View, Text, FlatList } from "react-native";
import { StyleSheet } from "react-native";
import { db } from "../fireBase/Config";
import Post from "../Components/Post";

class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            loading: true
        }
    }
    
    componentDidMount() {
        this.obtenerPosts();
    }
    
    obtenerPosts() {
        db.collection('posts').onSnapshot(
            docs => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                this.setState({
                    posts: posts,
                    loading: false
                })
            }
        )
    }
    
    render(){
        return(
            <View style={styles.contenedor}>
                <Text style={styles.titulo}>Inicio</Text>
                {this.state.loading ? (
                    <Text>Cargando posts...</Text>
                ) : this.state.posts.length === 0 ? (
                    <Text>No hay posts todavía</Text>
                ) : (
                    <FlatList
                        data={this.state.posts}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <Post 
                                data={item.data} 
                                id={item.id}
                                navigation={this.props.navigation}
                            />
                        )}
                        style={styles.lista}
                    />
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 20
    },
    titulo: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 20,
        textAlign: "center"
    },
    lista: {
        flex: 1
    }
})

export default Home;
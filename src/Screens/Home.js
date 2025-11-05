import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator, Pressable, StyleSheet } from "react-native";
import { db, auth } from "../fireBase/Config";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true,
    };
  }

 
  componentDidMount() {
    db.collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((docs) => {
        let postsActualizados = [];
        docs.forEach((doc) => {
          postsActualizados.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        this.setState({
          posts: postsActualizados,
          loading: false,
        });
      });
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="green" />
        </View>
      );
    }

    return (
      <View style={styles.contenedor}>
        <FlatList
          data={this.state.posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (

            <View style={styles.post}>

              <Text style={styles.autor}>{item.data.owner}</Text>
              <Text style={styles.texto}>{item.data.description}</Text>

                <View style={styles.botones}>

                        <Pressable

                            onPress={() => this.props.navigation.navigate("Login")}
                            style={styles.botonLike} >
                            <Text>likes: {item.data.likes ? item.data.likes.length : 0}</Text> 

                        </Pressable>

             
                <Pressable
                  onPress={() => this.props.navigation.navigate("Comentarios", { postId: item.id })}
                  style={styles.botonComentar}
                >
                  <Text> Comentar</Text>
                </Pressable>

                </View>

            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  post: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    padding: 10,
  },
  autor: {
    fontWeight: "bold",
  },
  texto: {
    marginVertical: 8,
  },
  botones: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  botonLike: {
    backgroundColor: "#e6e6e6",
    padding: 8,
    borderRadius: 8,
  },
  botonComentar: {
    backgroundColor: "#b3e5fc",
    padding: 8,
    borderRadius: 8,
  },
});

export default Home;

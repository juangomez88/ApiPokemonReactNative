import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image } from 'react-native';

const pokePath = "https://pokeapi.co/api/v2/"
const pokeQuery = "pokemon?limit=300&offset=0"
const firstGenPokemonPath = `${pokePath}${pokeQuery}`

export default function App() {
  const [firstGenPokemonDetails, setFirstGenPokemonDetails] = useState([]);

  useEffect(() => {
    const fetchFirstGenPokemons = async () => {
      const firstGenPokemonIdsResponse = await fetch(firstGenPokemonPath);
      const firstGenPokemonIdsBody = await firstGenPokemonIdsResponse.json();

      const firstGenPokemonDetails = await Promise.all(
        firstGenPokemonIdsBody.results.map(async (p) => {
          const pDetails = await fetch(p.url);

          return await pDetails.json();
        })
      );

      setFirstGenPokemonDetails(firstGenPokemonDetails);
    };

    fetchFirstGenPokemons();
  }, []);

  const renderPokemon = ({ item }) => {
    return (
      <View style={{backgroundColor: "lightgrey", marginTop: 10}}>
        <Text style={styles.pokemonContainer}>
          {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
        </Text>

        <Image
          style={styles.imageStyle}
          source={{
            uri: item.sprites.front_default
          }}
        />
      </View>
    )
  }


  return (
    <View style={styles.container}>
      <Text style={{fontSize: 38, alignSelf: "center", marginBottom: 20, }}>Firts gen Pokemons</Text>
      <FlatList
        data={firstGenPokemonDetails}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPokemon}
      />

      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    top: 50
  },
  pokemonContainer: {
    fontSize: 32,
    textAlign: "center", marginTop: 10
  },
  textSyle:{
    textAlign: 'center'
  },
  imageStyle: {
    width: 200, 
    height: 200,
    alignSelf: "center"
  }
});

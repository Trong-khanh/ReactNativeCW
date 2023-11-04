import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import Database from "./Database";
import { useFocusEffect } from "@react-navigation/native";

const HikeDetail = ({ navigation }) => {
  const [hikes, setHikes] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredHikes, setFilteredHikes] = useState([]);

  const loadHikes = async () => {
    try {
      const allHikes = await Database.getHikes();
      setHikes(allHikes);
      setFilteredHikes(allHikes);
    } catch (error) {
      console.error("Error fetching hikes:", error);
      Alert.alert("Error", "Unable to load hikes");
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadHikes();
    }, [])
  );

  useEffect(() => {
    const loadHikes = async () => {
      try {
        const allHikes = await Database.getHikes();
        setHikes(allHikes);
        setFilteredHikes(allHikes); 
      } catch (error) {
        console.error("Error fetching hikes:", error);
        Alert.alert("Error", "Unable to load hikes");
      }
    };

    loadHikes();
  }, []);

  const handleSearch = (text) => {
    setSearch(text);
    if (text) {
      const newData = hikes.filter((item) => {
        const itemData = item.hikeName.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredHikes(newData);
    } else {
      setFilteredHikes(hikes);
    }
  };

  const deleteAllHikes = async () => {
    try {
      await Database.deleteAllHike(); 
      setHikes([]); 
      setFilteredHikes([]);
      Alert.alert("Success", "All hikes have been deleted.");
    } catch (error) {
      console.error("Error deleting all hikes:", error);
      Alert.alert("Error", "Failed to delete all hikes");
    }
  };

  const deleteHike = async (hikeId) => {
    try {
      await Database.deleteHike(hikeId);
      const newHikesList = hikes.filter((hike) => hike.id !== hikeId);
      setHikes(newHikesList);
      setFilteredHikes(newHikesList);
      Alert.alert("Success", "Hike successfully deleted");
    } catch (error) {
      console.error("Error deleting hike:", error);
      Alert.alert("Error", "Failed to delete hike");
    }
  };

  const editHike = (hikeId) => {
    navigation.navigate("EditHikeScreen", { id: hikeId });
  };

  const renderHikeItem = ({ item }) => {
    const date = new Date(item.selectedDate).toDateString();
    return (
      <View style={styles.hikeItem}>
        <Text style={styles.hikeText}>Name: {item.hikeName}</Text>
        <Text style={styles.hikeText}>Date: {date}</Text>
        <Text style={styles.hikeText}>Location: {item.location}</Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Delete"
            color="red"
            onPress={() => deleteHike(item.id)}
          />
          <Button
            title="Edit"
            color="green"
            onPress={() => editHike(item.id)}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search hikes..."
          value={search}
          onChangeText={handleSearch}
          style={styles.searchInput}
        />
      </View>
      <View style={styles.deleteAllButton}>
        <Button title="Delete All Hikes" color="red" onPress={deleteAllHikes} />
      </View>
      <FlatList
        data={filteredHikes}
        renderItem={renderHikeItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchContainer: {
    padding: 8,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingLeft: 8,
  },
  hikeItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  hikeText: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  list: {
    marginTop: 10,
  },
  deleteAllButton: {
    marginBottom: 10,
  },
});

export default HikeDetail;

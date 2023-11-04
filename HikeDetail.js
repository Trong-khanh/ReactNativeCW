import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { styles } from "./styles/HikeDetailStyle";

const HikeDetail = ({ route }) => {
  const { detail } = route.params;
  const date = new Date(detail.date);
  const [search, setSearch] = useState("");

  const deleteAll = () => {
    // Code to delete all hikes
  };

  const deleteHike = (hikeId) => {
    // Code to delete a specific hike
  };

  const editHike = (hikeId) => {
    // Code to edit a specific hike
  };

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput
          placeholder="Search..."
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <Button title="Delete All" onPress={deleteAll} />

      <View style={styles.information}>
        <View style={styles.children}>
          <Text>Name: {detail.children}</Text>
        </View>
        <View style={styles.children}>
          <Text>Date: {date.toDateString()}</Text>
        </View>
        <View style={styles.children}>
          <Text>Location: {detail.location}</Text>
        </View>
        <View style={styles.children}>
          <Text>Parking Available: {detail.parkingAvailable}</Text>
        </View>
        <View style={styles.children}>
          <Text>Length: {detail.length}</Text>
        </View>
        <View style={styles.children}>
          <Text>Difficulty: {detail.difficulty}</Text>
        </View>
        <View style={styles.children}>
          <Text>Description: {detail.description}</Text>
        </View>

        <View style={styles.EditDelete}>
          <View style={styles.DeleteHike}>
            <Button title="Delete Hike" onPress={() => deleteHike(detail.id)} />
          </View>
          <View style={styles.EditHike}>
            <Button title="Edit Hike" onPress={() => editHike(detail.id)} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default HikeDetail;

import React from "react";
import { View, Text } from "react-native";
import { styles } from "./styles/HikeDetailStyle";

const HikeDetail = ({ route }) => {
  const { detail } = route.params;
  const date = new Date(detail.date);

  return (
    <View style={styles.container}>
      <View style={styles.information}>
        <Text>Name: {detail.name}</Text>
        <Text>Date: {date.toDateString()}</Text>
        <Text>Location: {detail.location}</Text>
        <Text>Parking Available: {detail.parkingAvailable}</Text>
        <Text>Length: {detail.length}</Text>
        <Text>Difficulty: {detail.difficulty}</Text>
        <Text>Description: {detail.description}</Text>
      </View>
    </View>
  );
};

export default HikeDetail;
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HikeDetail = ({ route }) => {
  const { detail } = route.params;

  return (
    <View style={styles.container}>
      <Text>Name: {detail.name}</Text>
      <Text>Year: {detail.year}</Text>
      <Text>Month: {detail.month}</Text>
      <Text>Date: {detail.date}</Text>
      <Text>Location: {detail.location}</Text>
      <Text>Parking Available: {detail.parkingAvailable}</Text>
      <Text>Length: {detail.length}</Text>
      <Text>Difficulty: {detail.difficulty}</Text>
      <Text>Description: {detail.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
      },
      search: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 20,
        paddingRight: 200,
        backgroundColor: "#EAEDF1",
      },
      infomation: {
        marginRight: 200,
      },
      children: {
        marginBottom: 10,
      },
      TextInf: {
        fontWeight: "bold",
        fontSize: 17,
      },
      ButtonSM: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 40,
      },
      ButtonDT: {
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 40,
      },
      Button: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 30,
      },
});

export default HikeDetail;
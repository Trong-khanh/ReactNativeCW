import React, { useState } from "react";
import { Button, TextInput, View, Text, Platform } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { styles } from "./styles/HikeAddStyle";
import DateTimePicker from "@react-native-community/datetimepicker";

const HikeApp = ({ navigation }) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [location, setLocation] = useState("");
  const [parkingAvailable, setParkingAvailable] = useState("yes");
  const [length, setLength] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  // View component
  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput
          placeholder="Search..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <View style={styles.infomation}>
        <View style={styles.children}>
          <Text style={styles.TextInf}> Name of hike </Text>
          <TextInput
            placeholder="Son Dong"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.children}>
          <Text style={styles.TextInf}> Location</Text>
          <TextInput
            placeholder="Quang Binh"
            value={location}
            onChangeText={setLocation}
          />
        </View>

        <View style={styles.children}>
          <Text style={styles.TextInf}>Date</Text>
          <Button onPress={showDatepicker} title="Select date" />
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}

        <View style={styles.children}>
          <Text style={styles.TextInf}>Parking Avaialble</Text>
          <RNPickerSelect
            onValueChange={(value) => setParkingAvailable(value)}
            items={[
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" },
            ]}
          />
        </View>

        <View style={styles.children}>
          <Text style={styles.TextInf}> Length of hike </Text>
          <TextInput
            placeholder="100"
            value={length}
            onChangeText={setLength}
          />
        </View>

        <View style={styles.children}>
          <Text style={styles.TextInf}>Difficult Level </Text>
          <TextInput
            placeholder="High"
            value={difficulty}
            onChangeText={setDifficulty}
          />
        </View>

        <View style={styles.children}>
          <Text style={styles.TextInf}>Description</Text>
        </View>
        <TextInput
          placeholder="Description about hike....."
          value={description}
          onChangeText={setDescription}
          multiline
        />
      </View>

      <View style={styles.Button}>
        <View style={styles.ButtonSM}>
          <Button
            title="Submit"
            onPress={() => {
              const dateString = date.toISOString();
              navigation.navigate("HikeDetail", {
                detail: {
                  name,
                  date: dateString,
                  location,
                  parkingAvailable,
                  length,
                  difficulty,
                  description,
                },
              });
            }}
          />
        </View>
        <View style={styles.ButtonDT}>
          <Button
            title="Detail"
            onPress={() => {
              /* Detail function here */
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default HikeApp;

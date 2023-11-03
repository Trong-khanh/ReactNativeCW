import React, { useState } from "react";
import { Button, TextInput, View, Text, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import DatePicker from "react-native-datepicker";
import { styles } from "./styles/HikeAddStyle";

const HikeApp = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date());
  const [parkingAvailable, setParkingAvailable] = useState("yes");
  const [length, setLength] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  // View component
  return (
    <View style={styles.container}>
      <View style={styles.Title}>
        <Text style={styles.TitleText}>HIKE APP</Text>
      </View>

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
          <Text style={styles.TextInf}> Date of hike </Text>
          <DatePicker
            date={date}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate="2023-01-01"
            maxDate="2030-12-31"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={(date) => {
              setDate(date);
            }}
          />
        </View>

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
              /* submit function here */
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

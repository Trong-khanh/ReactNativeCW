import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "green",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  TitleText: {
    fontSize: 30,
    fontWeight: "bold",
    alignItems: "flex-start",
    marginTop: 30
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
    backgroundColor: "pink",
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
    backgroundColor: "gray",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
});

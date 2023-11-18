import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native";
import Estilo from "../components/Estilo";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { MedicoContext } from "../context/MedicoContext";

export default (props) => {
  const { setMedicoId } = useContext(MedicoContext);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const URL = "https://projetointegrado2023-dev-tgsa.2.sg-1.fl0.io/api/medico";
  const navigation = useNavigation();
  const getMedicos = async () => {
    try {
      const response = await fetch(URL);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMedicos();
  }, []);

  return (
    <>
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
            backgroundColor: "#1865AC",
          }}
        >
          <Text style={{ flex: 1, textAlign: "center" }}>Nome</Text>
          <Text style={{ flex: 1, textAlign: "center" }}>CRM</Text>
          <Text style={{ flex: 1, textAlign: "center" }}>Especialidade</Text>
          <Text style={{ width: 100, textAlign: "center" }}>Ações</Text>
        </View>
        {isLoading ? (
          <ActivityIndicator size={80} />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 8,
                  backgroundColor: "#E3F2FD",
                }}
              >
                <Text style={{ flex: 1, textAlign: 'center' }}>{item.nome}</Text>
                <Text style={{ flex: 1, textAlign: 'center' }}>{item.crm}</Text>
                <Text style={{ flex: 1, textAlign: 'center' }}>{item.especialidade}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Horarios");
                      setMedicoId(item.id);
                    }}
                    style={{
                        width: 100, justifyContent: 'center', alignItems: 'center'
                      }}
                  >
                    <AntDesign name="right" size={24} color="black" />
                  </TouchableOpacity>
                </View>
            )}
          />
        )}
      </View>
    </>
  );
};

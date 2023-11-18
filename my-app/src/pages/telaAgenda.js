import { View, Text, ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import { useContext, useEffect, useState } from "react";
import { MeuContexto } from "../context/UserContext";

export default (props) => {
  const { userId } = useContext(MeuContexto);
  const Id = userId.paciente.id;
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const URL =
    "https://projetointegrado2023-dev-tgsa.2.sg-1.fl0.io/api/paciente/" +
    Id +
    "/consultas/agendadas";
  const getAgenda = async () => {
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

  const cancelaConsulta = async (consultaId) => {
    const cancelUrl =
      "https://projetointegrado2023-dev-tgsa.2.sg-1.fl0.io/api/consulta/" +
      consultaId +
      "/cancelar";
    try {
      const response = await fetch(cancelUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log("Consulta cancelada com sucesso.");
        getAgenda(); // Chama getAgenda novamente para atualizar a lista
        // Atualiza a lista de consultas ou dê feedback ao usuário
      } else {
        console.error("Falha ao cancelar a consulta:", response.status);
      }
    } catch (error) {
      console.error("Erro ao cancelar a consulta:", error);
    }
  };

  // Função para formatar a data dd/mm/yyyy hh:mm
  const formatDate = (dateString) => {
    // Cria a data como se estivesse em UTC
    const date = new Date(dateString);
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    date.setTime(date.getTime() + userTimezoneOffset);

    // Formata a data no fuso horário local
    return date.toLocaleDateString('pt-BR', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
};

  useEffect(() => {
    getAgenda();
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
          <Text style={{ flex: 1, textAlign: "center" }}>Data</Text>
          <Text style={{ flex: 1, textAlign: "center" }}>Médico</Text>
          <Text style={{ flex: 1, textAlign: "center" }}>Observações</Text>
          <Text style={{ width: 100, textAlign: "center" }}>Ações</Text>
        </View>
        {isLoading ? (
          <ActivityIndicator size={80} />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({ id }) => id}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: 1,
                  backgroundColor: "#CED0CE",
                  marginLeft: 10,
                  marginRight: 10,
                }}
              />
            )}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 8,
                  backgroundColor: "#E3F2FD",
                }}
              >
                <Text style={{ flex: 1, padding: 8,textAlign: "center" }}>
                  {formatDate(item.dataHora)}
                </Text>
                <Text style={{ flex: 1, padding: 8, textAlign: "center" }}>
                  {item.nomeMedico}
                </Text>
                <Text style={{ flex: 1, padding: 8,textAlign: "center" }}>
                  {item.observacoes}
                </Text>
                <View style={{ width: 100, justifyContent: "center" }}>
                  <TouchableOpacity
                    onPress={() => cancelaConsulta(item.consultaId)}
                    style={{
                      width: 100,
                      backgroundColor: "#B22222", // Cor de fundo do botão
                      padding: 5, // Espaçamento interno
                      borderRadius: 5, // Bordas arredondadas
                      justifyContent: "center", // Centraliza o conteúdo verticalmente
                      marginRight: 10, // Adiciona margem à direita, movendo o botão para a esquerda
                      marginTop: -5, // Move o botão um pouco para cima
                    }}
                    activeOpacity={0.7} // Opacidade ao tocar
                  >
                    <Text
                      style={{
                        color: "white", // Cor do texto
                        textAlign: "center", // Alinhamento do texto
                        fontWeight: "bold", // Peso da fonte
                      }}
                    >
                      Cancelar
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}
      </View>
    </>
  );
};

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "blue",
        headerShown: false,
        tabBarStyle: {
          height: 80, // Aumentando a altura da barra inferior
          paddingBottom: 10, // Ajustando o espaçamento inferior
        },
        tabBarIconStyle: {
          height: 50, // Ajustando o tamanho do ícone para se ajustar à barra
          width: 50, // Garantindo que o ícone tenha a largura adequada
          marginTop: 5, // Ajustando a margem para evitar que o ícone seja cortado
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={40} name="home" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

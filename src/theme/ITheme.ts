export default interface ITheme {
  colors: {
    
    //principal cor de detalhes
    primary: string; 
    
    // plano de fundo
    background: string; 
    
    // fica em cima da cor prymary
    surface: string; 
    
    // cor do texto
    text: string; 
    
    // nem um uso ainda
    accent: string; 

    success: string;

    warning: string;

    danger: string;

    // O tema
    theme: string; 

    // Cards
  };
  card: {
    // Cor de fundo do card
    background: string;

    // Cor de borda do card
    border: string;

    // Cor do texto do card
    text: string;
  };
}

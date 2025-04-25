// src/services/api.ts

export const fetchProductData = async () => {
    // Simula uma requisição à API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: "Produto Exemplo",
          description: "Este é um produto de exemplo",
          price: 99.99,
        });
      }, 2000); // Retorna após 2 segundos
    });
  };
  
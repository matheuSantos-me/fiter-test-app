import axios, { AxiosError } from 'axios';

const HTTPClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      // O servidor respondeu com um status de erro
      console.error('Erro de resposta:', error.response.data);
    } else if (error.request) {
      // A requisição foi feita, mas não houve resposta do servidor
      console.error('Não houve resposta do servidor:', error.request);
    } else {
      // Ocorreu um erro antes da requisição ser feita
      console.error('Erro ao configurar a requisição:', error.message);
    }

    console.error('Erro interno do Axios:', error.config);
    return Promise.reject(error);
  }
);

export default HTTPClient;

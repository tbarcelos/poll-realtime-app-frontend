import axios, { AxiosError } from 'axios';

// Define uma interface para a estrutura esperada da resposta de erro.
// Ajuste de acordo com o formato padrão de erro do seu backend.
interface ErrorResponse {
  message: string;
}

// Função para extrair a mensagem de erro
export const extractErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const serverError = error as AxiosError<ErrorResponse>;
    if (serverError && serverError.response && serverError.response.data) {
      // Retorna a mensagem de erro específica do backend, se disponível
      return (
        serverError.response.data.message ||
        'Error: No specific error message provided by the server.'
      );
    }
  } else if (error instanceof Error) {
    // Trata outros tipos de erros que podem não ser relacionados ao Axios
    return error.message;
  }
  // Retorna uma mensagem de erro genérica para casos não tratados
  return 'An unexpected error occurred.';
};

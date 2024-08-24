export const handleHttpError = (error) => {
  if (!error.response) {

    
    return {
      message: 'Problemas ao conectar. Verifique sua conexão',
      type: 'network'
    };
  }

  const { status, data } = error.response;

  switch (status) {
    case 400:
      return {
        message: data.message || 'Problema ao enviar dados, entre em contato conosco',
        type: 'badRequest'
      };
    case 401:
      return {
        message: 'Não é possivel alterar por conta de permissão, verifique com um administrador do sistema.',
        type: 'unauthorized'
      };
    case 403:
      return {
        message: 'Acesso proibido. Você não tem permissão para acessar este recurso.',
        type: 'forbidden'
      };
    case 404:
      return {
        message: 'Não foi posssivel localizar dados os dados.',
        type: 'notFound'
      };
    case 500:
      return {
        message: 'Erro do servidor. Tente novamente mais tarde.',
        type: 'serverError'
      };
    default:
      return {
        message: 'Ocorreu um erro inesperado. Tente novamente mais tarde.',
        type: 'unknown'
      };
  }
};

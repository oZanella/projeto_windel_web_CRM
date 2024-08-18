
import { blogFetch } from '../axios/config';

export const handleShowDetails = (post, modeEdit, setSelectInfo, selectInfo) => {
  if (modeEdit === post.id)
    return;
  setSelectInfo(selectInfo?.id === post.id ? null : post);
};

export const handleEdit = (post, setModeEdit, setDataEdit) => {
  setModeEdit(post.id);
  setDataEdit(post);
};

//continua com erro, verificar!!
export const handleSave = async (postId, updateData) => {
  try {
    // Envie uma requisição PUT ou POST para salvar os dados atualizados
    const response = await blogFetch.put(`/blogFetch/posts/${postId}`, updateData);
    console.log('Dados salvos com sucesso', response.data);

  } catch (error) {
    console.error('Erro de API', error);
  }
};

export const handleInputChange = (e, setDataEdit) => {
  setDataEdit(prevDataEdit => ({ ...prevDataEdit, [e.target.name]: e.target.value }));
};

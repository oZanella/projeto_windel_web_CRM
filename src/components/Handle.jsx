
import { blogFetch } from '../axios/config';


export const handleShowDetails = (post, setSelectInfo, selectInfo) => {
  if (selectInfo?.id === post.id) {
    setSelectInfo(null); 
  } else {
    setSelectInfo(post);
  }
};

export const handleEdit = (post, setModeEdit, setDataEdit) => {
  setModeEdit(post.id);
  setDataEdit(post);
};


export const handleSave = async (postId, updateData) => {
  try {
    const response = await blogFetch.put(`/blogFetch/posts/${postId}`, updateData);
    console.log('Dados salvos com sucesso', response.data);

  } catch (error) {
    console.error('Erro de API', error);
  }
};

export const handleInputChange = (e, setDataEdit) => {
  setDataEdit(prevDataEdit => ({ ...prevDataEdit, [e.target.name]: e.target.value }));
};


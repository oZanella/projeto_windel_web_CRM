
export const handleShowDetails = (post, modeEdit, setSelectInfo, selectInfo) => {
  if (modeEdit === post.id) 
  return;
  setSelectInfo(selectInfo?.id === post.id ? null : post);
};

export const handleEdit = (post, setModeEdit, setDataEdit) => {
  setModeEdit(post.id);
  setDataEdit(post);
};

export const handleSave = async (postId) => {
  try {
    // Implementar lógica de salvamento
  } catch (error) {
    console.error('Erro de API', error);
  }
};

export const handleInputChange = (e, setDataEdit) => {
  setDataEdit(prevDataEdit => ({ ...prevDataEdit, [e.target.name]: e.target.value }));
};

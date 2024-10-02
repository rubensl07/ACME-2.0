//Filmes

//const link = 'http://localhost:8080'
// const link = 'https://acme-filmes-back.onrender.com'
const link = 'https://teste20241002-esh7gjgfc2hygtf0.brazilsouth-01.azurewebsites.net'

export async function getFilmes(){
    const url = `${link}/acmefilmes/filmes`
    const response = await fetch(url)
    const data = await response.json()

    return data.filmes
}
export async function getFilmesSort(sort){
  const url = `${link}/acmefilmes/filmes/sortby/${sort}`
  const response = await fetch(url)
  const data = await response.json()

  return data.filmes
}
export async function getFilme(id){
    const url = `${link}/acmefilmes/filme/${id}`
    const response = await fetch(url)
    const data = await response.json()

    return data.filme[0]
}
export async function pesquisarFilme(search){
  const url = `${link}/acmefilmes/filme/?search=${search}`
  const response = await fetch(url)
  const data = await response.json()

  return data.filmes
}

export async function filtrarFilmes(filters){
  const url = `${link}/acmefilmes/filmes/filter`
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(filters),
  };
  const response = await fetch(url,options)
  const data = await response.json()

  return data.filmes
}

export async function postFilme(dados) {
    const url = `${link}/acmefilmes/filme`;
  
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dados),
    };
  
    try {
      const response = await fetch(url, options);
      const data = await response.json(); 
      return { success: response.ok, data }; 
    } catch (error) {
      console.error('Erro ao enviar filme: ', error);
      return { success: false, data: null }; 
    }
}
export async function deleteFilme(id) {
  const url = `${link}/acmefilmes/filme/${id}`;

  const options = {
    method: 'DELETE'
  };
  
  try{
    const response = await fetch(url,options)
    if(response.ok){
      console.log(response.ok);
      console.log('Filme excluído com sucesso')
      return response.ok
    } else {
      console.error('Erro ao excluir filme: ', error);
    }
  } catch (error) {
    console.error('Erro ao excluir filme: ', error);
  }
}


export async function editFilme(id, filmeAtualizado) {
  const url = `${link}/acmefilmes/filme/${id}`
  const options = {
    method: 'PUT', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(filmeAtualizado)
  }

  try {
      const response = await fetch(url,options)
      const data = await response.json();
      return { success: response.ok, data }; 
  } catch (error) {
      console.error('Ocorreu um erro ao substituir o filme: ', error);
      return { success: false, data: null }; 
  }
}


export async function getFilmesDiretor(id){
  const url = `${link}/acmefilmes/filmediretor/${id}`
  const response = await fetch(url)
  const data = await response.json()

  return data.filmes
}
export async function getFilmesAtor(id){
  const url = `${link}/acmefilmes/filmeator/${id}`
  const response = await fetch(url)
  const data = await response.json()

  return data.filmes
}

export async function addAtorFilme(dados) {
  const url = `${link}/acmefilmes/filmeator`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados),
  };

  try {
    const response = await fetch(url, options);
    return response.ok;
  } catch (error) {
    console.error('Erro ao adicionar ator: ', error);
  }
}
export async function removeAtorFilme(dados) {
  const url = `${link}/acmefilmes/filmeator`;

  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados)
  }

  try{
    const response = await fetch(url,options);
    return response.ok;
  } catch (error){
    console.log('Erro ao remover ator: ',error)
  }
}
export async function addDiretorFilme(dados) {
  const url = `${link}/acmefilmes/filmediretor`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados),
  };

  try {
    const response = await fetch(url, options);
    return response.ok;
  } catch (error) {
    console.error('Erro ao adicionar ator: ', error);
  }
}
export async function removeDiretorFilme(dados) {
  const url = `${link}/acmefilmes/filmediretor`;

  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados)
  }

  try{
    const response = await fetch(url,options);
    return response.ok;
  } catch (error){
    console.log('Erro ao remover ator: ',error)
  }
}



//Gêneros
export async function getGeneros(){
  const url = `${link}/acmefilmes/generos`
  const response = await fetch(url)
  const data = await response.json()

  return data.generos
}
export async function getGenero(id){
  const url = `${link}/acmefilmes/genero/${id}`
  const response = await fetch(url)
  const data = await response.json()

  return data.genero[0]
}
export async function postGenero(dados) {
  const url = `${link}/acmefilmes/genero`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json(); 
    return { success: response.ok, data }; 
  } catch (error) {
    console.error('Erro ao enviar gênero: ', error);
    return { success: false, data: null }; 
  }
}
export async function editGenero(id, dados) {
  const url = `${link}/acmefilmes/genero/${id}`
  const options = {
    method: 'PUT', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados)
  }

  try {
      const response = await fetch(url,options)
      const data = await response.json();
      return { success: response.ok, data}; 
  } catch (error) {
      console.error('Ocorreu um erro ao substituir o gênero: ', error);
      return { success: false, data: null }; 
  }
}

export async function getGenerosFilme(id){
  const url = `${link}/acmefilmes/generosfilme/${id}`
  const response = await fetch(url)
  const data = await response.json()

  return data.genero
}
export async function deleteGenero(id) {
  const url = `${link}/acmefilmes/genero/${id}`;

  const options = {
    method: 'DELETE'
  };
  
  try{
    const response = await fetch(url,options)
    return response.ok
  } catch (error) {
    console.error('Erro ao excluir gênero: ', error);
  }
}

export async function postGeneroFilme(dados) {
  const url = `${link}/acmefilmes/generofilme`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados),
  };

  try {
    const response = await fetch(url, options);
    return response.ok;
  } catch (error) {
    console.error('Erro ao adicionar gênero: ', error);
  }
}

export async function removeGeneroFilme(dados) {
  const url = `${link}/acmefilmes/generofilme`;

  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados)
  }

  try{
    const response = await fetch(url,options);
    return response.ok;
  } catch (error){
    console.log('Erro ao remover gênero: ',error)
  }
}










//Diretores
export async function getDiretoresSort(sort){
  const url = `${link}/acmefilmes/diretores/sortby/${sort}`
  const response = await fetch(url)
  const data = await response.json()
  return data.diretores
}
export async function getDiretor(id){
  const url = `${link}/acmefilmes/diretor/${id}`
  const response = await fetch(url)
  const data = await response.json()

  return data.diretor[0]
}

export async function getDiretoresFilme(id){
  const url = `${link}/acmefilmes/diretorfilme/${id}`
  const response = await fetch(url)
  const data = await response.json()

  return data.diretores
}
export async function postDiretor(dados) {
  const url = `${link}/acmefilmes/diretor`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json(); 
    return { success: response.ok, data }; 
  } catch (error) {
    console.error('Erro ao enviar Diretor: ', error);
    return { success: false, data: null }; 
  }
}
export async function editDiretor(id, dados) {
  const url = `${link}/acmefilmes/diretor/${id}`
  const options = {
    method: 'PUT', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados)
  }

  try {
      const response = await fetch(url,options)
      const data = await response.json();
      return { success: response.ok, data}; 
  } catch (error) {
      console.error('Ocorreu um erro ao substituir o Diretor: ', error);
      return { success: false, data: null }; 
  }
}
export async function deleteDiretor(id) {
  const url = `${link}/acmefilmes/diretor/${id}`;

  const options = {
    method: 'DELETE'
  };
  
  try{
    const response = await fetch(url,options)
    return response.ok
  } catch (error) {
    console.error('Erro ao excluir diretor: ', error);
  }
}









//Atores
export async function getAtoresSort(sort){

  const url = `${link}/acmefilmes/atores/sortby/${sort}`
  const response = await fetch(url)
  const data = await response.json()

  return data.atores
}
export async function getAtor(id){
  const url = `${link}/acmefilmes/ator/${id}`
  const response = await fetch(url)
  const data = await response.json()

  return data.ator[0]
}
export async function postAtor(dados) {
  const url = `${link}/acmefilmes/ator`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json(); 
    return { success: response.ok, data }; 
  } catch (error) {
    console.error('Erro ao enviar Ator: ', error);
    return { success: false, data: null }; 
  }
}
export async function editAtor(id, dados) {
  const url = `${link}/acmefilmes/ator/${id}`
  const options = {
    method: 'PUT', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados)
  }

  try {
      const response = await fetch(url,options)
      const data = await response.json();
      return { success: response.ok, data}; 
  } catch (error) {
      console.error('Ocorreu um erro ao substituir o Ator: ', error);
      return { success: false, data: null }; 
  }
}
export async function getAtoresFilme(id){
  const url = `${link}/acmefilmes/atorfilme/${id}`
  const response = await fetch(url)
  const data = await response.json()
  return data.atores
}
export async function deleteAtor(id) {
  const url = `${link}/acmefilmes/ator/${id}`;

  const options = {
    method: 'DELETE'
  };
  
  try{
    const response = await fetch(url,options)
    return response.ok
  } catch (error) {
    console.error('Erro ao excluir ator: ', error);
  }
}









//Classificações Indicativas
export async function getClassificacoesIndicativas(){
  const url = `${link}/acmefilmes/classificacoesindicativas`
  const response = await fetch(url)
  const data = await response.json()

  return data.classificacoesIndicativas
}
export async function getClassificacaoIndicativa(id){
  const url = `${link}/acmefilmes/classificacaoindicativa/${id}`
  const response = await fetch(url)
  const data = await response.json()

  console.log(data);
  return data.classificacaoIndicativa[0]
}
export async function postClassificacaoIndicativa(dados) {
  const url = `${link}/acmefilmes/classificacaoindicativa`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json(); 
    return { success: response.ok, data }; 
  } catch (error) {
    console.error('Erro ao enviar Classificação Indicativa: ', error);
    return { success: false, data: null }; 
  }
}
export async function editClassificacaoIndicativa(id, dados) {
  const url = `${link}/acmefilmes/classificacaoindicativa/${id}`
  const options = {
    method: 'PUT', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados)
  }

  console.log(dados);
  try {
      const response = await fetch(url,options)
      const data = await response.json();
      return { success: response.ok, data}; 
  } catch (error) {
      console.error('Ocorreu um erro ao substituir a Classificação Indicativa: ', error);
      return { success: false, data: null }; 
  }
}

export async function deleteClassificacaoIndicativa(id) {
  const url = `${link}/acmefilmes/classificacaoindicativa/${id}`;

  const options = {
    method: 'DELETE'
  };
  
  try{
    const response = await fetch(url,options)
    return response.ok
  } catch (error) {
    console.error('Erro ao excluir classificação indicativa: ', error);
  }
}









//Nacionalidades
export async function getNacionalidades(){
  const url = `${link}/acmefilmes/nacionalidades`
  const response = await fetch(url)
  const data = await response.json()

  return data.nacionalidades
}
export async function getNacionalidade(id){
  const url = `${link}/acmefilmes/nacionalidade/${id}`
  const response = await fetch(url)
  const data = await response.json()

  return data.nacionalidade[0]
}

export async function deleteNacionalidade(id) {
  const url = `${link}/acmefilmes/nacionalidade/${id}`;

  const options = {
    method: 'DELETE'
  };
  
  try{
    const response = await fetch(url,options)
    return response.ok
  } catch (error) {
    console.error('Erro ao excluir nacionalidade: ', error);
  }
}
export async function postNacionalidade(dados) {
  const url = `${link}/acmefilmes/nacionalidade`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json(); 
    return { success: response.ok, data }; 
  } catch (error) {
    console.error('Erro ao enviar nacionalidade: ', error);
    return { success: false, data: null }; 
  }
}
export async function editNacionalidade(id, dados) {
  const url = `${link}/acmefilmes/nacionalidade/${id}`
  const options = {
    method: 'PUT', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados)
  }

  try {
      const response = await fetch(url,options)
      const data = await response.json();
      return { success: response.ok, data}; 
  } catch (error) {
      console.error('Ocorreu um erro ao substituir a nacionalidade: ', error);
      return { success: false, data: null }; 
  }
}


export async function addNacionalidadeAtor(dados) {
  const url = `${link}/acmefilmes/nacionalidadeator`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados),
  };

  try {
    const response = await fetch(url, options);
    return response.ok;
  } catch (error) {
    console.error('Erro ao atribuir nacionalidade: ', error);
  }
}

export async function removeNacionalidadeAtor(dados) {
  const url = `${link}/acmefilmes/nacionalidadeator`;

  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados)
  }

  try{
    const response = await fetch(url,options);
    return response.ok;
  } catch (error){
    console.log('Erro ao remover nacionalidade: ',error)
  }
}

export async function addNacionalidadeDiretor(dados) {
  const url = `${link}/acmefilmes/nacionalidadediretor`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados),
  };

  try {
    const response = await fetch(url, options);
    return response.ok;
  } catch (error) {
    console.error('Erro ao atribuir nacionalidade: ', error);
  }
}

export async function removeNacionalidadeDiretor(dados) {
  const url = `${link}/acmefilmes/nacionalidadediretor`;

  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados)
  }

  try{
    const response = await fetch(url,options);
    return response.ok;
  } catch (error){
    console.log('Erro ao remover nacionalidade: ',error)
  }
}








//Sexos 
export async function getSexos(){
  const url = `${link}/acmefilmes/sexos`
  const response = await fetch(url)
  const data = await response.json()

  return data.sexos
}
export async function getSexo(id){
  const url = `${link}/acmefilmes/sexo/${id}`
  const response = await fetch(url)
  const data = await response.json()

  return data.sexo[0]
}
export async function deleteSexo(id) {
  const url = `${link}/acmefilmes/sexo/${id}`;

  const options = {
    method: 'DELETE'
  };
  
  try{
    const response = await fetch(url,options)
    return response.ok
  } catch (error) {
    console.error('Erro ao excluir sexo: ', error);
  }
}
export async function postSexo(dados) {
  const url = `${link}/acmefilmes/sexo`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json(); 
    return { success: response.ok, data }; 
  } catch (error) {
    console.error('Erro ao enviar sexo: ', error);
    return { success: false, data: null }; 
  }
}
export async function editSexo(id, dados) {
  const url = `${link}/acmefilmes/sexo/${id}`
  const options = {
    method: 'PUT', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados)
  }

  try {
      const response = await fetch(url,options)
      const data = await response.json();
      return { success: response.ok, data}; 
  } catch (error) {
      console.error('Ocorreu um erro ao substituir o sexo: ', error);
      return { success: false, data: null }; 
  }
}







//Usuários
export async function getUsuarios(){
  const url = `${link}/acmefilmes/usuarios`
  const response = await fetch(url)
  const data = await response.json()

  return data.usuarios
}








export async function getUsuario(id){
  const url = `${link}/acmefilmes/usuario/${id}`
  const response = await fetch(url)
  const data = await response.json()

  return data.usuario[0]
}

export async function postUsuario(dados) {
  const url = `${link}/acmefilmes/usuario`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados),
  };

  try {
    const response = await fetch(url, options);
    return response.ok;
  } catch (error) {
    console.error('Erro ao enviar usuário: ', error);
  }
}
export async function deleteUsuario(id) {
  const url = `${link}/acmefilmes/usuario/${id}`
  const options = {
    method: 'DELETE'
  }

  try{
    const response = await fetch(url,options)
    return response.ok
  } catch (error) {
    console.error('Erro ao excluir usuário: ', error);
  }
}

export async function editUsuario(id,usuarioAtualizado) {
  const url = `${link}/acmefilmes/usuario/${id}`
  const options = {
    method: 'PUT', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(usuarioAtualizado)
  }

  try {
    const response = await fetch(url,options)
    return response.ok
} catch (error) {
    console.error('Ocorreu um erro ao substituir o usuário: ', error);
}
}



//Favoritos

export async function getFavoritosUsuario(usuarioId){
  const url = `${link}/acmefilmes/favoritosusuario/${usuarioId}`
  const response = await fetch(url)
  const data = await response.json()

  return data.favoritos
}
export async function postFavorito(dados) {
  const url = `${link}/acmefilmes/favorito`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados),
  };

  try {
    const response = await fetch(url, options);
    return response.ok;
  } catch (error) {
    console.error('Erro ao enviar favorito: ', error);
  }
}
export async function deleteFavorito(dados) {

  const url = `${link}/acmefilmes/favoritos`;

  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados)
  }

  try{
    const response = await fetch(url,options);
    return response.ok;
  } catch (error){
    console.log('Erro ao enviar favorito: ',error)
  }
}
export async function deleteFavoritosUsuario(idUsuario) {
  const url = `${link}/acmefilmes/favoritosUsuario/${idUsuario}`
  const options ={
    method: 'DELETE',
  }
  try{
    const response = await fetch(url,options)
    return response.ok
  } catch (error) {
    console.error('Erro ao excluir favorito: ', error);
  }
}
export async function deleteFavoritosFilme(idFilme) {
  const url = `${link}/acmefilmes/favoritosFilme/${idFilme}`
  const options = {
    method: 'DELETE',
  }
  try{
    const response = await fetch(url,options)
    return response.ok
  } catch (error) {
    console.error('Erro ao excluir favorito: ', error);
  }
}

//Outras
export function validarData(data){
  const reducedData = data.substr(0,10)
  const dataSplit = reducedData.split('-')
  const dataFinal = dataSplit[2]+"/"+dataSplit[1]+"/"+dataSplit[0]
  return dataFinal
}
export async function verificarUsuarioExistente(idUsuario){
  const listaUsuarios = await getUsuarios()
  let existe= false
  listaUsuarios.forEach(usuario => {
    if (usuario.id = idUsuario) {
      existe = true
    }
  });
  return existe
}

export const enderecoHome = '../home/index.html'
export const idUsuario = localStorage.getItem('idusuario')


export function validarDataInferior(dataInferior,dataSuperior){
  dataInferior = dataInferior.split('-')
  dataInferior = parseInt(dataInferior[0]+dataInferior[1]+dataInferior[2])
  dataSuperior = dataSuperior.split('-')
  dataSuperior = parseInt(dataSuperior[0]+dataSuperior[1]+dataSuperior[2])
  if(dataInferior>dataSuperior){
      return false
  } else {
      return true
  }
}

//Filmes

const link = 'http://localhost:8080'
// const link = 'https://acme-filmes-back.onrender.com'

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
      return response.ok;
    } catch (error) {
      console.error('Erro ao enviar filme: ', error);
    }
}
export async function deleteFilme(id) {
  try{
    await fetch(`${link}/acmefilmes/filme/${id}`, {
      method: 'DELETE',
    });
    console.log('Filme excluído com sucesso')
  } catch (error) {
    console.error('Erro ao excluir filme: ', error);
  }
}
export async function editFilme(id,filmeAtualizado) {
  try {
    await fetch(`${link}/acmefilmes/filme/${id}`, {
        method: 'PUT', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(filmeAtualizado)
    });
    console.log('Filme substituído com sucesso!');
} catch (error) {
    console.error('Ocorreu um erro ao substituir o filme: ', error);
}
}
//Gêneros
export async function getGeneros(){
  const url = `${link}/acmefilmes/generos`
  const response = await fetch(url)
  const data = await response.json()

  return data.generos
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
  deleteFavoritosUsuario(id)
  try{
    await fetch(`${link}/acmefilmes/usuario/${id}`, {
      method: 'DELETE',
    });
    console.log('Usuário excluído com sucesso')
  } catch (error) {
    console.error('Erro ao excluir usuário: ', error);
  }
}
export async function editUsuario(id,usuarioAtualizado) {
  try {
    await fetch(`${link}/acmefilmes/usuario/${id}`, {
        method: 'PUT', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuarioAtualizado)
    });
    console.log('Usuário substituído com sucesso!');
} catch (error) {
    console.error('Ocorreu um erro ao substituir o usuário: ', error);
}
}

export async function getFavoritosUsuario(usuarioId){
  const url = `${link}/acmefilmes/favoritos/${usuarioId}`
  const response = await fetch(url)
  const data = await response.json()

  return data.favoritos
}
export async function postFavorito(dados) {
  const url = `${link}/acmefilmes/favoritos`;

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
  // try{
  //   await fetch(`${link}/v2/acmefilmes/favoritos`, {
  //     method: 'DELETE',
  //   });
  //   console.log('Favorito excluído com sucesso')
  // } catch (error) {
  //   console.error('Erro ao excluir favorito: ', error);
  // }
}
export async function deleteFavoritosUsuario(idUsuario) {
  try{
    await fetch(`${link}/acmefilmes/favoritosUsuario/${idUsuario}`, {
      method: 'DELETE',
    });
    console.log('Favorito excluído com sucesso')
  } catch (error) {
    console.error('Erro ao excluir favorito: ', error);
  }
}
export async function deleteFavoritosFilme(idFilme) {
  try{
    await fetch(`${link}/acmefilmes/favoritosFilme/${idFilme}`, {
      method: 'DELETE',
    });
    console.log('Favorito excluído com sucesso')
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
  let boolean = false
  if(await getUsuarios()){
      (await getUsuarios()).forEach(usuario => {
          if(usuario.id == idUsuario){
              boolean = true
          }
      });
  }
  return boolean
}
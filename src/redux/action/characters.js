export const POST_CHARACTER = 'POST_CHARACTER'
export const GET_CHARACTER = 'GET_CHARACTER'
export const SINGLE_CHARACTER = 'SINGLE_CHARACTER'
export const GET_POST_CHARACTER_IMG = 'GET_POST_CHARACTER_IMG'
export const PUT_CHARACTER = 'PUT_CHARACTER'
export const DELETE_CHARACTER = 'DELETE_CHARACTER'

export const postCharacter = (character, token) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/character/create', {
        method: 'POST',
        body: JSON.stringify(character),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (res.ok) {
        const data = await res.json()
        console.log(data)
        dispatch({
          type: POST_CHARACTER,
          payload: data,
        })
        alert('Personaggio salvato con successo')
      } else {
        throw new Error('Salvataggio fallito!')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const getCharacter = () => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/character/getall')
      console.log('res', res)
      if (res.ok) {
        const data = await res.json()
        console.log('fetch', data)
        dispatch({
          type: GET_CHARACTER,
          payload: data,
        })
        console.log('List character loaded')
      } else {
        throw new Error('Loading of list is failed')
      }
    } catch (error) {
      console.log('Error', error)
      throw error
    }
  }
}

export const getSingleCharacter = (id, token) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/character/detail/' + id, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (res.ok) {
        const data = await res.json()
        console.log(data)
        dispatch({
          type: SINGLE_CHARACTER,
          payload: data,
        })
        console.log('Detail has been loaded correctly')
      } else {
        throw new Error('Detail load is fail')
      }
    } catch (error) {
      console.log('Error', error)
    }
  }
}

export const postCharacterImage = async (id_character, formImg, token) => {
  try {
    const res = await fetch(
      `http://localhost:3001/character/${id_character}/image`,
      {
        method: 'POST',
        body: formImg,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    if (res.ok) {
      alert('Immagine salvata correttamente!')
      return null
    } else {
      throw new Error('Failed to upload image')
    }
  } catch (error) {
    console.log('Error', error)
  }
}

export const getCharacterImage = (image) => ({
  type: GET_POST_CHARACTER_IMG,
  payload: image,
})

export const updateCharacter = (id, updateCharacter, token) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/character/' + id, {
        method: 'PUT',
        body: JSON.stringify(updateCharacter),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (res.ok) {
        const data = await res.json()
        console.log(data.content)
        dispatch({
          type: PUT_CHARACTER,
          payload: data.content,
        })
        alert('Modifica effettuata con successo!')
      } else {
        throw new Error('Errore durante la modifica')
      }
    } catch (error) {
      console.log('Error', error)
    }
  }
}

export const deleteCharacter = (id, token) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/character/' + id, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (res.ok) {
        dispatch({
          type: DELETE_CHARACTER,
          payload: id,
        })
      } else {
        throw new Error("Errore durante l'eliminazione")
      }
    } catch (error) {
      console.log('Error', error)
    }
  }
}

export const POST_PIECE = 'POST_PIECE'
export const GET_PIECE = 'GET_PIECE'
export const GET_POST_PIECE_IMG = 'GET_POST_PLACE_IMG'
export const PUT_PIECE = 'PUT_PIECE'
export const DELETE_PIECE = 'DELETE_PIECE'

export const postPiece = (piece, token) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/piece/create', {
        method: 'POST',
        body: JSON.stringify(piece),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (res.ok) {
        const data = await res.json()
        console.log(data)
        dispatch({
          type: POST_PIECE,
          payload: data,
        })
        alert('Pezzo artefatto salvato con successo')
      } else {
        throw new Error('Salvataggio fallito!')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const getPiece = () => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/piece/getall')
      console.log('res', res)
      if (res.ok) {
        const data = await res.json()
        console.log('fetch', data)
        dispatch({
          type: GET_PIECE,
          payload: data,
        })
        console.log('List loaded')
      } else {
        throw new Error('Loading of list is failed')
      }
    } catch (error) {
      console.log('Error', error)
      throw error
    }
  }
}

export const postPieceImage = async (id_piece, formImg, token) => {
  try {
    const res = await fetch(`http://localhost:3001/piece/${id_piece}/image`, {
      method: 'POST',
      body: formImg,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
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

export const getPieceImage = (image) => ({
  type: GET_POST_PIECE_IMG,
  payload: image,
})

export const updatePiece = (id, updatePiece, token) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/piece/' + id, {
        method: 'PUT',
        body: JSON.stringify(updatePiece),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (res.ok) {
        const data = await res.json()
        console.log(data.content)
        dispatch({
          type: PUT_PIECE,
          payload: data.content,
        })
        alert('Modifica effettuata con successo!')
      } else {
        throw new Error('Errore durante la modifica')
      }
    } catch (error) {
      console.log('Error put', error)
    }
  }
}

export const deletePiece = (id, token) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/piece/' + id, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (res.ok) {
        dispatch({
          type: DELETE_PIECE,
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

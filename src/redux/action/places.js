export const POST_PLACE = 'POST_PLACE'
export const GET_POST_PLACE_IMG = 'GET_POST_PLACE_IMG'
export const GET_PLACE = 'GET_PLACE'
export const DELETE_PLACE = 'DELETE_PLACE'

export const postPlace = (place, token) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/place/create', {
        method: 'POST',
        body: JSON.stringify(place),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (res.ok) {
        const data = await res.json()
        dispatch({
          type: POST_PLACE,
          payload: data,
        })
        alert('Luogo salvato correttamente!')
      } else {
        throw new Error('Salvataggio fallito!')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const postImage = async (id_place, formImg, token) => {
  try {
    const res = await fetch(`http://localhost:3001/place/${id_place}/image`, {
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

export const getImage = (image) => ({
  type: GET_POST_PLACE_IMG,
  payload: image,
})

export const getPlace = () => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/place/getall')
      if (res.ok) {
        const data = await res.json()
        dispatch({
          type: GET_PLACE,
          payload: data,
        })
        console.log('Lista caricata con successo')
      } else {
        throw new Error('List failed')
      }
    } catch (error) {
      console.log('Error', error)
    }
  }
}

export const deletePlace = (id, token) => {
  return async (dispatch) => {
    console.log('id ricevuto:', id)
    try {
      const res = await fetch('http://localhost:3001/place/' + id, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (res.ok) {
        dispatch({
          type: DELETE_PLACE,
          payload: id,
        })
      } else {
        throw new Error('Error deleting place')
      }
    } catch (error) {
      console.log('Error', error)
    }
  }
}

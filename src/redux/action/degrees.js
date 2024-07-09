export const POST_DEGREE = 'POST_DEGREE'
export const GET_DEGREE = 'GET_DEGREE'
export const PUT_DEGREE = 'PUT_DEGREE'
export const DELETE_DEGREE = 'DELETE_DEGREE'
export const GET_POST_DEGREE_IMG = 'GET_POST_DEGREE_IMG'

export const postDegree = (degree, token) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/degree/create', {
        method: 'POST',
        body: JSON.stringify(degree),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (res.ok) {
        const data = await res.json()
        console.log(data)
        dispatch({
          type: POST_DEGREE,
          payload: data,
        })
        alert('Grado salvato con successo')
      } else {
        throw new Error('Salvataggio fallito!')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const getDegree = () => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/degree/getall')
      console.log('res', res)
      if (res.ok) {
        const data = await res.json()
        console.log('fetch', data)
        dispatch({
          type: GET_DEGREE,
          payload: data,
        })
        console.log('List constellation loaded')
      } else {
        throw new Error('Loading of list is failed')
      }
    } catch (error) {
      console.log('Error', error)
      throw error
    }
  }
}

export const updateDegree = (id, updateDegree, token) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/degree/' + id, {
        method: 'PUT',
        body: JSON.stringify(updateDegree),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (res.ok) {
        const data = await res.json()
        console.log(data.content)
        dispatch({
          type: PUT_DEGREE,
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

export const deleteDegree = (id, token) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/degree/' + id, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (res.ok) {
        dispatch({
          type: DELETE_DEGREE,
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

export const postDegreeImage = async (id_degree, formImg, token) => {
  try {
    const res = await fetch(`http://localhost:3001/degree/${id_degree}/image`, {
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

export const getDegreeImage = (image) => ({
  type: GET_POST_DEGREE_IMG,
  payload: image,
})

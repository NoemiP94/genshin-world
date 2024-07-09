export const POST_TALENT = 'POST_TALENT'
export const GET_TALENT = 'GET_TALENT'
export const PUT_TALENT = 'PUT_TALENT'
export const DELETE_TALENT = 'DELETE_TALENT'
export const ADD_MATERIAL = 'ADD_MATERIAL'
export const REMOVE_MATERIAL = 'REMOVE_MATERIAL'
export const GET_POST_TALENT_IMG = 'GET_POST_TALENT_IMG'

export const postTalent = (talent, token) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/talent/create', {
        method: 'POST',
        body: JSON.stringify(talent),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (res.ok) {
        const data = await res.json()
        console.log(data)
        dispatch({
          type: POST_TALENT,
          payload: data,
        })
        alert('Talento salvato con successo')
      } else {
        throw new Error('Salvataggio fallito!')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const getTalent = () => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/talent/getall')
      console.log('res', res)
      if (res.ok) {
        const data = await res.json()
        console.log('fetch', data)
        dispatch({
          type: GET_TALENT,
          payload: data,
        })
        console.log('List talents loaded')
      } else {
        throw new Error('Loading of list is failed')
      }
    } catch (error) {
      console.log('Error', error)
      throw error
    }
  }
}

export const updateTalent = (id, updateTalent, token) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/talent/' + id, {
        method: 'PUT',
        body: JSON.stringify(updateTalent),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (res.ok) {
        const data = await res.json()
        console.log(data.content)
        dispatch({
          type: PUT_TALENT,
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

export const deleteTalent = (id, token) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/talent/' + id, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (res.ok) {
        dispatch({
          type: DELETE_TALENT,
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

//http://localhost:3001/talent/{talentId}/material/{materialId}
export const addMaterialToTalent = (talent, idTalent, idMaterial, token) => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        `http://localhost:3001/talent/${idTalent}/material/${idMaterial}`,
        {
          method: 'POST',
          body: JSON.stringify(talent),
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      if (res.ok) {
        const data = await res.json()
        dispatch({
          type: ADD_MATERIAL,
          payload: data,
        })
        console.log(res.ok)
      } else {
        throw new Error('Salvataggio fallito!')
      }
    } catch (error) {
      console.log('Error', error)
    }
  }
}

export const removeMaterialTalent = (idTalent, idMaterial, token) => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        `http://localhost:3001/talent/${idTalent}/material/${idMaterial}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (res.ok) {
        dispatch({
          type: REMOVE_MATERIAL,
          payload: idMaterial,
        })
        console.log(res.ok)
      } else {
        throw new Error("Errore durante l'eliminazione")
      }
    } catch (error) {
      console.log('Error', error)
    }
  }
}

export const postTalentImage = async (id_talent, formImg, token) => {
  try {
    const res = await fetch(`http://localhost:3001/talent/${id_talent}/image`, {
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

export const getTalentImage = (image) => ({
  type: GET_POST_TALENT_IMG,
  payload: image,
})

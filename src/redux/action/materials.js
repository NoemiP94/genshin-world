export const POST_MATERIAL = 'POST_MATERIAL'
export const GET_MATERIAL = 'GET_MATERIAL'
export const GET_POST_MATERIAL_IMG = 'GET_POST_MATERIAL_IMG'
export const DELETE_MATERIAL = 'DELETE_MATERIAL'
export const PUT_MATERIAL = 'PUT_MATERIAL'
export const GET_MATERIAL_BY_NAME = 'GET_MATERIAL_BY_NAME'

export const postMaterial = (material, token) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/material/create', {
        method: 'POST',
        body: JSON.stringify(material),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (res.ok) {
        const data = await res.json()
        console.log(data)
        dispatch({
          type: POST_MATERIAL,
          payload: data,
        })
        alert('Materiale salvato con successo')
      } else {
        throw new Error('Salvataggio fallito!')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const getMaterial = (page, size, orderBy) => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        `http://localhost:3001/material/getall?page=${page}&size=${size}&orderBy=${orderBy}`
      )
      console.log('res', res)
      if (res.ok) {
        const data = await res.json()
        console.log('fetch', data)
        dispatch({
          type: GET_MATERIAL,
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

export const postMaterialImage = async (id_material, formImg, token) => {
  try {
    const res = await fetch(
      `http://localhost:3001/material/${id_material}/image`,
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

export const getMaterialImage = (image) => ({
  type: GET_POST_MATERIAL_IMG,
  payload: image,
})

export const deleteMaterial = (id, token) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/material/' + id, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (res.ok) {
        dispatch({
          type: DELETE_MATERIAL,
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

export const updateMaterial = (id, updateMaterial, token) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/material/' + id, {
        method: 'PUT',
        body: JSON.stringify(updateMaterial),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (res.ok) {
        const data = await res.json()
        console.log(data.content)
        dispatch({
          type: PUT_MATERIAL,
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

export const getMaterialByName = (name) => {
  return async (dispatch) => {
    try {
      const res = await fetch(`http://localhost:3001/material/name/${name}`)
      console.log('res', res)
      if (res.ok) {
        const data = await res.json()
        console.log('fetch', data)
        dispatch({
          type: GET_MATERIAL_BY_NAME,
          payload: data,
        })
        console.log('Loaded')
      } else {
        throw new Error('Loading is failed')
      }
    } catch (error) {
      console.log('Error', error)
      throw error
    }
  }
}

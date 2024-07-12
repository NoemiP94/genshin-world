export const POST_DOMAIN = 'POST_DOMAIN'
export const GET_DOMAIN = 'GET_DOMAIN'
export const PUT_DOMAIN = 'PUT_DOMAIN'
export const DELETE_DOMAIN = 'DELETE_DOMAIN'
export const ADD_MATERIAL = 'ADD_MATERIAL'
export const REMOVE_MATERIAL = 'REMOVE_MATERIAL'

export const postDomain = (domain, token) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/domain/create', {
        method: 'POST',
        body: JSON.stringify(domain),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (res.ok) {
        const data = await res.json()
        console.log(data)
        dispatch({
          type: POST_DOMAIN,
          payload: data,
        })
        alert('Dominio salvato con successo')
      } else {
        throw new Error('Salvataggio fallito!')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const getDomain = (page, size, orderBy) => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        `http://localhost:3001/domain/getall?page=${page}&size=${size}&orderBy=${orderBy}`
      )
      console.log('res', res)
      if (res.ok) {
        const data = await res.json()
        console.log('fetch', data)
        dispatch({
          type: GET_DOMAIN,
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

export const updateDomain = (id, updateDomain, token) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/domain/' + id, {
        method: 'PUT',
        body: JSON.stringify(updateDomain),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (res.ok) {
        const data = await res.json()
        console.log(data.content)
        dispatch({
          type: PUT_DOMAIN,
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

export const deleteDomain = (id, token) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/domain/' + id, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (res.ok) {
        dispatch({
          type: DELETE_DOMAIN,
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

//http://localhost:3001/domain/{domainId}/material/{materialId}
export const addMaterialToDomain = (domain, idDomain, idMaterial, token) => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        `http://localhost:3001/domain/${idDomain}/material/${idMaterial}`,
        {
          method: 'POST',
          body: JSON.stringify(domain),
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

export const removeMaterial = (idDomain, idMaterial, token) => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        `http://localhost:3001/domain/${idDomain}/material/${idMaterial}`,
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

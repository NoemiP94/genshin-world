export const POST_REGION = 'POST_REGION'
export const GET_REGION = 'GET_REGION'
export const PUT_REGION = 'PUT_REGION'
export const DELETE_REGION = 'DELETE_REGION'

export const postRegion = (region, token) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/region/create', {
        method: 'POST',
        body: JSON.stringify(region),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (res.ok) {
        const data = await res.json()
        console.log(data)
        dispatch({
          type: POST_REGION,
          payload: data,
        })
        alert('Regione salvata correttamente!')
      } else {
        throw new Error('Salvataggio fallito!')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const getRegion = () => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/region/getall')
      console.log('res', res)
      if (res.ok) {
        const data = await res.json()
        console.log('fetch', data)
        dispatch({
          type: GET_REGION,
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

export const updateRegion = (id, updateRegion, token) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/region/' + id, {
        method: 'PUT',
        body: JSON.stringify(updateRegion),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (res.ok) {
        const data = await res.json()
        console.log(data.content)
        dispatch({
          type: PUT_REGION,
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

export const deleteRegion = (id, token) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/region/' + id, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (res.ok) {
        dispatch({
          type: DELETE_REGION,
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

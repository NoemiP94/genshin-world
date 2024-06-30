export const POST_CONSTELLATION = 'POST_CONSTELLATION'
export const GET_CONSTELLATION = 'GET_CONSTELLATION'
export const PUT_CONSTELLATION = 'PUT_CONSTELLATION'

export const postConstellation = (constellation, token) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/constellation/create', {
        method: 'POST',
        body: JSON.stringify(constellation),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (res.ok) {
        const data = await res.json()
        console.log(data)
        dispatch({
          type: POST_CONSTELLATION,
          payload: data,
        })
        alert('Costellazione salvata con successo')
      } else {
        throw new Error('Salvataggio fallito!')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const getConstellation = () => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/constellation/getall')
      console.log('res', res)
      if (res.ok) {
        const data = await res.json()
        console.log('fetch', data)
        dispatch({
          type: GET_CONSTELLATION,
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

export const updateConstellation = (id, updateConstellation, token) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/constellation/' + id, {
        method: 'PUT',
        body: JSON.stringify(updateConstellation),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (res.ok) {
        const data = await res.json()
        console.log(data.content)
        dispatch({
          type: PUT_CONSTELLATION,
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

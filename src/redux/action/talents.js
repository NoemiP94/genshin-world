export const POST_TALENT = 'POST_TALENT'
export const GET_TALENT = 'GET_TALENT'
export const PUT_TALENT = 'PUT_TALENT'

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

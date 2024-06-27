export const POST_CHARACTER = 'POST_CHARACTER'
export const GET_CHARACTER = 'GET_CHARACTER'

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

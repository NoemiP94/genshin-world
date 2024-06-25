export const POST_DOMAIN = 'POST_DOMAIN'
export const GET_DOMAIN = 'GET_DOMAIN'

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

export const getDomain = () => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/domain/getall')
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

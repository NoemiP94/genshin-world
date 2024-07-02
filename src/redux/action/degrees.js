export const POST_DEGREE = 'POST_DEGREE'
export const GET_DEGREE = 'GET_DEGREE'

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

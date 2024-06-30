export const POST_DEGREE = 'POST_DEGREE'

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

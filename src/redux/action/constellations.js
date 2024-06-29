export const POST_CONSTELLATION = 'POST_CONSTELLATION'

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

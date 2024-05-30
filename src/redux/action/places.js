export const POST_PLACE = 'POST_PLACE'

export const postPlace = (place, token) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/place/create', {
        method: 'POST',
        body: JSON.stringify(place),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (res.ok) {
        const data = await res.json()
        dispatch({
          type: POST_PLACE,
          payload: data,
        })
        alert('Luogo salvato correttamente!')
      } else {
        throw new Error('Salvataggio fallito!')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

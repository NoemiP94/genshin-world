export const POST_TALENT = 'POST_TALENT'

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

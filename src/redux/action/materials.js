export const POST_MATERIAL = 'POST_MATERIAL'

export const postMaterial = (material, token) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/material/create', {
        method: 'POST',
        body: JSON.stringify(material),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (res.ok) {
        const data = await res.json()
        console.log(data)
        dispatch({
          type: POST_MATERIAL,
          payload: data,
        })
        alert('Materiale salvato con successo')
      } else {
        throw new Error('Salvataggio fallito!')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

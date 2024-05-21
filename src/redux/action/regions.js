export const POST_REGION = 'POST_REGION'

export const postRegion = (region, token) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/region/create', {
        method: 'POST',
        body: JSON.stringify(region),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (res.ok) {
        const data = await res.json()
        console.log(data)
        dispatch({
          type: POST_REGION,
          payload: data,
        })
        alert('Regione salvata correttamente!')
      } else {
        throw new Error('Salvataggio fallito!')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

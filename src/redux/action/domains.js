export const POST_DOMAIN = 'POST_DOMAIN'

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

export const POST_WEAPON = 'POST_WEAPON'
export const GET_WEAPON = 'GET_WEAPON'

export const postWeapon = (weapon, token) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/weapon/create', {
        method: 'POST',
        body: JSON.stringify(weapon),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (res.ok) {
        const data = await res.json()
        console.log(data)
        dispatch({
          type: POST_WEAPON,
          payload: data,
        })
        alert('Arma salvata con successo')
      } else {
        throw new Error('Salvataggio fallito!')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const getWeapon = () => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/weapon/getall')
      console.log('res', res)
      if (res.ok) {
        const data = await res.json()
        console.log('fetch', data)
        dispatch({
          type: GET_WEAPON,
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

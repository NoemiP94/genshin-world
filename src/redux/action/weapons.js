export const POST_WEAPON = 'POST_WEAPON'
export const GET_WEAPON = 'GET_WEAPON'
export const GET_POST_WEAPON_IMG = 'GET_POST_WEAPON_IMG'

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

export const postWeaponImage = async (id_weapon, formImg, token) => {
  try {
    const res = await fetch(`http://localhost:3001/weapon/${id_weapon}/image`, {
      method: 'POST',
      body: formImg,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (res.ok) {
      alert('Immagine salvata correttamente!')
      return null
    } else {
      throw new Error('Failed to upload image')
    }
  } catch (error) {
    console.log('Error', error)
  }
}

export const getWeaponImage = (image) => ({
  type: GET_POST_WEAPON_IMG,
  payload: image,
})

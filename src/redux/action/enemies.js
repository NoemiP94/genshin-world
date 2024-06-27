export const POST_ENEMY = 'POST_ENEMY'
export const GET_ENEMY = 'GET_ENEMY'
export const GET_POST_ENEMY_IMG = 'GET_POST_ENEMY_IMG'

export const postEnemy = (enemy, token) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/enemy/create', {
        method: 'POST',
        body: JSON.stringify(enemy),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (res.ok) {
        const data = await res.json()
        console.log(data)
        dispatch({
          type: POST_ENEMY,
          payload: data,
        })
        alert('Nemico salvato con successo')
      } else {
        throw new Error('Salvataggio fallito!')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const getEnemy = () => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/enemy/getall')
      console.log('res', res)
      if (res.ok) {
        const data = await res.json()
        console.log('fetch', data)
        dispatch({
          type: GET_ENEMY,
          payload: data,
        })
        console.log('List enemy loaded')
      } else {
        throw new Error('Loading of list is failed')
      }
    } catch (error) {
      console.log('Error', error)
      throw error
    }
  }
}

export const postEnemyImage = async (id_enemy, formImg, token) => {
  try {
    const res = await fetch(`http://localhost:3001/enemy/${id_enemy}/image`, {
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

export const getEnemyImage = (image) => ({
  type: GET_POST_ENEMY_IMG,
  payload: image,
})

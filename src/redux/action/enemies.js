export const POST_ENEMY = 'POST_ENEMY'
export const GET_ENEMY = 'GET_ENEMY'
export const GET_POST_ENEMY_IMG = 'GET_POST_ENEMY_IMG'
export const PUT_ENEMY = 'PUT_ENEMY'
export const DELETE_ENEMY = 'DELETE_ENEMY'
export const ADD_MATERIAL = 'ADD_MATERIAL'
export const REMOVE_MATERIAL = 'REMOVE_MATERIAL'

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

export const getEnemy = (page, size, orderBy) => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        `http://localhost:3001/enemy/getall?page=${page}&size=${size}&orderBy=${orderBy}`
      )
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

export const updateEnemy = (id, updateEnemy, token) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/enemy/' + id, {
        method: 'PUT',
        body: JSON.stringify(updateEnemy),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (res.ok) {
        const data = await res.json()
        console.log(data.content)
        dispatch({
          type: PUT_ENEMY,
          payload: data.content,
        })
        alert('Modifica effettuata con successo!')
      } else {
        throw new Error('Errore durante la modifica')
      }
    } catch (error) {
      console.log('Error', error)
    }
  }
}

export const deleteEnemy = (id, token) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/enemy/' + id, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (res.ok) {
        dispatch({
          type: DELETE_ENEMY,
          payload: id,
        })
      } else {
        throw new Error("Errore durante l'eliminazione")
      }
    } catch (error) {
      console.log('Error', error)
    }
  }
}

//http://localhost:3001/enemy/{enemyId}/material/{materialId}
export const addMaterialToEnemy = (enemy, idEnemy, idMaterial, token) => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        `http://localhost:3001/enemy/${idEnemy}/material/${idMaterial}`,
        {
          method: 'POST',
          body: JSON.stringify(enemy),
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      if (res.ok) {
        const data = await res.json()
        dispatch({
          type: ADD_MATERIAL,
          payload: data,
        })
        console.log(res.ok)
      } else {
        throw new Error('Salvataggio fallito!')
      }
    } catch (error) {
      console.log('Error', error)
    }
  }
}

export const removeMaterial = (idEnemy, idMaterial, token) => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        `http://localhost:3001/enemy/${idEnemy}/material/${idMaterial}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (res.ok) {
        dispatch({
          type: REMOVE_MATERIAL,
          payload: idEnemy,
        })
        console.log(res.ok)
      } else {
        throw new Error("Errore durante l'eliminazione")
      }
    } catch (error) {
      console.log('Error', error)
    }
  }
}

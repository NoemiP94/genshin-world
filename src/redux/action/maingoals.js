export const POST_MAINGOAL = 'POST_MAINGOAL'
export const GET_MAINGOAL = 'GET_MAINGOAL'
export const PUT_MAINGOAL = 'PUT_MAINGOAL'
export const DELETE_MAINGOAL = 'DELETE_MAINGOAL'
export const GET_SINGLE_MAINGOAL = 'GET_SINGLE_MAINGOAL'

export const postMainGoal = (mainGoal, token) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/maingoal/create', {
        method: 'POST',
        body: JSON.stringify(mainGoal),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (res.ok) {
        const data = await res.json()
        console.log(data)
        dispatch({
          type: POST_MAINGOAL,
          payload: data,
        })
        alert('Main Goal salvato con successo')
      } else {
        throw new Error('Salvataggio fallito!')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const getMainGoal = () => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/maingoal/getall')
      console.log('res', res)
      if (res.ok) {
        const data = await res.json()
        console.log('fetch', data)
        dispatch({
          type: GET_MAINGOAL,
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

export const updateMainGoal = (id, updateMainGoal, token) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/maingoal/' + id, {
        method: 'PUT',
        body: JSON.stringify(updateMainGoal),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (res.ok) {
        const data = await res.json()
        console.log(data.content)
        dispatch({
          type: PUT_MAINGOAL,
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

export const deleteMainGoal = (id, token) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/maingoal/' + id, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (res.ok) {
        dispatch({
          type: DELETE_MAINGOAL,
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

export const getSingleMainGoal = (id) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/maingoal/detail/' + id, {
        method: 'GET',
      })
      if (res.ok) {
        const data = await res.json()
        console.log(data)
        dispatch({
          type: GET_SINGLE_MAINGOAL,
          payload: data,
        })
        console.log('Detail has been loaded correctly')
      } else {
        throw new Error('Detail load is fail')
      }
    } catch (error) {
      console.log('Error', error)
    }
  }
}

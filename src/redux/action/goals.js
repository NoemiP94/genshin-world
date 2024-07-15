export const POST_GOAL = 'POST_GOAL'
export const GET_GOAL = 'GET_GOAL'
export const PUT_GOAL = 'PUT_GOAL'
export const DELETE_GOAL = 'DELETE_GOAL'

export const postGoal = (goal, token) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/goal/create', {
        method: 'POST',
        body: JSON.stringify(goal),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (res.ok) {
        const data = await res.json()
        console.log(data)
        dispatch({
          type: POST_GOAL,
          payload: data,
        })
        alert('Goal salvato con successo')
      } else {
        throw new Error('Salvataggio fallito!')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const getGoal = () => {
  return async (dispatch) => {
    try {
      const res = await fetch(`http://localhost:3001/goal/getall`)
      console.log('res', res)
      if (res.ok) {
        const data = await res.json()
        console.log('fetch', data)
        dispatch({
          type: GET_GOAL,
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

export const updateGoal = (id, updateGoal, token) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/goal/' + id, {
        method: 'PUT',
        body: JSON.stringify(updateGoal),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (res.ok) {
        const data = await res.json()
        console.log(data.content)
        dispatch({
          type: PUT_GOAL,
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

export const deleteGoal = (id, token) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/goal/' + id, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (res.ok) {
        dispatch({
          type: DELETE_GOAL,
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

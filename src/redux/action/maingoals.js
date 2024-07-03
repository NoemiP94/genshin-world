export const POST_MAINGOAL = 'POST_MAINGOAL'
export const GET_MAINGOAL = 'GET_MAINGOAL'

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

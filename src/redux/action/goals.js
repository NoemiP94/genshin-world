export const POST_GOAL = 'POST_GOAL'

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

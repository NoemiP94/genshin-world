export const POST_LOGIN = 'POST_LOGIN'
export const GET_USERS = 'GET_USERS'

export const postLogin = (login) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        body: JSON.stringify(login),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (res.ok) {
        const data = await res.json()
        console.log(data)
        dispatch({
          type: POST_LOGIN,
          payload: { token: data.token, role: data.role },
        })
        localStorage.setItem('token', data.token)
        localStorage.setItem('role', data.role)
        // localStorage.setItem('isLogged', true)
        alert("Hai effettuato l'accesso correttamente!")
        return data
      } else {
        // localStorage.setItem('isLogged', false)
        throw new Error('Login is failed!')
      }
    } catch (error) {
      console.log('Error', error)
      alert('Errore durante il login! Controlla le credenziali e riprova.')
      throw error
    }
  }
}

export const getAllUsers = (token) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/user/getall', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (res.ok) {
        const data = await res.json()
        dispatch({
          type: GET_USERS,
          payload: data,
        })
        console.log('lista caricata')
      } else {
        throw new Error('errore nel caricamento')
      }
    } catch (error) {
      console.log('Error', error)
      alert('Errore durante il caricamento')
      throw error
    }
  }
}

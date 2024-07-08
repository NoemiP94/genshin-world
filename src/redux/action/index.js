export const POST_LOGIN = 'POST_LOGIN'
export const GET_USERS = 'GET_USERS'
export const REGISTER_USER = 'REGISTER_USER'
export const DELETE_USER = 'DELETE_USER'
export const LOGOUT = 'LOGOUT'

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
        localStorage.setItem('isLogged', true)
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

export const postRegister = (register) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        body: JSON.stringify(register),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (res.ok) {
        const data = await res.json()
        console.log(data)
        dispatch({
          type: REGISTER_USER,
          payload: data,
        })
        alert('Registrazione effettuata con successo')
      } else {
        throw new Error('The register is fail')
      }
    } catch (error) {
      console.log('Error', error)
    }
  }
}

export const deleteUser = (id, token) => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:3001/user/' + id, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.ok) {
        dispatch({
          type: DELETE_USER,
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

export const logout = () => {
  return async (dispatch) => {
    try {
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      localStorage.removeItem('isLogged')
      dispatch({
        type: POST_LOGIN,
        payload: { token: '', role: '' },
      })
      alert('Hai effettuato il logout con successo!')
    } catch (error) {
      console.log('Error', error)
    }
  }
}

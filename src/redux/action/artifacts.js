export const POST_ARTIFACT = 'POST_ARTIFACT'
export const GET_ARTIFACT = 'GET_ARTIFACT'
export const DELETE_ARTIFACT = 'DELETE_ARTIFACT'
export const PUT_ARTIFACT = 'PUT_ARTIFACT'

export const postArtifact = (artifact, token) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/artifactset/create', {
        method: 'POST',
        body: JSON.stringify(artifact),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (res.ok) {
        const data = await res.json()
        console.log(data)
        dispatch({
          type: POST_ARTIFACT,
          payload: data,
        })
        alert('Set artefatti salvato con successo')
      } else {
        throw new Error('Salvataggio fallito!')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const getArtifact = () => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/artifactset/getall')
      console.log('res', res)
      if (res.ok) {
        const data = await res.json()
        console.log('fetch', data)
        dispatch({
          type: GET_ARTIFACT,
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

export const deleteArtifact = (id, token) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/artifactset/' + id, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (res.ok) {
        dispatch({
          type: DELETE_ARTIFACT,
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

export const updateArtifact = (id, updateArtifact, token) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/artifactset/' + id, {
        method: 'PUT',
        body: JSON.stringify(updateArtifact),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (res.ok) {
        const data = await res.json()
        console.log(data.content)
        dispatch({
          type: PUT_ARTIFACT,
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

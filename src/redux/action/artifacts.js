export const POST_ARTIFACT = 'POST_ARTIFACT'
export const GET_ARTIFACT = 'GET_ARTIFACT'

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
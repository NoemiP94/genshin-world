import { useDispatch } from 'react-redux'

import { useState } from 'react'
import {
  GET_POST_ARTIFACT_IMG,
  postArtifactImage,
} from '../../redux/action/artifacts'

const ModalArtifactImg = ({ showImgModal, setShowImgModal, artifactId }) => {
  const token = localStorage.getItem('token')
  const dispatch = useDispatch()
  const [formImg, setFormImg] = useState(null)

  const handleUploadImage = async (id) => {
    try {
      console.log('cliccato'), console.log('id nemico', id)
      console.log(artifactId)

      if (formImg) {
        console.log('formImg', formImg)
        const id_artifact = id ? id.toString() : null
        console.log('id_artifact: ', id_artifact)
        if (id_artifact) {
          const response = await postArtifactImage(id_artifact, formImg, token)
          console.log('response', response)
          if (response !== null) {
            console.log('Immagine caricata correttamente', response)
            console.log('id artifact', id)
            console.log('altro id artifact', id_artifact)
            dispatch({
              type: GET_POST_ARTIFACT_IMG,
              payload: response.url,
            })

            alert('immagine caricata')
          } else {
            console.log('Image upload successful, but no URL returned')
          }
        } else {
          console.log('Piece ID not recovered')
        }
      }
    } catch (error) {
      console.log('Error', error)
    }
  }

  const handleSave = (id) => {
    handleUploadImage(id)
    setShowImgModal(false)
  }
  return (
    <>
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-51 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-slate-700 outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
              <h3 className="text-3xl font=semibold text-black">
                Aggiungi immagine
              </h3>
              <button
                className="bg-transparent border-0 text-black float-right"
                onClick={() => setShowImgModal(false)}
              >
                <span className="text-black h-6 w-6 text-xl block py-0">x</span>
              </button>
            </div>
            <div className="relative p-6 flex-auto">
              <form className=" shadow-md rounded px-8 pt-6 pb-8 w-full">
                <input
                  className="shadow appearance-none  rounded w-full py-2 px-1 "
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0]
                    if (file) {
                      const formData = new FormData()
                      formData.append('image', file)
                      setFormImg(formData)
                    }
                  }}
                />
              </form>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                type="button"
                onClick={() => handleSave(artifactId)}
              >
                Salva
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ModalArtifactImg

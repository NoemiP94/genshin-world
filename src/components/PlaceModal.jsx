import { useState } from 'react'
import { getRegion, postRegion } from '../redux/action/regions'
import { useDispatch } from 'react-redux'
import {
  GET_POST_PLACE_IMG,
  postImage,
  postPlace,
} from '../redux/action/places'

const PlaceModal = ({ showModal, setShowModal, regionId }) => {
  const dispatch = useDispatch()
  const [place, setPlace] = useState({
    name: '',
    description: '',
    region_id: regionId,
  })

  const [showImgModal, setShowImgModal] = useState(false)

  const token = localStorage.getItem('token')

  const handleSending = async (e) => {
    e.preventDefault()
    try {
      await dispatch(postPlace(place, token))
      //setShowModal(false)
      dispatch(getRegion())
      setShowImgModal(true)
      console.log('modale immagine', showImgModal)
    } catch (error) {
      console.log('Error', error)
    }
  }

  const [formImg, setFormImg] = useState(null)

  const handleUploadImage = async (placeId) => {
    try {
      console.log('id luogo', placeId)
      if (formImg) {
        const id_place = placeId ? placeId.toString() : null
        if (id_place) {
          const response = await postImage(id_place, formImg, token)
          if (response !== null) {
            console.log('Immagine caricata correttamente', response)
            dispatch({
              type: GET_POST_PLACE_IMG,
              payload: response.url,
            })
          } else {
            console.log('Image upload successful, but no URL returned')
          }
        } else {
          console.log('Place ID not recovered')
        }
      }
    } catch (error) {
      console.log('Error', error)
    }
  }

  return (
    <>
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
              <h3 className="text-3xl font=semibold text-black">
                Aggiungi luogo
              </h3>
              <button
                className="bg-transparent border-0 text-black float-right"
                onClick={() => setShowModal(false)}
              >
                <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                  x
                </span>
              </button>
            </div>
            <div className="relative p-6 flex-auto">
              <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                <label className="block text-black text-sm font-bold mb-1">
                  Nome
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-1"
                  onChange={(e) => {
                    setPlace({
                      ...place,
                      name: e.target.value,
                    })
                  }}
                />
                <label className="block text-black text-sm font-bold mb-1">
                  Descrizione
                </label>
                <textarea
                  id="about"
                  name="about"
                  rows={5}
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300  "
                  onChange={(e) => {
                    setPlace({
                      ...place,
                      description: e.target.value,
                    })
                  }}
                />
              </form>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                type="reset"
              >
                Reset
              </button>
              <button
                className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                type="button"
                onClick={handleSending}
              >
                Salva
              </button>
            </div>
          </div>
        </div>
        {showImgModal && (
          <>
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-51 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                    <h3 className="text-3xl font=semibold text-black">
                      Aggiungi immagine
                    </h3>
                    <button
                      className="bg-transparent border-0 text-black float-right"
                      onClick={() => setShowImgModal(false)}
                    >
                      <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                        x
                      </span>
                    </button>
                  </div>
                  <div className="relative p-6 flex-auto">
                    <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-1 "
                        type="file"
                      />
                    </form>
                  </div>
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={() => handleUploadImage(place.id)}
                    >
                      Salva
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default PlaceModal

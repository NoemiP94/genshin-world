import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRegion } from '../redux/action/regions'
import { getPlace, postPlace, updatePlace } from '../redux/action/places'
import ModalImg from './ModalImg'

const Place = ({ region, idPlace }) => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const regionData = useSelector((state) => state.region.list)

  useEffect(() => {
    dispatch(getRegion())
  }, [dispatch])

  const [place, setPlace] = useState(null)
  const placeData = useSelector((state) => state.place.list)
  useEffect(() => {
    dispatch(getPlace())
  }, [dispatch])
  const handleSave = async (e) => {
    e.preventDefault()
    try {
      await dispatch(postPlace(place, token))
      await dispatch(getRegion())
      await dispatch(getPlace())
    } catch (error) {
      console.log('Errore creazione place: ', error)
    }
  }

  const handleUpdate = async () => {
    console.log('idPlace: ', idPlace)
    try {
      await dispatch(updatePlace(idPlace, place, token))
      await dispatch(getPlace())
      await dispatch(getRegion())

      console.log('place: ', place)
    } catch (error) {
      console.log('Errore nella modifica: ', error)
    }
  }

  //MODALE IMG
  const [showImgModal, setShowImgModal] = useState(false)
  const [selectedPlace, setSelectedPlace] = useState(null)

  const showModalImg = (idPlace) => {
    console.log('Id place ricevuto :', idPlace)
    setSelectedPlace(idPlace)
    setShowImgModal(true)

    console.log('Luogo cliccato')
    console.log('Luogo selezionato', selectedPlace)
  }

  return (
    <div className="flex m-6">
      {/* CREAZIONE LUOGO   */}
      <div className="w-2/4 flex justify-center border p-3">
        <form className="w-full px-10 text-white">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="font-semibold leading-7 text-lg">Crea un Luogo</h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-left"
                >
                  Nome
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    //value={place.name}
                    onChange={(e) => {
                      setPlace({
                        ...place,
                        name: e.target.value,
                      })
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-3 pt-2">
              <label
                htmlFor="vision"
                className="block text-sm font-medium leading-6 text-left"
              >
                Regione
              </label>
              <div className="mt-2">
                <select
                  id="vision"
                  name="vision"
                  autoComplete="vision-name"
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  //value={place.region_id}
                  onChange={(e) => {
                    setPlace({
                      ...place,
                      region_id: e.target.value,
                    })
                  }}
                >
                  <option>Seleziona una regione</option>
                  {regionData.content &&
                    regionData.content.map((region) => (
                      <option key={region.id} value={region.id}>
                        {region.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="col-span-full pt-2">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-left"
              >
                Descrizione
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={5}
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300  "
                  // value={place.description}
                  onChange={(e) => {
                    setPlace({
                      ...place,
                      description: e.target.value,
                    })
                  }}
                />
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button type="reset" className="text-sm font-semibold">
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleSave}
              >
                Salva
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={(e) => {
                  e.preventDefault()
                  handleUpdate()
                }}
              >
                Salva modifiche
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* FINE CREAZIONE LUOGO  */}
      {/* INIZIO LISTA LUOGHI */}
      <div className="w-2/4">
        <ul role="list" className="divide-y divide-gray-100 ms-5 ">
          <p className="text-white text-lg">Lista Luoghi</p>
          {placeData.content &&
            placeData.content.map((place) => (
              <li key={place.id} className="my-3 text-left px-5 py-3 ">
                <div className="flex justify-between">
                  <div className="w-3/4 overflow-auto">
                    <p>
                      - Nome: <span className="italic">{place.name}</span>
                    </p>
                    <p>
                      - Descrizione:{' '}
                      <span className="italic">{place.description}</span>
                    </p>
                    <p>
                      - Link img: <span className="italic">{place.image}</span>
                    </p>
                  </div>
                  <div className="w-1/4 mt-4">
                    {/* bottone immagine */}
                    <button
                      type="button"
                      className="inline-flex w-full justify-center bg-green-500 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 sm:ml-3 sm:w-auto"
                      onClick={() => showModalImg(place.id)}
                    >
                      Aggiungi immagine
                    </button>
                  </div>
                </div>
                {showImgModal && selectedPlace && (
                  <ModalImg
                    showImgModal={showImgModal}
                    setShowImgModal={setShowImgModal}
                    placeId={selectedPlace}
                  />
                )}
              </li>
            ))}
        </ul>
      </div>
      {/* FINE LISTA LUOGHI */}
    </div>
  )
}

export default Place

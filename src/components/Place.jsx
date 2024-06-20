import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRegion } from '../redux/action/regions'
import { getPlace, postPlace, updatePlace } from '../redux/action/places'
import ModalImg from './modals/ModalImg'

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
    <div className="flex ">
      {/* CREAZIONE LUOGO   */}
      <div className="w-2/4 flex justify-center ">
        <form className="w-full text-white ">
          <div className="p-7 h-auto">
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

            <div className="sm:col-span-3 pt-5">
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

            <div className="col-span-full pt-5">
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
              <button
                type="reset"
                className="text-sm font-semibold bg-purple-400 px-3 py-2 rounded-md"
              >
                Svuota
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
        <p className="text-white text-lg">Lista Luoghi</p>
        <ul
          role="list"
          className="divide-y divide-gray-100 ms-5 overflow-y-scroll px-5 h-2/3"
        >
          {placeData.content &&
            placeData.content.map((place) => (
              <li key={place.id} className="my-3 text-left px-5 py-3 ">
                <div className="flex justify-between">
                  <div className="w-3/4 ">
                    <p>
                      - Nome: <span className="italic">{place.name}</span>
                    </p>
                    <p>
                      - Descrizione:{' '}
                      <span className="italic">{place.description}</span>
                    </p>
                    <p className=" overflow-x-scroll ">
                      - Link img: <span className="italic">{place.image}</span>
                    </p>
                  </div>
                  <div className="w-1/4 mt-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#15803d"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-8 mx-2"
                      onClick={() => showModalImg(place.id)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
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

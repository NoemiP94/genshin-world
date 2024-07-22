import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllRegions, getRegion } from '../redux/action/regions'
import { getPlace, postPlace } from '../redux/action/places'

const Place = ({
  currentPagePlace,
  elementsPerPagePlace,
  orderElementsPlace,
  handlePageChangePlace,
  currentPage,
  elementsPerPage,
  orderElements,
}) => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const regionData = useSelector((state) => state.region.allList)

  //PAGINATION REGION
  const orderElementsRegion = 'name'

  useEffect(() => {
    dispatch(getAllRegions(orderElementsRegion))
  }, [dispatch, orderElementsRegion])

  const [place, setPlace] = useState({
    name: '',
    description: '',
    region_id: '',
  })
  const placeData = useSelector((state) => state.place.list)

  const handleReset = () => {
    setPlace({
      name: '',
      description: '',
      region_id: '',
    })
  }

  useEffect(() => {
    dispatch(
      getPlace(currentPagePlace, elementsPerPagePlace, orderElementsPlace)
    )
  }, [dispatch, currentPagePlace, elementsPerPagePlace, orderElementsPlace])

  const handleSave = async () => {
    console.log('body: ', place)
    try {
      await dispatch(postPlace(place, token))

      await handleReset()
      await dispatch(
        getPlace(currentPagePlace, elementsPerPagePlace, orderElementsPlace)
      )

      await dispatch(getRegion(currentPage, elementsPerPage, orderElements))
    } catch (error) {
      console.log('Errore creazione place: ', error)
    }
  }

  return (
    <div className="flex flex-col ">
      {/* CREAZIONE LUOGO   */}
      <div className=" flex justify-center ">
        <form className="w-full text-white ">
          <div className="p-7 h-auto">
            <h2 className="font-semibold leading-7 text-lg">Crea un Luogo</h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-left"
                >
                  Nome *
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    required
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
                htmlFor="region"
                className="block text-sm font-medium leading-6 text-left"
              >
                Regione *
              </label>
              <div className="mt-2">
                <select
                  id="region"
                  name="region"
                  autoComplete="region-name"
                  required
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  // value={selectedRegionPlace}
                  onChange={(e) => {
                    setPlace({
                      ...place,
                      region_id: e.target.value,
                    })
                  }}
                >
                  <option>Seleziona una regione</option>
                  {regionData.content &&
                    regionData.content.map((reg) => (
                      <option key={reg.id} value={reg.id}>
                        {reg.name}
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
                  //value={place.description}
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
                onClick={handleReset}
              >
                Svuota
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={(e) => {
                  e.preventDefault()
                  handleSave()
                }}
              >
                Salva
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* FINE CREAZIONE LUOGO  */}
    </div>
  )
}

export default Place

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getConstellation } from '../redux/action/constellations'
import { getDegree, postDegree, updateDegree } from '../redux/action/degrees'

const Degree = ({
  constellation,
  idDegree,
  currentPageConstellation,
  elementsPerPageConstellation,
  orderElementsConstellation,
}) => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')

  //GET CONSTELLATION
  const constellationData = useSelector((state) => state.constellation.list)
  useEffect(() => {
    dispatch(
      getConstellation(
        currentPageConstellation,
        elementsPerPageConstellation,
        orderElementsConstellation
      )
    )
  }, [
    dispatch,
    currentPageConstellation,
    elementsPerPageConstellation,
    orderElementsConstellation,
  ])

  //SAVE DEGREE
  const [degree, setDegree] = useState({
    name: '',
    level: '',
    description: '',
    constellation_id: '',
  })

  const handleReset = () => {
    setDegree({
      name: '',
      level: '',
      description: '',
      constellation_id: '',
    })
  }

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      await dispatch(postDegree(degree, token))
      await dispatch(getDegree())
      await dispatch(
        getConstellation(
          currentPageConstellation,
          elementsPerPageConstellation,
          orderElementsConstellation
        )
      )
      await handleReset()
    } catch (error) {
      console.log('Errore creazione place: ', error)
    }
  }

  //GET DEGREE
  const degreeData = useSelector((state) => state.degree.list)
  useEffect(() => {
    dispatch(getDegree())
  }, [dispatch])

  //UPDATE DEGREE
  const handleUpdate = async () => {
    console.log('idDegree: ', idDegree)
    try {
      await dispatch(updateDegree(idDegree, degree, token))
      await dispatch(getDegree())
      await dispatch(
        getConstellation(
          currentPageConstellation,
          elementsPerPageConstellation,
          orderElementsConstellation
        )
      )
      await handleReset()
      console.log('degree: ', degree)
    } catch (error) {
      console.log('Errore nella modifica: ', error)
    }
  }

  return (
    <div>
      {/* CREAZIONE DEGREE   */}
      <div className="flex justify-center ">
        <form className="w-full text-white ">
          <div className="ps-7 pt-4 h-auto">
            <h2 className="font-semibold leading-7 text-sm">Crea un Grado</h2>

            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                    required
                    name="name"
                    id="name"
                    autoComplete="name"
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={degree.name}
                    onChange={(e) => {
                      setDegree({
                        ...degree,
                        name: e.target.value,
                      })
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="level"
                className="block text-sm font-medium leading-6 text-left"
              >
                Livello *
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  required
                  name="level"
                  id="level"
                  autoComplete="level"
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={degree.level}
                  onChange={(e) => {
                    setDegree({
                      ...degree,
                      level: e.target.value,
                    })
                  }}
                />
              </div>
            </div>

            <div className="sm:col-span-3 pt-5">
              <label
                htmlFor="vision"
                className="block text-sm font-medium leading-6 text-left"
              >
                Costellazione *
              </label>
              <div className="mt-2">
                <select
                  id="vision"
                  required
                  name="vision"
                  autoComplete="vision-name"
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  //value={place.region_id}
                  onChange={(e) => {
                    setDegree({
                      ...degree,
                      constellation_id: e.target.value,
                    })
                  }}
                >
                  <option>Seleziona una costellazione</option>
                  {constellationData.content &&
                    constellationData.content.map((constellation) => (
                      <option key={constellation.id} value={constellation.id}>
                        {constellation.name}
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
                Descrizione *
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  required
                  name="about"
                  rows={5}
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300  "
                  value={degree.description}
                  onChange={(e) => {
                    setDegree({
                      ...degree,
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
      {/* FINE CREAZIONE DEGREE  */}
    </div>
  )
}

export default Degree

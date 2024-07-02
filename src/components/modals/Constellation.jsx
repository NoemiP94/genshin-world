import { useEffect, useState } from 'react'
import {
  deleteConstellation,
  getConstellation,
  postConstellation,
  updateConstellation,
} from '../../redux/action/constellations'
import { getCharacter, getSingleCharacter } from '../../redux/action/characters'
import { useDispatch, useSelector } from 'react-redux'
import Degree from '../Degree'
import { getDegree } from '../../redux/action/degrees'

const Constellation = () => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')

  //GET CHARACTER
  const characterData = useSelector((state) => state.character.list)
  useEffect(() => {
    dispatch(getCharacter())
  }, [dispatch])

  //SAVE CONSTELLATION
  const [constellation, setConstellation] = useState({
    name: '',
    character_id: '',
  })

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      await dispatch(postConstellation(constellation, token))
      await dispatch(getSingleCharacter())
      await dispatch(getConstellation())
    } catch (error) {
      console.log('Errore creazione place: ', error)
    }
  }

  //GET CONSTELLATION
  const constellationData = useSelector((state) => state.constellation.list)
  useEffect(() => {
    dispatch(getConstellation())
  }, [dispatch])

  //UPDATE CONSTELLATION
  const [updtConstellation, setUpdtConstellation] = useState(null)
  const [idConstellation, setIdConstellation] = useState('')

  const handlePencilUpdate = (constellation) => {
    setUpdtConstellation(constellation)
    setIdConstellation(constellation.id)
    setConstellation({
      name: constellation.name,
      character_id: constellation.character_id,
    })
    console.log('costellazione passato: ', constellation)
    console.log('id costellazione selezionato: ', constellation.id)
    console.log('matita cliccata')
  }

  const handleUpdate = async () => {
    try {
      await dispatch(updateConstellation(idConstellation, constellation, token))
      dispatch(getConstellation())
      console.log('Modificato con successo')
    } catch (error) {
      console.log('Errore nella modifica', error)
    }
  }

  //DELETE CONSTELLATION
  const handleDelete = async (constellation) => {
    try {
      await dispatch(deleteConstellation(constellation.id, token))
      dispatch(getConstellation())
      console.log('Arma eliminata con successo!')
    } catch (error) {
      console.log("Errore nell'eliminazione", error)
    }
  }

  //GET DEGREE
  const degreeData = useSelector((state) => state.degree.list)
  useEffect(() => {
    dispatch(getDegree())
  }, [dispatch])

  return (
    <div>
      <h4 className="mt-5 text-xl font-bold">Gestione Costellazione</h4>
      <div className="container my-6 w-full flex">
        {/* CREA CONSTELLATION */}
        <div className="w-2/4 flex justify-center">
          <form className="w-full  text-white">
            <div className=" p-7 h-auto">
              <h6 className="font-semibold leading-7 text-sm">Crea/Modifica</h6>
              <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                      value={constellation.name}
                      onChange={(e) => {
                        setConstellation({
                          ...constellation,
                          name: e.target.value,
                        })
                      }}
                    />
                  </div>
                </div>
                <div className="sm:col-span-3 pt-5">
                  <label
                    htmlFor="character"
                    className="block text-sm font-medium leading-6 text-left"
                  >
                    Personaggio
                  </label>
                  <div className="mt-2">
                    <select
                      id="character"
                      name="character"
                      autoComplete="character-name"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      // value={constellation.character_id.name}
                      onChange={(e) => {
                        setConstellation({
                          ...constellation,
                          character_id: e.target.value,
                        })
                      }}
                    >
                      <option>Seleziona un personaggio</option>
                      {characterData.content &&
                        characterData.content.map((character) => (
                          <option key={character.id} value={character.id}>
                            {character.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center  gap-x-6">
                <button
                  type="reset"
                  className="text-sm font-semibold bg-purple-400 px-3 py-2 rounded-md"
                >
                  Svuota
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm"
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
        {/* FINE CREA CONSTELLATION */}{' '}
        <div className="container my-6 w-full flex">
          <Degree constellation={constellation} />
        </div>
        {/* INIZIO LISTA CONSTELLATION */}
      </div>{' '}
      <div>
        <p className="text-white text-lg">Lista Costellazioni</p>
        <ul
          role="list"
          className="divide-y divide-gray-100 ms-5 overflow-y-scroll px-5 h-2/3"
        >
          {constellationData.content &&
            constellationData.content.map((constellation) => (
              <li key={constellation.id} className="my-3 text-left px-5 py-3">
                <div className="flex justify-between">
                  <div className="w-3/4 ">
                    <p>
                      - Nome:
                      <span className="italic">{constellation.name}</span>
                    </p>

                    <p>- Lista gradi: </p>
                    <div className="mt-2 h-20  overflow-y-scroll ">
                      {constellation.degreesList.length > 0
                        ? constellation.degreesList.map((degree) => (
                            <a className="italic py-2" key={degree.id}>
                              <div className="flex  p-2 ">
                                <div className="pe-5 ps-5 text-sm">
                                  - C {degree.level}
                                </div>
                                <div className="pe-5 ps-5 text-sm">
                                  {degree.name}
                                </div>
                              </div>
                            </a>
                          ))
                        : null}
                    </div>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#facc15"
                    className="size-8 mx-2"
                    onClick={() => {
                      handlePencilUpdate(constellation)
                    }}
                  >
                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#dc2626"
                    className="size-8 mx-2"
                    onClick={() => {
                      handleDelete(constellation)
                    }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default Constellation

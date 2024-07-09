import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRegion } from '../redux/action/regions'
import {
  deleteCharacter,
  getCharacter,
  postCharacter,
  updateCharacter,
} from '../redux/action/characters'
import { Link } from 'react-router-dom'

const Character = () => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')

  //GET REGION
  const regionData = useSelector((state) => state.region.list)
  useEffect(() => {
    dispatch(getRegion())
  }, [dispatch])

  //SAVE CHARACTER
  const [character, setCharacter] = useState({
    name: '',
    engVoice: '',
    birthday: '',
    stars: '',
    affiliate: '',
    visionType: '',
    description: '',
    weaponType: '',
    region_id: '',
    title: '',
    releaseVersion: '',
    japVoice: '',
    chinVoice: '',
    corVoice: '',
    specialDish: '',
  })
  const saveCharacter = async () => {
    try {
      await dispatch(postCharacter(character, token))
      await dispatch(getCharacter())
    } catch (error) {
      console.log('Errore nel salvataggio', error)
    }
  }

  //GET CHARACTER
  const characterData = useSelector((state) => state.character.list)
  useEffect(() => {
    dispatch(getCharacter())
  }, [dispatch])

  //UPDATE CHARACTER
  const [updtCharacter, setUpdtCharacter] = useState(null)
  const [idCharacter, setIdCharacter] = useState('')

  const handlePencilUpdate = (character) => {
    setUpdtCharacter(character)
    setIdCharacter(character.id)
    setCharacter({
      name: character.name,
      engVoice: character.engVoice,
      birthday: character.birthday,
      stars: character.stars,
      affiliate: character.affiliate,
      visionType: character.visionType,
      description: character.description,
      weaponType: character.weaponType,
      region_id: character.region_id,
      title: character.title,
      releaseVersion: character.releaseVersion,
      japVoice: character.japVoice,
      chinVoice: character.chinVoice,
      corVoice: character.corVoice,
      specialDish: character.specialDish,
    })
  }

  const handleUpdate = async () => {
    try {
      await dispatch(updateCharacter(idCharacter, character, token))
      dispatch(getCharacter())
      console.log('Modificato con successo')
    } catch (error) {
      console.log('Errore nella modifica', error)
    }
  }

  //DELETE CHARACTER
  const handleDelete = async (character) => {
    try {
      await dispatch(deleteCharacter(character.id, token))
      dispatch(getCharacter())
      console.log('Personaggio eliminato con successo!')
    } catch (error) {
      console.log("Errore nell'eliminazione", error)
    }
  }

  return (
    <div className="h-screen">
      <h2 className="mt-5 text-2xl font-bold">Gestione Personaggi</h2>
      <div className="container my-6 w-full flex">
        {/* CREA CHARACTER */}
        <div className="w-2/4 flex justify-center">
          <form className="w-full  text-white">
            <div className=" p-7 h-auto">
              <h2 className="font-semibold leading-7 text-lg">
                Crea un Personaggio
              </h2>
              <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                      //value={character.name}
                      onChange={(e) => {
                        setCharacter({
                          ...character,
                          name: e.target.value,
                        })
                      }}
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium leading-6 text-left"
                  >
                    Titolo
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      autoComplete="title"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      //value={character.title}
                      onChange={(e) => {
                        setCharacter({
                          ...character,
                          title: e.target.value,
                        })
                      }}
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="engVoice"
                    className="block text-sm font-medium leading-6 text-left"
                  >
                    Voce Inglese
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="engVoice"
                      id="engVoice"
                      autoComplete="engVoice"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      //value={character.voice}
                      onChange={(e) => {
                        setCharacter({
                          ...character,
                          engVoice: e.target.value,
                        })
                      }}
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="japVoice"
                    className="block text-sm font-medium leading-6 text-left"
                  >
                    Voce Giapponese
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="japVoice"
                      id="japVoice"
                      autoComplete="japVoice"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      //value={character.japVoice}
                      onChange={(e) => {
                        setCharacter({
                          ...character,
                          japVoice: e.target.value,
                        })
                      }}
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="chinVoice"
                    className="block text-sm font-medium leading-6 text-left"
                  >
                    Voce Cinese
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="chinVoice"
                      id="chinVoice"
                      autoComplete="chinVoice"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      //value={character.chinVoice}
                      onChange={(e) => {
                        setCharacter({
                          ...character,
                          chinVoice: e.target.value,
                        })
                      }}
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="corVoice"
                    className="block text-sm font-medium leading-6 text-left"
                  >
                    Voce Coreana
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="corVoice"
                      id="corVoice"
                      autoComplete="corVoice"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      //value={character.voice}
                      onChange={(e) => {
                        setCharacter({
                          ...character,
                          corVoice: e.target.value,
                        })
                      }}
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="birthday"
                    className="block text-sm font-medium leading-6 text-left"
                  >
                    Compleanno
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="birthday"
                      id="birthday"
                      autoComplete="birthday"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      //value={character.birthday}
                      onChange={(e) => {
                        setCharacter({
                          ...character,
                          birthday: e.target.value,
                        })
                      }}
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="affiliate"
                    className="block text-sm font-medium leading-6 text-left"
                  >
                    Affiliazione
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="affiliate"
                      id="affiliate"
                      autoComplete="birthday"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      //value={character.affiliate}
                      onChange={(e) => {
                        setCharacter({
                          ...character,
                          affiliate: e.target.value,
                        })
                      }}
                    />
                  </div>
                </div>
                <div className="sm:col-span-3 pt-5">
                  <label
                    htmlFor="materialType"
                    className="block text-sm font-medium leading-6 text-left"
                  >
                    Stelle
                  </label>
                  <div className="mt-2">
                    <select
                      id="stars"
                      name="stars"
                      autoComplete="stars-name"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      //value={character.stars}
                      onChange={(e) => {
                        setCharacter({
                          ...character,
                          stars: e.target.value,
                        })
                      }}
                    >
                      <option>Seleziona stelle</option>
                      <option>QUATTRO</option>
                      <option>CINQUE</option>
                    </select>
                  </div>
                </div>
                <div className="sm:col-span-3 pt-5">
                  <label
                    htmlFor="vision"
                    className="block text-sm font-medium leading-6 text-left"
                  >
                    Visione
                  </label>
                  <div className="mt-2">
                    <select
                      id="vision"
                      name="vision"
                      autoComplete="vision-name"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      //value={character.visionType}
                      onChange={(e) => {
                        setCharacter({
                          ...character,
                          visionType: e.target.value,
                        })
                      }}
                    >
                      <option>Seleziona una visione</option>
                      <option>Anemo</option>
                      <option>Geo</option>
                      <option>Electro</option>
                      <option>Dendro</option>
                      <option>Hydro</option>
                      <option>Pyro</option>
                      <option>Cryo</option>
                    </select>
                  </div>
                </div>
                <div className="sm:col-span-3 pt-5">
                  <label
                    htmlFor="weaponType"
                    className="block text-sm font-medium leading-6 text-left"
                  >
                    Tipo Arma
                  </label>
                  <div className="mt-2">
                    <select
                      id="weaponType"
                      name="weaponType"
                      autoComplete="weaponType-name"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      //value={character.weaponType}
                      onChange={(e) => {
                        setCharacter({
                          ...character,
                          weaponType: e.target.value,
                        })
                      }}
                    >
                      <option>Seleziona un tipo</option>
                      <option>Spada</option>
                      <option>Catalizzatore</option>
                      <option>Claymore</option>
                      <option>Arco</option>
                      <option>Lancia</option>
                    </select>
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
                      //value={character.region_id.name}
                      onChange={(e) => {
                        setCharacter({
                          ...character,
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
                    className="block text-sm font-medium text-left"
                  >
                    Descrizione
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="about"
                      name="about"
                      rows={5}
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 "
                      //value={character.description}
                      onChange={(e) => {
                        setCharacter({
                          ...character,
                          description: e.target.value,
                        })
                      }}
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="specialDish"
                    className="block text-sm font-medium leading-6 text-left"
                  >
                    Piatto speciale
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="specialDish"
                      id="specialDish"
                      autoComplete="specialDish"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      //value={character.specialDish}
                      onChange={(e) => {
                        setCharacter({
                          ...character,
                          specialDish: e.target.value,
                        })
                      }}
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="releaseVersion"
                    className="block text-sm font-medium leading-6 text-left"
                  >
                    Versione di rilascio
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="releaseVersion"
                      id="releaseVersion"
                      autoComplete="releaseVersion"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      //value={character.releaseVersion}
                      onChange={(e) => {
                        setCharacter({
                          ...character,
                          releaseVersion: e.target.value,
                        })
                      }}
                    />
                  </div>
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
                  onClick={saveCharacter}
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
        {/* FINE CREA CHARACTER */}
        {/* INIZIO LISTA CHARACTER */}
        <div className="w-2/4">
          <p className="text-white text-lg">Lista Personaggi</p>
          <ul
            role="list"
            className="divide-y divide-gray-100 ms-5 overflow-y-scroll px-5 h-2/3"
          >
            {characterData.content &&
              characterData.content.map((character) => (
                <li
                  key={character.id}
                  className="my-3 text-left px-5 py-3 flex justify-between items-center"
                >
                  <p>
                    Nome: <span className="italic">{character.name}</span>
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#facc15"
                    className="size-8 mx-2"
                    onClick={() => {
                      handlePencilUpdate(character)
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
                      handleDelete(character)
                    }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <Link to={`/reserved/character/${character.id}`}>
                    <button className="ms-5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      Gestisci
                    </button>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
        {/* FINE LISTA CHARACTER */}
      </div>
    </div>
  )
}

export default Character

import { useEffect, useState } from 'react'
import { postConstellation } from '../../redux/action/constellations'
import { getCharacter, getSingleCharacter } from '../../redux/action/characters'
import { useDispatch, useSelector } from 'react-redux'

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
      //await dispatch(getConstellation())
    } catch (error) {
      console.log('Errore creazione place: ', error)
    }
  }

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
                      //   value={weapon.name}
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
                      //value={place.region_id}
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
                <div></div>
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
                  //   onClick={(e) => {
                  //     e.preventDefault()
                  //     handleUpdate()
                  //   }}
                >
                  Salva modifiche
                </button>
              </div>
            </div>
          </form>
        </div>
        {/* FINE CREA CONSTELLATION */}
      </div>
    </div>
  )
}

export default Constellation

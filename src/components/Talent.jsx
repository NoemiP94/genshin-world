import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { postTalent } from '../redux/action/talents'
import { getCharacter, getSingleCharacter } from '../redux/action/characters'

const Talent = ({ character }) => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')

  //SAVE TALENT
  const [talent, setTalent] = useState({
    name: '',
    info: '',
    character_id: character,
  })

  const handleSave = async (e) => {
    e.preventDefault()
    console.log('single character: ', character)
    try {
      await dispatch(postTalent(talent, token))
      await dispatch(getCharacter())
      // await dispatch(getTalent())
      console.log('talent: ', talent)
    } catch (error) {
      console.log('Errore creazione place: ', error)
    }
  }

  return (
    <div>
      <h5>- Gestione Talenti</h5>
      <div className="flex">
        <div>
          {/* CREAZIONE TALENT   */}
          <div className="flex justify-center ">
            <form className="w-full text-white ">
              <div className="p-7 h-auto">
                <h2 className="font-semibold leading-7 text-sm">
                  Crea un Talento
                </h2>

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
                        // value={talent.name}
                        onChange={(e) => {
                          setTalent({
                            ...talent,
                            name: e.target.value,
                          })
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* <div className="sm:col-span-3 pt-5">
                  <label
                    htmlFor="vision"
                    className="block text-sm font-medium leading-6 text-left"
                  >
                    Costellazione
                  </label>
                  <div className="mt-2">
                    <select
                      id="vision"
                      name="vision"
                      autoComplete="vision-name"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      //value={place.region_id}
                      //   onChange={(e) => {
                      //     setDegree({
                      //       ...degree,
                      //       constellation_id: e.target.value,
                      //     })
                      //   }}
                    >
                      <option>Seleziona una costellazione</option>
                      {/* {constellationData.content &&
                    constellationData.content.map((constellation) => (
                      <option key={constellation.id} value={constellation.id}>
                        {constellation.name}
                      </option>
                    ))} 
                    </select>
                  </div>
                </div> */}

                <div className="col-span-full pt-5">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-left"
                  >
                    Info
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="about"
                      name="about"
                      rows={5}
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300  "
                      //   value={talent.info}
                      onChange={(e) => {
                        setTalent({
                          ...talent,
                          info: e.target.value,
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
                    // onClick={(e) => {
                    //   e.preventDefault()
                    //   handleUpdate()
                    // }}
                  >
                    Salva modifiche
                  </button>
                </div>
              </div>
            </form>
          </div>
          {/* FINE CREAZIONE TALENT  */}
        </div>
        <div>lista</div>
      </div>
    </div>
  )
}

export default Talent

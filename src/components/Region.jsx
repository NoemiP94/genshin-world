// import CreateRegion from './CreateRegion'
// import ListRegion from './ListRegion'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRegion, postRegion, updateRegion } from '../redux/action/regions'

const Region = () => {
  const dispatch = useDispatch()
  const [region, setRegion] = useState({
    name: '',
    vision: '',
    description: '',
    archon: '',
  })

  const data = useSelector((state) => state.region.list)
  const [updtRegion, setUpdtRegion] = useState(null)
  const [idRegion, setIdRegion] = useState('')

  const token = localStorage.getItem('token')

  const handlePencilUpdate = (region) => {
    setUpdtRegion(region)
    setIdRegion(region.id)
    setRegion({
      name: region.name,
      vision: region.vision,
      description: region.description,
      archon: region.archon,
    })
    console.log('regione passata', region)
    console.log('id regione selezionato', region.id)
    console.log('Matita cliccata')
  }

  const handleUpdate = async () => {
    try {
      await dispatch(updateRegion(idRegion, region, token))
      dispatch(getRegion())
      console.log('Modificato con successo!')
    } catch (error) {
      console.log('Errore nella modifica', error)
    }
  }

  return (
    <div>
      <h2 className="mt-5">Gestione Regioni di Teyvat</h2>
      <div className="container m-6 w-full flex">
        <div>
          <form className="w-64 text-white">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="font-semibold leading-7">Crea una Regione</h2>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6"
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
                      value={region.name}
                      onChange={(e) => {
                        setRegion({
                          ...region,
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
                  className="block text-sm font-medium leading-6"
                >
                  Visione
                </label>
                <div className="mt-2">
                  <select
                    id="vision"
                    name="vision"
                    autoComplete="vision-name"
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    value={region.vision}
                    onChange={(e) => {
                      setRegion({
                        ...region,
                        vision: e.target.value,
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

              <div className="col-span-full pt-2">
                <label htmlFor="about" className="block text-sm font-medium">
                  Descrizione
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="about"
                    rows={5}
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300  "
                    defaultValue={''}
                    value={region.description}
                    onChange={(e) => {
                      setRegion({
                        ...region,
                        description: e.target.value,
                      })
                    }}
                  />
                </div>
              </div>

              <div className="sm:col-span-3 pt-2">
                <label htmlFor="archon" className="block text-sm font-medium">
                  Archon
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="archon"
                    id="archon"
                    autoComplete="archon"
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 "
                    value={region.archon}
                    onChange={(e) => {
                      setRegion({
                        ...region,
                        archon: e.target.value,
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
                  onClick={(e) => {
                    e.preventDefault()
                    dispatch(postRegion(region, token))
                  }}
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
        <div>
          <ul role="list" className="divide-y divide-gray-100 ms-5">
            <p className="text-white">Lista regioni</p>
            {data.content &&
              data.content.map((region) => (
                <li key={region.id} className="my-3 text-left">
                  <div className="flex justify-between	">
                    <div>
                      <p className="pt-2">Nome: {region.name}</p>
                      <p>Tipo di visione: {region.visionType}</p>
                      <p>Lista località </p>
                    </div>
                    <div className="m-2 ">
                      <div className="flex my-1">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-6 me-1"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div>
                          <p>Aggiungi località</p>
                        </div>
                      </div>
                      <div className="flex my-1">
                        <button
                          className="block text-white"
                          type="button"
                          onClick={() => handlePencilUpdate(region)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-6 me-1"
                          >
                            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                          </svg>
                          Modifica Regione
                        </button>
                      </div>
                      <div className="flex my-1">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-6 me-1"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div>
                          <p>Elimina regione</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
export default Region

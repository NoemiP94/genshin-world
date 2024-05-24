import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { postRegion } from '../redux/action/regions'

const CreateRegion = () => {
  const [region, setRegion] = useState({
    name: '',
    vision: '',
    description: '',
    archon: '',
  })

  const token = localStorage.getItem('token')

  const dispatch = useDispatch()

  return (
    <>
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
            <button type="button" className="text-sm font-semibold">
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
              Save
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default CreateRegion

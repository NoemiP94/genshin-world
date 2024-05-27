import { useState } from 'react'
import { useDispatch } from 'react-redux'

const ModalRegion = (setShow, regionId, region) => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const [updtRegion, setUpdtRegion] = useState({
    name: regionId,
    //vision: region.vision,
    // description: region.description,
    // archon: region.archon,
  })

  const handleClose = () => {
    setShow(false)
  }

  return (
    <div
      id="crud-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      //show={true}
      //onHide={handleClose}
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* <!-- Modal header --> */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Modifica Regione
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="crud-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* <!-- Modal body --> */}
          <form className="p-4 md:p-5">
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nome
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={updtRegion.name}
                  onChange={(e) => {
                    setUpdtRegion({
                      ...updtRegion,
                      name: e.target.value,
                    })
                  }}
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="vision"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Visione
                </label>
                <select
                  id="vision"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={updtRegion.vision}
                  onChange={(e) => {
                    setUpdtRegion({
                      ...updtRegion,
                      vision: e.target.value,
                    })
                  }}
                >
                  <option>Anemo</option>
                  <option>Geo</option>
                  <option>Electro</option>
                  <option>Dendro</option>
                  <option>Hydro</option>
                  <option>Pyro</option>
                  <option>Cryo</option>
                </select>
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Descrizione
                </label>
                <textarea
                  id="description"
                  rows={5}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={updtRegion.description}
                  onChange={(e) => {
                    setUpdtRegion({
                      ...updtRegion,
                      description: e.target.value,
                    })
                  }}
                ></textarea>
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="archon"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Archon
                </label>
                <input
                  type="text"
                  name="archon"
                  id="archon"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={updtRegion.archon}
                  onChange={(e) => {
                    setUpdtRegion({
                      ...updtRegion,
                      archon: e.target.value,
                    })
                  }}
                />
              </div>
            </div>
            <button
              type="submit"
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="me-1 -ms-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Salva modifiche
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ModalRegion

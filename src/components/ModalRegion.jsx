import { useState } from 'react'

const ModalRegion = ({ showModal, setShowModal, region, regionId }) => {
  const [newRegion, setNewRegion] = useState({
    id: region.id,
    name: region.name,
    vision: region.vision,
    description: region.description,
    archon: region.archon,
  })

  const handleSending = async (e) => {
    e.preventDefault()
    console.log('regionId', regionId)
    console.log('region', region)
    console.log('newRegion', newRegion)
    setShowModal(false)
  }

  return (
    <>
      {showModal ? (
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                <h3 className="text-3xl font=semibold">Modifica Regione</h3>
                <button
                  className="bg-transparent border-0 text-black float-right"
                  onClick={() => setShowModal(false)}
                >
                  <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                    x
                  </span>
                </button>
              </div>
              <div className="relative p-6 flex-auto">
                <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                  <label className="block text-black text-sm font-bold mb-1">
                    Nome
                  </label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-1 text-white"
                    value={newRegion.name}
                    onChange={(e) => {
                      setNewRegion({
                        ...newRegion,
                        name: e.target.value,
                      })
                    }}
                  />
                  <label className="block text-black text-sm font-bold mb-1">
                    Visione
                  </label>
                  <select
                    id="vision"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={newRegion.vision}
                    onChange={(e) => {
                      setNewRegion({
                        ...newRegion,
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
                  <label className="block text-black text-sm font-bold mb-1">
                    Descrizione
                  </label>
                  <textarea
                    id="description"
                    rows={5}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={newRegion.description}
                    onChange={(e) => {
                      setNewRegion({
                        ...newRegion,
                        description: e.target.value,
                      })
                    }}
                  ></textarea>
                  <label className="block text-black text-sm font-bold mb-1">
                    Archon
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-1 text-white"
                    value={newRegion.archon}
                    onChange={(e) => {
                      setNewRegion({
                        ...newRegion,
                        archon: e.target.value,
                      })
                    }}
                  />
                </form>
              </div>
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  onClick={handleSending}
                >
                  Salva
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default ModalRegion

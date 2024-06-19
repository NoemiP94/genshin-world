import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMaterial, postMaterial } from '../redux/action/materials'

const Material = () => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const [material, setMaterial] = useState({
    name: '',
    description: '',
    materialType: '',
  })

  const materialData = useSelector((state) => state.material.list)
  useEffect(() => {
    dispatch(getMaterial())
  }, [dispatch])

  //SAVE MATERIAL
  const saveMaterial = async () => {
    try {
      await dispatch(postMaterial(material, token))
    } catch (error) {
      console.log('Errore nel salvataggio', error)
    }
  }

  return (
    <div>
      <h2 className="mt-5 text-2xl font-bold">Gestione Materiali</h2>
      <div className="container my-6 w-full flex h-1/2">
        {/* CREA MATERIAL */}
        <div className="w-2/4 flex justify-center">
          <form className="w-full  text-white">
            <div className=" p-7 h-auto">
              <h2 className="font-semibold leading-7 text-lg">
                Crea una Materiale
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
                      //   value={region.name}
                      onChange={(e) => {
                        setMaterial({
                          ...material,
                          name: e.target.value,
                        })
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-3 pt-5">
                <label
                  htmlFor="materialType"
                  className="block text-sm font-medium leading-6 text-left"
                >
                  Tipo
                </label>
                <div className="mt-2">
                  <select
                    id="materialType"
                    name="materialType"
                    autoComplete="materialType-name"
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    value={material.materialType}
                    onChange={(e) => {
                      setMaterial({
                        ...material,
                        materialType: e.target.value,
                      })
                    }}
                  >
                    <option>Seleziona un tipo</option>
                    <option>Risorsa</option>
                    <option>CiboPozioni</option>
                    <option>Trofei</option>
                    <option>OggettiUtili</option>
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
                    // value={region.description}
                    onChange={(e) => {
                      setMaterial({
                        ...material,
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
                >
                  Svuota
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm"
                  onClick={(e) => {
                    e.preventDefault()
                    saveMaterial()
                  }}
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

        {/* FINE CREAZIONE MATERIAL */}
        {/* INIZIO LISTA MATERIAL */}
        <div className="w-2/4">
          <p className="text-white text-lg">Lista Materiali</p>
          <ul
            role="list"
            className="divide-y divide-gray-100 ms-5 overflow-y-scroll px-5 h-2/3"
          >
            {materialData.content &&
              materialData.content.map((material) => (
                <li key={material.id} className="my-3 text-left px-5 py-3 ">
                  <div className="flex justify-between">
                    <div className="w-3/4 ">
                      <p>
                        - Nome: <span className="italic">{material.name}</span>
                      </p>
                      <p>
                        - Descrizione:{' '}
                        <span className="italic">{material.description}</span>
                      </p>
                      {/* <p className=" overflow-x-scroll ">
                    - Link img: <span className="italic">{place.image}</span>
                  </p> */}
                    </div>
                    <div className="w-1/4 mt-4">
                      {/* bottone immagine */}
                      <button
                        type="button"
                        className="inline-flex w-full justify-center bg-green-500 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 sm:ml-3 sm:w-auto"
                        //onClick={() => showModalImg(place.id)}
                      >
                        Aggiungi immagine
                      </button>
                    </div>
                  </div>
                  {/* {showImgModal && selectedPlace && (
                  <ModalImg
                    showImgModal={showImgModal}
                    setShowImgModal={setShowImgModal}
                    placeId={selectedPlace}
                  />
                )} */}
                </li>
              ))}
          </ul>
        </div>
        {/* FINE LISTA LUOGHI */}
      </div>
    </div>
  )
}

export default Material

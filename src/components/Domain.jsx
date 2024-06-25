import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRegion } from '../redux/action/regions'

const Domain = () => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const regionData = useSelector((state) => state.region.list)

  useEffect(() => {
    dispatch(getRegion())
  }, [dispatch])

  return (
    <div className="h-screen">
      <h2 className="mt-5 text-2xl font-bold">Gestione Domini</h2>
      <div className="container my-6 w-full flex">
        {/* CREA DOMAIN */}
        <div className="w-2/4 flex justify-center">
          <form className="w-full  text-white">
            <div className=" p-7 h-auto">
              <h2 className="font-semibold leading-7 text-lg">
                Crea un Dominio
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
                      //   value={weapon.name}
                      //   onChange={(e) => {
                      //     setWeapon({
                      //       ...weapon,
                      //       name: e.target.value,
                      //     })
                      //   }}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="place"
                    className="block text-sm font-medium leading-6 text-left"
                  >
                    Luogo
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="place"
                      id="place"
                      autoComplete="place"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      //   value={weapon.name}
                      //   onChange={(e) => {
                      //     setWeapon({
                      //       ...weapon,
                      //       name: e.target.value,
                      //     })
                      //   }}
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-3 pt-5">
                <label
                  htmlFor="domainType"
                  className="block text-sm font-medium leading-6 text-left"
                >
                  Tipo Dominio
                </label>
                <div className="mt-2">
                  <select
                    id="domainType"
                    name="domainType"
                    autoComplete="domainType-name"
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    // value={weapon.weaponType}
                    // onChange={(e) => {
                    //   setWeapon({
                    //     ...weapon,
                    //     weaponType: e.target.value,
                    //   })
                    // }}
                  >
                    <option>Seleziona un tipo</option>
                    <option>DominioConquista</option>
                    <option>Manufatti</option>
                    <option>MaterialiArmi</option>
                    <option>MaterialiTalenti</option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-3 pt-5">
                <label
                  htmlFor="region"
                  className="block text-sm font-medium leading-6 text-left"
                >
                  Regione
                </label>
                <div className="mt-2">
                  <select
                    id="region"
                    name="region"
                    autoComplete="region-name"
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    // value={weapon.stars}
                    // onChange={(e) => {
                    //   setWeapon({
                    //     ...weapon,
                    //     stars: e.target.value,
                    //   })
                    // }}
                  >
                    <option>Seleziona Regione</option>
                    {regionData.content &&
                      regionData.content.map((region) => (
                        <option key={region.id} value={region.id}>
                          {region.name}
                        </option>
                      ))}
                  </select>
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
                  //   onClick={(e) => {
                  //     e.preventDefault()
                  //     saveWeapon()
                  //   }}
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
        {/* FINE CREAZIONE DOMAIN */}
      </div>
    </div>
  )
}

export default Domain

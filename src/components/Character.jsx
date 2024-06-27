import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRegion } from '../redux/action/regions'

const Character = () => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')

  //GET REGION
  const regionData = useSelector((state) => state.region.list)
  useEffect(() => {
    dispatch(getRegion())
  }, [dispatch])

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
                      //   value={enemy.name}
                      //   onChange={(e) => {
                      //     setEnemy({
                      //       ...enemy,
                      //       name: e.target.value,
                      //     })
                      //   }}
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="voice"
                    className="block text-sm font-medium leading-6 text-left"
                  >
                    Voce
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="voice"
                      id="voice"
                      autoComplete="voice"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      //   value={enemy.voice}
                      //   onChange={(e) => {
                      //     setEnemy({
                      //       ...enemy,
                      //       voice: e.target.value,
                      //     })
                      //   }}
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
                      //   value={enemy.birthday}
                      //   onChange={(e) => {
                      //     setEnemy({
                      //       ...enemy,
                      //       birthday: e.target.value,
                      //     })
                      //   }}
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
                      //   value={enemy.affiliate}
                      //   onChange={(e) => {
                      //     setEnemy({
                      //       ...enemy,
                      //       affiliate: e.target.value,
                      //     })
                      //   }}
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
                      // value={weapon.stars}
                      // onChange={(e) => {
                      //   setWeapon({
                      //     ...weapon,
                      //     stars: e.target.value,
                      //   })
                      // }}
                    >
                      <option>Seleziona stelle</option>

                      <option>FOUR</option>
                      <option>FIVE</option>
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
                      // value={region.vision}
                      // onChange={(e) => {
                      //   setRegion({
                      //     ...region,
                      //     vision: e.target.value,
                      //   })
                      // }}
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
                      // value={weapon.weaponType}
                      // onChange={(e) => {
                      //   setWeapon({
                      //     ...weapon,
                      //     weaponType: e.target.value,
                      //   })
                      // }}
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
                      //value={place.region_id}
                      //   onChange={(e) => {
                      //     setPlace({
                      //       ...place,
                      //       region_id: e.target.value,
                      //     })
                      //   }}
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
                      // value={region.description}
                      // onChange={(e) => {
                      //   setRegion({
                      //     ...region,
                      //     description: e.target.value,
                      //   })
                      // }}
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
                  // onClick={handleSave}
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
        {/* FINE CREA CHARACTER */}
      </div>
    </div>
  )
}

export default Character

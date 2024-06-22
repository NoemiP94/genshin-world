import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { postWeapon } from '../redux/action/weapons'

const Weapon = () => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const [weapon, setWeapon] = useState({
    name: '',
    description: '',
    weaponType: '',
    stars: '',
    details: '',
  })

  //SAVE WEAPON
  const saveWeapon = async () => {
    try {
      await dispatch(postWeapon(weapon, token))
      //await dispatch(getWeapon())
    } catch (error) {
      console.log('Errore nel salvataggio', error)
    }
  }

  return (
    <div className="h-screen">
      <h2 className="mt-5 text-2xl font-bold">Gestione Armi</h2>
      <div className="container my-6 w-full flex">
        {/* CREA WEAPON */}
        <div className="w-2/4 flex justify-center">
          <form className="w-full  text-white">
            <div className=" p-7 h-auto">
              <h2 className="font-semibold leading-7 text-lg">
                Crea un&apos;Arma
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
                      onChange={(e) => {
                        setWeapon({
                          ...weapon,
                          name: e.target.value,
                        })
                      }}
                    />
                  </div>
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
                    // value={material.weaponType}
                    onChange={(e) => {
                      setWeapon({
                        ...weapon,
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
                    onChange={(e) => {
                      setWeapon({
                        ...weapon,
                        stars: e.target.value,
                      })
                    }}
                  >
                    <option>Seleziona stelle</option>
                    <option>ONE</option>
                    <option>TWO</option>
                    <option>THREE</option>
                    <option>FOUR</option>
                    <option>FIVE</option>
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
                    // value={weapon.description}
                    onChange={(e) => {
                      setWeapon({
                        ...weapon,
                        description: e.target.value,
                      })
                    }}
                  />
                </div>
              </div>
              <div className="col-span-full pt-5">
                <label
                  htmlFor="details"
                  className="block text-sm font-medium text-left"
                >
                  Dettagli
                </label>
                <div className="mt-2">
                  <textarea
                    id="details"
                    name="details"
                    rows={4}
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 "
                    // value={weapon.details}
                    onChange={(e) => {
                      setWeapon({
                        ...weapon,
                        details: e.target.value,
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
                    saveWeapon()
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
        {/* FINE CREAZIONE WEAPON */}
      </div>
    </div>
  )
}

export default Weapon

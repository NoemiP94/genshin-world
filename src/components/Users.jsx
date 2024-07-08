import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getAllUsers, postRegister } from '../redux/action'

const Users = () => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')

  //SAVE USER
  const [register, setRegister] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
  })

  const handleSave = async () => {
    try {
      await dispatch(postRegister(register))
      dispatch(getAllUsers(token))
    } catch (error) {
      console.log("Errore nell'aggiornamento", error)
    }
  }

  return (
    <div>
      <div className="mt-5 text-2xl font-bold">Gestione Utenti</div>
      <div className="container my-6 w-full flex">
        {/* CREA USER */}
        <div className="w-2/4 flex justify-center">
          <form className="w-full  text-white">
            <div className=" p-7 h-auto">
              <h2 className="font-semibold leading-7 text-lg">
                Crea un nuovo Utente
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
                      //   value={artifact.name}
                      onChange={(e) => {
                        setRegister({
                          ...register,
                          name: e.target.value,
                        })
                      }}
                    />
                  </div>
                </div>{' '}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="surname"
                    className="block text-sm font-medium leading-6 text-left"
                  >
                    Cognome
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="surname"
                      id="surname"
                      autoComplete="surname"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      //   value={artifact.name}
                      onChange={(e) => {
                        setRegister({
                          ...register,
                          surname: e.target.value,
                        })
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-left"
                  >
                    Email
                  </label>
                  <div className="mt-2">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      //   value={artifact.name}
                      onChange={(e) => {
                        setRegister({
                          ...register,
                          email: e.target.value,
                        })
                      }}
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-left"
                  >
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      autoComplete="password"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      //   value={artifact.name}
                      onChange={(e) => {
                        setRegister({
                          ...register,
                          password: e.target.value,
                        })
                      }}
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
        {/* FINE CREA USER */}
      </div>
    </div>
  )
}

export default Users

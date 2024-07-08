import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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

  //GET USERS
  const userData = useSelector((state) => state.login.list)
  useEffect(() => {
    dispatch(getAllUsers(token))
  }, [dispatch])

  return (
    <div>
      <div className="mt-5 text-2xl font-bold">Gestione Utenti</div>
      <div className="container my-6 w-full flex flex-col">
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
        {/* LISTA USER */}
        <div>
          <p className="text-white text-lg">Lista Utenti</p>
          <ul
            role="list"
            className="divide-y divide-gray-100 ms-5 overflow-y-scroll px-5 w-3/4"
          >
            {userData.content &&
              userData.content.map((user) => (
                <li key={user.id} className="my-3 text-left px-5 py-3 ">
                  <div className="flex justify-between flex-col">
                    <div className="w-3/4 flex justify-between">
                      <div className="flex flex-col">
                        <p>
                          - Nome: <span className="italic">{user.name}</span>
                        </p>
                        <p className=" overflow-y-scroll">
                          - Cognome:{' '}
                          <span className="italic">{user.surname}</span>
                        </p>{' '}
                        <p className=" overflow-y-scroll">
                          - Email: <span className="italic">{user.email}</span>
                        </p>{' '}
                      </div>

                      <div className="w-1/4 mt-4 mx-4 flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="#facc15"
                          className="size-8 mx-2"
                          // onClick={() => {
                          //   handlePencilUpdate(artifact)
                          // }}
                        >
                          <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="#dc2626"
                          className="size-8 mx-2"
                          // onClick={() => {
                          //   handleDelete(artifact)
                          // }}
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
        {/* FINE LISTA USER */}
      </div>
    </div>
  )
}

export default Users

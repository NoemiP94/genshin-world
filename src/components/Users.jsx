import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, getAllUsers, postRegister } from '../redux/action'
import ModalUserImg from './modals/ModalUserImg'

const Users = () => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')

  //PAGINATION
  const [currentPage, setCurrentPage] = useState(0)
  const elementsPerPage = 10
  const orderElements = 'name'

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  //SAVE USER
  const [register, setRegister] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
  })

  const handleReset = () => {
    setRegister({
      name: '',
      surname: '',
      email: '',
      password: '',
    })
  }

  const handleSave = async () => {
    try {
      await dispatch(postRegister(register))
      await dispatch(
        getAllUsers(token, currentPage, elementsPerPage, orderElements)
      )
      await handleReset()
    } catch (error) {
      console.log("Errore nell'aggiornamento", error)
    }
  }

  //GET USERS
  const userData = useSelector((state) => state.login.list)
  useEffect(() => {
    dispatch(getAllUsers(token, currentPage, elementsPerPage, orderElements))
  }, [dispatch, currentPage, elementsPerPage, orderElements])

  //DELETE USER
  const handleDelete = async (user) => {
    try {
      await dispatch(deleteUser(user.id, token))
      await dispatch(
        getAllUsers(token, currentPage, elementsPerPage, orderElements)
      )
      console.log('Eliminato con successo')
    } catch (error) {
      console.log("Errore nell'eliminazione", error)
    }
  }

  //IMG MODAL
  const [showUserImgModal, setShowUserImgModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  const showUserModal = (idUser) => {
    setSelectedUser(idUser)
    setShowUserImgModal(true)
  }

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
                    Nome *
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      required
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
                    Cognome *
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      required
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
                    Email *
                  </label>
                  <div className="mt-2">
                    <input
                      type="email"
                      required
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
                    Password *
                  </label>
                  <div className="mt-2">
                    <input
                      type="password"
                      required
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
                  onClick={handleReset}
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
                {/* <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  //   onClick={(e) => {
                  //     e.preventDefault()
                  //     handleUpdate()
                  //   }}
                >
                  Salva modifiche
                </button> */}
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
                        <p>
                          - Cognome:{' '}
                          <span className="italic">{user.surname}</span>
                        </p>{' '}
                        <p>
                          - Email: <span className="italic">{user.email}</span>
                        </p>{' '}
                      </div>

                      <div className="w-1/4 mt-4 mx-4 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#15803d"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-8 mx-2"
                          onClick={() => showUserModal(user.id)}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />{' '}
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="#dc2626"
                          className="size-8 mx-2"
                          onClick={() => {
                            handleDelete(user)
                          }}
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div className="ms-5">
                          {user.image !== null ? (
                            <img
                              src={user.image}
                              className="w-14 border border-yellow-600 rounded-lg w-14 mx-auto"
                            />
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                  {showUserImgModal && selectedUser && (
                    <ModalUserImg
                      showImgModal={showUserImgModal}
                      setShowImgModal={setShowUserImgModal}
                      userId={selectedUser}
                      currentPage={currentPage}
                      elementsPerPage={elementsPerPage}
                      orderElements={orderElements}
                    />
                  )}
                </li>
              ))}
          </ul>
          <div className="flex justify-center mt-4 text-white">
            {userData && (
              <div className="justify-content-center custom-page">
                {[...Array(userData.totalPages).keys()].map((number) => (
                  <button
                    key={number}
                    onClick={() => handlePageChange(number)}
                    className={`custom-item border p-4 ${
                      number === currentPage - 1 ? 'active' : ''
                    }`}
                  >
                    {number + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* FINE LISTA USER */}
      </div>
    </div>
  )
}

export default Users

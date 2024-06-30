const Degree = () => {
  return (
    <div>
      {/* CREAZIONE DEGREE   */}
      <div className="flex justify-center ">
        <form className="w-full text-white ">
          <div className="p-7 h-auto">
            <h2 className="font-semibold leading-7 text-lg">Crea un Grado</h2>

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
                    //value={place.name}
                    // onChange={(e) => {
                    //   setPlace({
                    //     ...place,
                    //     name: e.target.value,
                    //   })
                    // }}
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="level"
                className="block text-sm font-medium leading-6 text-left"
              >
                Livello
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="level"
                  id="level"
                  autoComplete="level"
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  //value={place.level}
                  // onChange={(e) => {
                  //   setPlace({
                  //     ...place,
                  //     level: e.target.value,
                  //   })
                  // }}
                />
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
                  {/* {regionData.content &&
                regionData.content.map((region) => (
                  <option key={region.id} value={region.id}>
                    {region.name}
                  </option>
                ))} */}
                </select>
              </div>
            </div>

            <div className="col-span-full pt-5">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-left"
              >
                Descrizione
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={5}
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300  "
                  // value={place.description}
                  //   onChange={(e) => {
                  //     setPlace({
                  //       ...place,
                  //       description: e.target.value,
                  //     })
                  //   }}
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
      {/* FINE CREAZIONE LUOGO  */}
    </div>
  )
}

export default Degree

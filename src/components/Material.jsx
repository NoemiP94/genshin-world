const Material = () => {
  //Creazione
  //form( name, description, materialType(dropdown))

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
                      //   onChange={(e) => {
                      //     setRegion({
                      //       ...region,
                      //       name: e.target.value,
                      //     })
                      //   }}
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-3 pt-5">
                <label
                  htmlFor="vision"
                  className="block text-sm font-medium leading-6 text-left"
                >
                  Tipo
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
                    // onChange={(e) => {
                    //   setRegion({
                    //     ...region,
                    //     description: e.target.value,
                    //   })
                    // }}
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
                  //   onClick={(e) => {
                  //     e.preventDefault()
                  //     saveRegion()
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

        {/* FINE CREAZIONE MATERIAL */}
      </div>
    </div>
  )
}

export default Material

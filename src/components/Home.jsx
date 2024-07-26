import primo from '../assets/primogem.webp'
const Home = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center m-4">
      <h1 className="font-black text-7xl">Benvenuto in Genshin World!</h1>
      <p className="text-5xl my-10">
        Da questa piattaforma potrai gestire tutti i contenuti del tuo sito sul
        famoso action RPG
      </p>
      <p className="text-5xl my-10">
        Per iniziare scegli una delle voci nella barra laterale...
      </p>
      <p className="text-5xl my-10">Buon lavoro!</p>
      <img src={primo} />
    </div>
  )
}

export default Home

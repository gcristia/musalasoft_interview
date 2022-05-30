import { AppRouter } from './routers/AppRouter'
import { Navbar } from './components/shared/Navbar'
import { Footer } from './components/shared/Footer'

function GatewayApp () {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className='container'>
        <AppRouter />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default GatewayApp

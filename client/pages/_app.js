import '../styles/globals.css'
import Link from 'next/link'
import "./app.css"

function MyApp({ Component, pageProps }) {

  return (
    <div>
      <nav className="border-b p-6">
        <p className="text-4xl font-bold">Hexaview Webinar</p>
        <div className="flex mt-4">
          <Link href="/">
            <a className="mr-4 text-teal-400">
              Registration
            </a>
          </Link>
          
        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp;

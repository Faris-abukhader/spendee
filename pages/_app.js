import '../styles/globals.css'
import {SessionProvider} from "next-auth/react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { wrapper } from '../store/store'

function MyApp({
  Component,
  pageProps: {session,user,...pageProps },
}) {
  return (
    <SessionProvider session={session}>
     <Component {...pageProps} />
    </SessionProvider>
  )
}

export default wrapper.withRedux(MyApp)  

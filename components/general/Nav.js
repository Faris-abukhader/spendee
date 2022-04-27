import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
export default function Nav() {
    const { data: session } = useSession()
  return (
    <div className='row justify-content-end align-items-center'>
        <div className='col-4'>
        {session  ? <button onClick={signOut}>signOut</button>:<button onClick={signIn}>signIn</button>}
        </div>
    </div>
  )
}

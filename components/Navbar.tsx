import { NavLinks } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import AuthProviders from './AuthProviders'
import { getCurrentUser } from '@/libs/session'
import { signOut } from 'next-auth/react'
import ProfileMenu from './ProfileMenu'

const Navbar = async () => {
    const session = await getCurrentUser()
    return (
        <nav className='flexBetween navbar'>
            <div className='flex-1 flexStart gap-10'>
                <Link href='/'>
                    <Image src='/logo.svg' alt='logo' width={115} height={45} />
                </Link>
            </div>
            <ul className="xl:flex hidden text-small gap-7">
                {NavLinks.map((item) =>
                    <li key={item.key}>
                        <Link href={item.href}>{item.text}</Link>
                    </li>
                )}
            </ul>
            <div className="flexCenter gap-4">
                {session?.user ?
                    <>
                        <ProfileMenu session={session} />
                        <Link href='/create-project'> Share work</Link>
                    </>
                    :
                    <AuthProviders />}
            </div>
        </nav>
    )
}

export default Navbar
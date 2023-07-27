'use client'
import { useState, useEffect } from 'react'
import { getProviders, signIn } from 'next-auth/react'
import Button from './Button';

type Provider = {
    id: string;
    name: string;
    type: string;
    signinUrl: string;
    callbackUrl: string;
    singinUrlParams?: Record<string, string> | null;
}

type Providers = Record<string, Provider>

const AuthProviders = () => {
    const [providers, setProviders] = useState<Providers | null>(null)

    useEffect(() => {
        const fetchProviders = async () => {
            const res = await getProviders()
            console.log(res);
            setProviders(res)
        }
        fetchProviders()
    }, [])

    if (providers) {
        return (
            <div>
                {Object.values(providers).map((item: Provider, index) =>
                    <Button key={index} title='Sign In' handleClick={() => signIn(item?.id)} />
                )}
            </div>
        )
    }
}

export default AuthProviders
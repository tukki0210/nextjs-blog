import React, {FC, ReactNode } from 'react'
import Head from 'next/head'
import Link from 'next/link'


const name = 'Tsukuda Naoki'
export const siteTitle = "カメラとプログラミング"

type Props = {
    children?: ReactNode
    home?: any;
}


const Layout  = ({ children, home} : Props ) => {
    return (
            <div className={"container p-0 m-auto"}>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" /> 
            </Head>
            <header className={"flex flex-col items-center"}>
                {home ? (
                    <>
                        <img
                            src="/images/profile.JPG"
                            className={"w-24 h-24 rounded-full"}
                            alt={name}
                        />
                        <h1 className={'text-black'}>{siteTitle}</h1>
                    </>
                ) : (
                        <>
                            <Link href="/">
                                <a>
                                    <img
                                        src="/images/profile.JPG"
                                        className={"w-24 h-24 rounded-full"}
                                        alt={name}
                                    />
                                </a>
                            </Link>
                            <h2 className={"text-2xl"}>
                                <Link href="/">
                                    <a>{name}</a>
                                </Link>
                            </h2>
                        </>
                    )}
            </header>
            <main>{children}</main>
            {!home && (
                <div className={"m-0"}>
                    <Link href="/">
                        <a> Back to home</a>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default Layout;
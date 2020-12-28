import React, { FC, ReactNode } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'


const name = 'つっきー'
export const siteTitle = "カメラと時々プログラミング(工事中)"
export const subTitle = ""

type Props = {
    children?: ReactNode
    home?: any;
}


const Layout = ({ children, home }: Props) => {
    return (

        <div className={"container p-0 m-auto"}>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <header className={"flex flex-col items-center"}>
                {home ? (
                    <>
                        <h1 className={'text-gray-50 text-4xl font-sans .font-extrabold'}>{siteTitle}</h1>
                    </>
                ) : (
                        <>
                            <h2 className={'text-gray-50 text-4xl font-sans .font-extrabold'}>
                                <Link href="/">
                                    <a className={'text-gray-50 text-4xl font-sans .font-extrabold'}>{siteTitle}</a>
                                </Link>
                            </h2>
                        </>
                    )}
            </header>
            <div className={'flex justify-between mb-1'}>
                <main className={'w-10/12'}>{children}</main>
                <aside className={'w-2/12'}>
                    <h3>カテゴリー</h3>
                    <ul>
                        <ul className={""}>カメラの話
                            <li>Nikon</li>
                            <li>レンズ</li>
                        </ul>
                        <ul>プログラミングの話
                            <li>Java</li>
                            <li>React</li>
                        </ul>
                    </ul>
                    <div className={"rounded overflow-hidden shadow maz-w-xs my-3"}>
                        <Image  className={"w-24 h-24 rounded-full"}
                            src="/images/tukki.jpg" 
                            height="300"
                            width="300"
                        />
                    </div>
                </aside>
            </div>
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
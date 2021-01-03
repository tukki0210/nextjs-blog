import React, { FC, ReactNode } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'


const name = 'つっきー'
export const siteTitle = "カメラと時々プログラミング(工事中)"
export const subTitle = ""

type Props = {
    children?: ReactNode
}


const Layout = ({ children }: Props) => {
    return (

        <div className={"container p-0 m-auto"}>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <header className={"flex flex-col items-center bg-gray-50"}>
                <Link href="/">
                    <h1 className={'text-black text-4xl font-sans .font-extrabold'}>{siteTitle}</h1>
                </Link>
            </header>

            <div className={'flex justify-between mb-1'}>
                <main className={'w-10/12'}>{children}</main>

                <aside className={'w-2/12 my-14'}>
                    <div className={"bg-gray-50 rounded rounded-t-lg overflow-hidden shadow max-w-xs my-3bg-gray-50"}>
                        <Image className="w-full"
                            src="/images/12月/DSC_8467.jpg"
                            height=""
                            width=""
                        />
                        <div className="flex justify-center -mt-8">
                            <Image className={"rounded-full border-solid border-white border-2 -mt-3"}
                                src="/images/tukki.jpg"
                                height="100"
                                width="100"
                            />
                        </div>
                        <div className="text-center px-3 pb-6 pt-2">
                            <h2 className="text-black text-lg bold font-sans"> つっきー </h2>
                            <p className="text-black mt-2 font-sans font-light text-grey-dark">某地方公務員の技術系のメモ置き場です</p>
                        </div>
                    </div>

                    <div className={"bg-gray-50 rounded rounded-t-lg mt-2 p-4 "}>
                        <h3>カテゴリー</h3>
                        <div>
                            <ul className={""}>カメラの話
                            <li>Nikon</li>
                                <li>レンズ</li>
                            </ul>
                            <ul>プログラミングの話
                            <li>Java</li>
                                <li>React</li>
                            </ul>
                        </div>
                    </div>

                </aside>
            </div>
        </div>
    )
}

export default Layout;
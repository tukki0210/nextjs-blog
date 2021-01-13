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
                <meta property="og:title" content={siteTitle} />
                {/* <meta property="og:description" content={description} /> */}
                {/* <meta name="keywords" content={keyword} /> */}
                <meta property="og:type" content="blog" />
                {/* <meta property="og:url" content={url} /> */}
                {/* <meta property="og:image" content={image} /> */}
                <meta property="og:site_name" content={siteTitle} />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:site" content="@tcr_jp" />
                {/* <meta name="twitter:url" content={image} /> */}
                {/* <meta name="twitter:title" content={title} /> */}
                {/* <meta name="twitter:description" content={description} /> */}
                {/* <meta name="twitter:image" content={image} /> */}
                {/* <link rel="canonical" href={url} /> */}

            </Head>
            <header className={"flex flex-col items-center bg-gray-50 rounded-lg "}>
                <Link href="/">
                    <h1 className={'text-black text-4xl font-sans .font-extrabold'}>{siteTitle}</h1>
                </Link>
            </header>
            {/* lg(1024px)以上の画面サイズでflexboxに変更 */}
            <div className={'block lg:flex justify-between mb-1'}>
                <main className={'w-auto'}>{children}</main>

                <aside className={'w-auto px-2 my-14'}>
                    {/* プロフィールカード */}
                    <div className={"bg-gray-50 rounded-lg overflow-hidden shadow max-w-xs my-3bg-gray-50"}>
                        <Image className="w-auto"
                            src="/images/components/ukimido.jpg"
                            width={'240'}
                            height={'160'}
                        />

                        <div className="flex justify-center -mt-8">
                            <Image className={"rounded-full border-solid border-white border-2 -mt-3"}
                                src="/images/components/tukki.jpg"
                                width={'100'}
                                height={'100'}
                            />
                        </div>

                        <div className="text-center px-3 pb-6 pt-2">
                            <h2 className="text-black text-lg bold font-sans"> つっきー </h2>
                            <p className="text-black mt-2 font-sans font-light text-grey-dark">某地方公務員の技術系のメモ置き場です</p>
                        </div>
                    </div>
                    {/* プロフィールカード終わり */}

                    {/* カテゴリ */}
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
                    {/* カテゴリ終わり */}
                </aside>
            </div>
        </div>
    )
}

export default Layout;
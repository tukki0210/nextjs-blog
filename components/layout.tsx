import React, { FC, ReactNode } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'


const name = 'つっきー'
export const siteTitle = "地方公務員のプログラミング日記"
export const subTitle = "主にプログラミングについて"

type Props = {
    children?: ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <div>
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
            <header className={"flex flex-col items-center "}>
                <Link href="/">
                    <h1 className={'text-white text-4xl  font-extrabold'}>{siteTitle}</h1>
                </Link>
            </header>
            {/* lg(1024px)以上の画面サイズでflexboxに変更 */}
            <div className={'block lg:flex justify-between mb-1'}>
                <main className={'lg:w-15/18'}>{children}</main>

                <aside className={'lg:w-2/18 px-2 my-14'}>
                    {/* プロフィールカード */}
                    <div className={"bg-gray-50 overflow-hidden shadow max-w-xs my-3bg-gray-50"}>
                        <Image className="w-auto"
                            src="/images/components/ukimido.jpg"
                            alt="profileCard"
                            width={'300'}
                            height={'200'}
                        />

                        <div className="flex justify-center -mt-20">
                            <Image className={"rounded-full border-solid border-white border-2 -mt-3"}
                                src="/images/components/tukki.jpg"
                                alt="profileImage"
                                width={'100'}
                                height={'100'}
                            />
                        </div>

                        <div className="text-center px-3 pb-6 pt-2">
                            <h2 className="text-black text-lg bold ">{name}</h2>
                            <p className="text-black mt-2  font-light text-grey-dark">{subTitle}</p>
                        </div>
                    </div>
                    {/* プロフィールカード終わり */}

                    {/* カテゴリ */}
                    <div className={"bg-gray-50 mt-2 p-4 "}>
                        <h3 className="border-solid border-0 border-b-2 text-blue-300 ">カテゴリー</h3>
                        <h4>プログラミングの話</h4>
                        <ul>
                            <li><a href="#">Java</a></li>
                            <li><a  href="#">JavaScript</a></li>
                            <li><a  href="#">Node.js</a></li>
                            <li><a  href="#">React</a></li>
                            <li><a  href="#">Next.js</a></li>
                        </ul>
                        <h4>読書記録</h4>
                        <ul>
                            <li><a  href="#">ビジネス書</a></li>
                            <li><a  href="#">小説</a></li>
                        </ul>
                        <h4>カメラの話</h4>
                        <ul>
                            <li><a  href="#">カメラ全般</a></li>
                            <li><a  href="#">レンズ</a></li>
                        </ul>
                    </div>
                    {/* カテゴリ終わり */}
                </aside>
            </div>
        </div>
    )
}

export default Layout;
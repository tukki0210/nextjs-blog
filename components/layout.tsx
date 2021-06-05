import React, { ReactNode } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'


const name = 'つっきー'
export const siteTitle = "理系公務員のプログラミング日記"
export const subTitle = "python趣味レベルの理系公務員 → 職業訓練校のIT指導員。このブログはTypeScript + Next.js + TailWind CSS + Vercelで構成してます。（一部未完成）"

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
            <header className={"text-center"}>
                <Link href="/">
                    <h1 className={'text-white text-4xl  font-extrabold mt-0 pt-20'}>{siteTitle}</h1>
                </Link>
            </header>
            {/* xl(1280px)以上の画面サイズでflexboxに変更 */}
            <div className={'xl:container mx-auto my-10 xl:flex xl:justify-between'}>
                <main className={'xl:w-10/12'}>{children}</main>

                <aside className={'mx-auto my-2 w-10/12 xl:w-2/12  md:w-1/2 flex flex-col'}>
                    {/* プロフィールカード */}
                    <div className={"bg-yellow-100 overflow-hidden shadow"}>
                        <Image className=""
                            src="/images/components/ukimido.jpg"
                            alt="profileCard"
                            width={'775'}
                            height={'450'}
                        />

                        <div className="flex justify-center -mt-10">
                            <Image className={"rounded-full border-solid border-white border-2 -mt-3"}
                                src="/images/components/tukki.jpg"
                                alt="profileImage"
                                width={'120'}
                                height={'120'}
                            />
                        </div>

                        <div className="text-center px-3 pb-6 pt-2">
                            <h2 className="text-black text-lg bold ">{name}</h2>
                            <p className="text-black mt-2  font-light text-grey-dark">{subTitle}</p>
                        </div>
                    </div>
                    {/* プロフィールカード終わり */}

                    {/* カテゴリ */}
                    <div className={"bg-yellow-100 mt-2 p-4 "}>
                        <h3 className="border-solid border-0 border-b-2 text-red-600 ">カテゴリー（未対応）</h3>
                        <h4>プログラミングの話</h4>
                        <ul>
                            <li><a href="#">Java</a></li>
                            <li><a href="#">JavaScript</a></li>
                            <li><a href="#">Node.js</a></li>
                            <li><a href="#">React</a></li>
                            <li><a href="#">Next.js</a></li>
                        </ul>
                        <h4>読書記録</h4>
                        <ul>
                            <li><a href="#">ビジネス書</a></li>
                        </ul>
                    </div>
                    {/* カテゴリ終わり */}
                </aside>
            </div>
        </div>
    )
}

export default Layout;
import { FC, ReactNode } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export const siteTitle = "理系公務員のプログラミング日記"
export const subTitle = "職業訓練校でプログラミングの指導員をしてます。自分の勉強内容メモと授業で出した課題の解説が中心です。このブログはTypeScript + Next.js + TailWind CSS + Vercelで構成してます。（一部未完成）"

type Props = {
    pagetitle?: string;
    metaDescription?: string;
    children?: ReactNode
}

const Layout: FC<Props> = ({ pagetitle, metaDescription, children }) => (
    <> 
        <Head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta property="og:title" content={pagetitle} />
            {/* <meta property="og:description" content={description} /> */}
            {/* <meta name="keywords" content={keyword} /> */}
            <meta property="og:type" content="blog" />
            <meta property="og:description" content={metaDescription} />
            {/* <meta property="og:url" content={url} /> */}
            <meta property="og:site_name" content={siteTitle} />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="@tcr_jp" />
            {/* <meta name="twitter:url" content={image} /> */}
            {/* <meta name="twitter:title" content={title} /> */}
            {/* <meta name="twitter:description" content={description} /> */}
            {/* <meta name="twitter:image" content={image} /> */}
            {/* <link rel="canonical" href={url} /> */}

        </Head>
        <header className="text-center">
            <Link href="/">
                <h1 className="text-white text-3xl mt-0 py-4">{siteTitle}</h1>
            </Link>
        </header>
        {/* xl(1280px)以上の画面サイズでflexboxに変更 */}
        <div className="md:mx-auto xl:w-10/12">
            {children}
        </div>
    </>
)

export default Layout;
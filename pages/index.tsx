import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import Link from 'next/link'
import Date from '../components/date'
import Image from 'next/image'

import { getSortedPostsData } from '../lib/posts'

const Home = ({ allPostsData }) => {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className={""}>
        <div className={"flex flex-wrap"}>

          {/* 記事カード */}
          {allPostsData.map(({ id, title, date, image }) => (
            // 各記事の間隔
            <div className={" w-auto md:w-1/2 lg:w-1/3"} key={id}>
              {/* 各記事カードのスタイル */}
              <div className={"mb-4 mr-4 bg-gray-100 overflow-hidden shadow-lg hover:opacity-80 "} >
                <Link href={`/posts/${id}`}>
                  <div>
                    <Image className={"block  bg-cover bg-center transition-transform duration-500 ease-in-out"}
                      src={image}
                      alt={""}
                      width={'450'}
                      height={'300'}
                    />
                    {/* タイトルカード */}
                    <div className={"flex items-center h-12 justify-between leading-tight p-2"}>
                      <p>{title}</p>
                    </div>
                    <small className={"text-grey-darker text-sm pl-4"}>
                      <Date dateString={date} />
                    </small>
                    {/* タイトルカード終わり */}
                  </div>
                </Link>
              </div>
            </div>
          ))}
          {/* 記事カード終わり */}
        </div>
      </div>
    </Layout >
  )
}

export default Home

export async function getStaticProps() {
  const allPostsData = await getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

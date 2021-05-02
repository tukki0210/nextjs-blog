import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import Link from 'next/link'
import Date from '../components/date'
import Image from 'next/image'

import { getSortedPostsData } from '../lib/posts'


const Home = ({ allPostsData }) => {

  // console.log(allPostsData)
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className={"flex flex-wrap"}>
        {/* 記事カード */}
        {allPostsData.map(({ id, title, date, image }) => (
          // 各記事の間隔
          <div className={"mx-auto w-10/12 md:w-1/2 md:mx-0 lg:w-1/3"} key={id}>
            {/* 各記事カードのスタイル */}
            <div className={"mb-4 mx-2 overflow-hidden hover:opacity-80"} >
              <div className={"bg-yellow-100 "}>
                <Link href={`/posts/${id}`}>
                  <div className={"items-center "}>
                    <Image
                      src={image}
                      alt={title}
                      width={'450'}
                      height={'300'}
                    />
                    {/* タイトルカード */}
                    <div className={"items-center h-12 leading-tight px-2"}>
                      <p>{title}</p>
                    </div>
                    <div className={"text-gray-900 flex flex-row-reverse px-4 pb-1"}>
                      <Date dateString={date} />
                    </div>
                    {/* タイトルカード終わり */}
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ))}
        {/* 記事カード終わり */}
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

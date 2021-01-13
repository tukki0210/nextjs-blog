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
      <div className={"container my-12 mx-auto px- md:px-6"}>
        <div className={"flex flex-wrap -mx-1 lg:-mx-4"}>

          {/* 記事カード */}
          {allPostsData.map(({ id, title, date, image }) => (
            <div className={"my-1 px-1 w-auto md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"} key={id}>
              <div className={"bg-gray-100  overflow-hidden rounded-lg shadow-lg"} >
                <Link href={`/posts/${id}`}>
                  <div>
                    <Image className={"block  bg-cover bg-center hover:opacity-50 transition-transform duration-500 ease-in-out"}
                      src={image}
                      width={'450'}
                      height={'300'}
                    />

                    <div className={"flex items-center justify-between leading-tight p-2"}>
                      <p>{title}</p>
                    </div>
                    <small className={"text-grey-darker text-sm ml-2"}>
                      <Date dateString={date} />
                    </small>
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
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

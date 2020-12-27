import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
// import * as utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Date from '../components/date'
import Image from 'next/image'

import { getSortedPostsData } from '../lib/posts'

const Home = ({ allPostsData }) => {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
        <div className={"container my-12 mx-auto px-4 md:px-12"}>
          <div className={"flex flex-wrap -mx-1 lg:-mx-4"}>

            {allPostsData.map(({ id, title, date, image }) => (
              <div className={"my-1 px-1 w-auto md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"}>
                <div className={"bg-white  overflow-hidden rounded-lg shadow-lg"} key={id}>
                  <Link href={`/posts/${id}`}>
                    <div>
                    <Image className={"block  bg-cover bg-center hover:opacity-50 transition-transform duration-500 ease-in-out"}
                      src={image}
                      width={'500'}
                      height={'400'}
                      // layout={'responsive'}
                    />

                  
                  <div className={"flex items-center justify-between leading-tight p-2 md:p-4"}>
                    <p>{title}</p>
                    <br />
                    <small className={"text-grey-darker text-sm"}>
                      <Date dateString={date} />
                    </small>
                  </div>

                  </div>
                  </Link>
                </div>
              </div>
            ))}

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

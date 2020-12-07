import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import * as utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Date from '../components/date'
import  Image from 'next/image'

import { getSortedPostsData } from '../lib/posts'

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
        (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`{utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <div className={utilStyles.container}>
         
          {allPostsData.map(({ id, title, date, image}) => (
            <div className={utilStyles.item} key={id}>
              <Image className={utilStyles.image}
                src={image}
                width={450}
                height={300}
              />
              <div className={utilStyles.title}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
              </div>
            </div>
          ))}
      </div>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

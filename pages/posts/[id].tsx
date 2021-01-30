import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import markdownStyles from "../../styles/markdown-styles.module.css"

import ReactMarkdown from 'react-markdown';
import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";


const renderers = {
  image: image => {
    return <Image src={image.src} alt={image.alt} width="600" height="450" />
  },
  code: ({ language, value }) => {
    return <SyntaxHighlighter language={language} children={value} />
  }
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article className={'bg-gray-50 mx-4 px-4 my-14 py-4'}>
        <h1 className={"text.2xl font-extrabold"}>{postData.title}</h1>
        <div className={"text-gray-900"}>
          <Date dateString={postData.date} />
        </div>
        {/* <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} /> */}
        <ReactMarkdown
          className={markdownStyles["markdown"]}
          children={postData.content}
          allowDangerousHtml={true}
          renderers={renderers}
        />
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}


export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  const postData = await getPostData(params.id)

  return {
    props: {
      postData
    }
  }
}

// //getStaticPropsで外部APIを叩くことができる
// export async function getStaticProps(context) {
//   const res = await fetch(`https://.../data`)
//   const data = await res.json()

//   if (!data) {
//     return {
//       notFound: true,
//     }
//   }

//   return {
//     props: {}, // will be passed to the page component as props
//   }
// }
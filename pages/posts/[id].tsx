import { FC } from 'react'
import Head from 'next/head'

import ReactMarkdown from 'react-markdown';
import Image from "next/image";
import { GetStaticPaths, InferGetStaticPropsType, GetStaticPropsContext } from 'next'
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import markdownStyles from "../../styles/markdown-styles.module.css"
import DateComponent from '../../components/date'
import { getAllPostIds, getPostDataById } from '../../lib/posts'
import Layout from '../../components/layout'


const renderers = {
  image: (image: { src: string; alt: string | undefined; }) => <Image src={image.src} alt={image.alt} width="600" height="450" />,
  code: ({ language, value }) => <SyntaxHighlighter language={language} children={value} />
}

// getStaticPropsはサーバサイドで実行される
// 静的なファイルを事前にビルドする

// ルーティング情報が入ったparamsを受け取る
// InferGetStaticPropsType<typeof getStaticProps>で、
// getStaticProps()の返り値をもとにPageに渡される型を類推してくれる。
type Props = InferGetStaticPropsType<typeof getStaticProps>

type Date = `${number}-${number}-${number}`

type PostData = {
  id: string,
  title: string,
  date: Date,
  image: string,
  content: string
};

// GetStaticPropsContext でpostDataの型推論
export const getStaticProps = async ({ params }: GetStaticPropsContext): Promise<{ props: { postData: PostData; }; }> => {
  // Fetch necessary data for the blog post using params.id
  // params.id はファイル名の[id].tsx に対応する
  const postData = await getPostDataById(params?.id as string)
  

  return Promise.resolve({
    props: {
      // ページコンポーネントにpropsとして渡される
      postData
    }
  });
};

// サーバー側でビルド時のみ実行
// getStaticPathsはgetStaticPropsと一緒に使う必要がある
export const getStaticPaths: GetStaticPaths = async () => {
  // Return a list of possible value for id
  const paths = await getAllPostIds()

  return {
    paths,
    fallback: false
  }
}

const Post: FC<Props> = ({ postData }) => (
  <Layout>
    <Head>
      <title>{postData.title}</title>
    </Head>
    <article className="bg-yellow-100 mx-2 md:mx-4 p-4 md:p-10 ">
      <h2>{postData.title}</h2>
      <div className="text-gray-900 flex flex-row-reverse px-4 border-solid border-0 border-b-2 border-red-600 ">
        <DateComponent dateString={postData.date} />
      </div>
      <ReactMarkdown
        className={markdownStyles.markdown}
        // eslint-disable-next-line react/no-children-prop
        children={postData.content}
        allowDangerousHtml
        renderers={renderers}
      />
    </article>
  </Layout>
)

export default Post;

// //getStaticPropsで外部APIを叩くことができる
// const getStaticProps = (context) => {
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
import React, { FC } from 'react';
import Head from 'next/head';
import ReactMarkdown from 'react-markdown';
import { GetStaticPaths, GetStaticPropsContext, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import markdownStyles from '../../styles/markdown-styles.module.css';
import DateComponent from '../../components/Molecules/DateBox';
import { getAllPostIds, getPostDataById } from '../../lib/posts';
import Layout from '../../components/pages/layout';
import CodeBlock from '../../components/Molecules/CodeBlock';
import rehypeRaw from 'rehype-raw';

const ImageInMarkDown = ({ src, alt }: { src: string; alt: string }) => (
  <Image src={src} alt={alt} width='600' height='450' />
);

// getStaticPropsはサーバサイドで実行される
// 静的なファイルを事前にビルドする

type Date = `${number}-${number}-${number}`;

type PostData = {
  id: string;
  title: string;
  date: Date;
  image: string;
  metaDescription: string;
  tags: Array<string>;
  content: string;
};

type SSGProps = {
  postData: PostData;
};

// GetStaticPropsContext でpostDataの型推論
export const getStaticProps: GetStaticProps<SSGProps> = async ({
  params,
}: GetStaticPropsContext) => {
  // Fetch necessary data for the blog post using params.id
  // params.id はファイル名の[id].tsx に対応する
  const postData = await getPostDataById(params?.id as string);

  return {
    props: {
      // ページコンポーネントにpropsとして渡される
      postData,
    },
  };
};

// サーバー側でビルド時のみ実行
// getStaticPathsはgetStaticPropsと一緒に使う必要がある
export const getStaticPaths: GetStaticPaths = async () => {
  // Return a list of possible value for id
  const paths = await getAllPostIds();

  return {
    paths,
    fallback: false,
  };
};

const Post: NextPage<SSGProps> = ({ postData }) => (
  <Layout pagetitle={postData.title} metaDescription={postData.metaDescription}>
    <Head>
      <title>{postData.title}</title>
    </Head>
    <article className='bg-white 2xl:w-7/12 lg:w-9/12 mx-auto m-10 p-4 md:p-10'>
      <div className='mb-10 px-4 text-xl leading-normal border-solid border-0 border-l-8 border-blue-600'>
        <h2 className='mb-14'>{postData.title}</h2>
        <div className='flex flex-row-reverse px-2  '>
          <DateComponent dateString={postData.date} />
        </div>
        <div className='flex -mt-10 text-lg'>
          タグ：
          {postData.tags.map((tag) => (
            <div
              key={tag}
              className='px-2 mx-2 bg-white border-solid border-1 border-blue-600 rounded-2xl'
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        className={markdownStyles.markdown}
        children={postData.content}
        components={{
          code: CodeBlock,
          img: ImageInMarkDown as any,
        }}
      />
    </article>
  </Layout>
);

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

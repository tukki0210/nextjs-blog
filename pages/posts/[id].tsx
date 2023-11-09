import React from 'react';
import { GetStaticPaths, GetStaticPropsContext, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { getAllPostIds, getPostDataById } from '../../lib/posts';
import Layout from '../../components/pages/layout';
import PostContent from '../../components/templates/PostContent';


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

  try {
    const postData = await getPostDataById(params?.id as string);

    return { props: { postData } }
  } catch (error) {
    return { notFound: true };
  };
}

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
    <PostContent postData={postData} />
  </Layout>
);

export default Post;


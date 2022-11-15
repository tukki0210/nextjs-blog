import { FC } from 'react';
import { InferGetStaticPropsType } from 'next';
import Layout from '../components/pages/layout';
import { getAllPostsData } from '../lib/posts';
import PostCard from '../components/Organisms/PostCard';
import SideBar from '../components/templates/SideBar';

// getStaticPropsは事前にビルド時にサーバサイドで実行される
// 静的なファイル（allPostsData）を生成する

type Props = InferGetStaticPropsType<typeof getStaticProps>;

type Date = `${number}-${number}-${number}`;

type PostData = {
  id: string;
  title: string;
  date: Date;
  image: string;
  metaDescription: string;
  tags: Array<string>;
  content?: string;
};

export const getStaticProps = async (): Promise<{ props: { allPostsData: PostData[] } }> => {
  const allPostsData = await getAllPostsData();

  return {
    props: {
      // ページコンポーネントにpropsとして渡される
      allPostsData,
    },
  };
};

// allPostsDataはビルド時にgetStaticProps()によって生成される。
const Home: FC<Props> = ({ allPostsData }) => (
  <Layout pagetitle='' metaDescription='理系公務員のプログラミング日記'>
    <div className='xl:container mx-2 my-4 md:my-10  xl:flex xl:justify-between'>
      <main className='flex flex-wrap xl:w-10/12 mx-4'>
        {allPostsData.map(({ id, title, date, image }) => (
          <PostCard id={id} title={title} date={date} image={image} />
        ))}
      </main>
      <aside className='w-full md:w-1/2 xl:w-2/12 mx-2 xl:mx-auto'>
        <SideBar />
      </aside>
    </div>
  </Layout>
);

export default Home;

import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Layout from '../components/pages/layout';
import { getAllPostsData } from '../lib/posts';
import PostCard from '../components/Organisms/PostCard';
import SideBar from '../components/templates/SideBar';
import Pagenation from '../components/Organisms/Pagenation';

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
type SSGProps = {
  allPostsData: PostData[];
};

export const getStaticProps: GetStaticProps<SSGProps> = async (context) => {
  const offset = 0;
  const limit = 24;
  const allPostsData = await getAllPostsData(offset, limit);
  return {
    props: {
      allPostsData,
    },
  };
};

const Home: NextPage<SSGProps> = ({ allPostsData }) => (
  <Layout pagetitle='' metaDescription='トップページ'>
    <div className='xl:container mx-2 my-4 md:my-10  xl:flex xl:justify-between'>
      <main className='flex flex-wrap xl:w-10/12 mx-4'>
        {allPostsData.map(({ id, title, date, image }) => (
          <PostCard key={id} id={id} title={title} date={date} image={image} />
        ))}
      </main>
      <aside className='w-full md:w-1/2 xl:w-2/12 mx-2 xl:mx-auto'>
        <SideBar />
      </aside>
    </div>
    <Pagenation currentPageNumber={1} maxPageNumber={3} />
  </Layout>
);

export default Home;

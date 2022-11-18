import { NextPage } from 'next';
import Layout from './layout';
import PostCard from '../Organisms/PostCard';
import SideBar from '../templates/SideBar';
import Pagenation from '../Organisms/Pagenation';

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
  pageNumber: number;
};

const TopPage: NextPage<SSGProps> = ({ allPostsData, pageNumber }) => (
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
    <Pagenation currentPageNumber={pageNumber} maxPageNumber={3} />
  </Layout>
);

export default TopPage;

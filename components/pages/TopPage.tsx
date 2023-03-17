import { NextPage } from 'next';
import Layout from './layout';
import PostCard from '../Organisms/PostCard';
import SideBar from '../templates/SideBar';
import Pagination from '../Organisms/Pagination';

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
  <Layout pagetitle='理系公務員のプログラミング日記' metaDescription='トップページ'>
    <div className='container flex flex-col 2xl:flex-row justify-center mx-auto'>
      <main className=''>
        <ul className='flex flex-row flex-wrap justify-center 2xl:justify-end'>
          {allPostsData.map(({ id, title, date, image }) => (
            <PostCard key={id} id={id} title={title} date={date} image={image} />
          ))}
        </ul>
        <Pagination currentPageNumber={pageNumber} maxPageNumber={5} />
      </main>
      <aside className='mx-16 2xl:mt-6 2xl:mx-2'>
        <SideBar />
      </aside>
    </div>

  </Layout>
);

export default TopPage;

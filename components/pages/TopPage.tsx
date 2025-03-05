import { NextPage } from 'next';
import Layout from './layout';
import PostCard from '../Organisms/PostCard';
import SideBar from '../templates/SideBar';
import Pagination from '../Organisms/Pagination';
import { PostListItem, PaginationProps } from '../../types/blog';

type TopPageProps = {
  allPostsData: PostListItem[];
  pageNumber: number;
  maxPageNumber: number;
};

const TopPage: NextPage<TopPageProps> = ({ allPostsData, pageNumber, maxPageNumber }) => (
  <Layout pagetitle='理系公務員のプログラミング日記' metaDescription='トップページ'>
    <div className='container flex flex-col 2xl:flex-row justify-center mx-auto'>
      <main className=''>
        <ul className='flex flex-row flex-wrap justify-center 2xl:justify-end'>
          {allPostsData.map(({ id, title, date, image }) => (
            <PostCard key={id} id={id} title={title} date={date} image={image} />
          ))}
        </ul>
        <Pagination currentPageNumber={pageNumber} maxPageNumber={maxPageNumber} />
      </main>
      <aside className='mx-16 2xl:mt-6 2xl:mx-2'>
        <SideBar />
      </aside>
    </div>

  </Layout>
);

export default TopPage;

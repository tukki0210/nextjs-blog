import { GetStaticProps, NextPage } from 'next';
import { getAllPostsData } from '../lib/posts';
import TopPage from '../components/pages/TopPage';

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

export const getStaticProps: GetStaticProps<SSGProps> = async () => {
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
  <TopPage allPostsData={allPostsData} pageNumber={1} />
);

export default Home;

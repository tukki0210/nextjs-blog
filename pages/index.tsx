import { GetStaticProps, NextPage } from 'next';
import { getSlicedPostsData } from '../lib/posts';
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
  TopPageData: PostData[];
};

export const getStaticProps: GetStaticProps<SSGProps> = async () => {
  const offset = 0;
  const limit = 24;
  const TopPageData = await getSlicedPostsData(offset, limit);
  return {
    props: {
      TopPageData,
    },
  };
};

const Home: NextPage<SSGProps> = ({ TopPageData }) => (
  <TopPage allPostsData={TopPageData} pageNumber={1} />
);

export default Home;

import { GetStaticPaths,NextPage, GetStaticProps } from 'next';
import { getAllPostsData, getSlicedPostsData } from '../../lib/posts';
import TopPage from '../../components/pages/TopPage';

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


const POSTS_PER_PAGE = 24;

export const getStaticPaths: GetStaticPaths = async () => {

  const totalPosts = await getAllPostsData();
  const totalPages = Math.ceil(totalPosts.length / POSTS_PER_PAGE);

  const paths = Array.from({ length: totalPages }, (_, index) =>
    ({ params: { id: String(index + 1) } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<SSGProps> = async (context) => {
  const pageNumber = Number(context.params?.id) || 1;

  const offset = (pageNumber - 1) * POSTS_PER_PAGE;
  const limit = POSTS_PER_PAGE;
  const allPostsData = await getSlicedPostsData(offset, limit);

  return {
    props: {
      allPostsData,
      pageNumber,
    },
  };
};

const pageNumber: NextPage<SSGProps> = ({ allPostsData, pageNumber }) => (
  <TopPage allPostsData={allPostsData} pageNumber={pageNumber} />
);

export default pageNumber;

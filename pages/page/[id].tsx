import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { getAllPostsData } from '../../lib/posts';
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

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [...Array(4)]
    .map((_, i) => i + 1)
    .map((index) => ({ params: { id: String(index) } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<SSGProps> = async (context) => {
  const pageNumber = Number(
    // context.params.idはstring[]|stringなので場合分け
    Array.isArray(context.params?.id) ? context.params?.id[0] : context.params?.id,
  );

  const POSTS_PER_PAGE = 24;
  const offset = 0 + (pageNumber - 1) * POSTS_PER_PAGE;
  const limit = offset + POSTS_PER_PAGE;
  const allPostsData = await getAllPostsData(offset, limit);
  return {
    props: {
      allPostsData,
      pageNumber,
    },
  };
};

// allPostsDataはビルド時にgetStaticProps()によって生成される。
const pageNumber: NextPage<SSGProps> = ({ allPostsData, pageNumber }) => (
  <TopPage allPostsData={allPostsData} pageNumber={pageNumber} />
);

export default pageNumber;

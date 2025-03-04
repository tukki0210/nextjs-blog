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

export default async function Page() {
  const offset = 0;
  const limit = 24;
  const TopPageData: PostData[] = await getSlicedPostsData(offset, limit);

  return <TopPage allPostsData={TopPageData} pageNumber={1} />;
}

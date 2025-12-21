import { getSlicedPostsData, getPaginationInfo } from '../lib/posts';
import { POSTS_PER_PAGE } from '../lib/constants';
import TopPage from '../components/pages/TopPage';

export default async function Page() {
  const pageNumber = 1;
  const offset = 0;

  const { maxPageNumber } = await getPaginationInfo(POSTS_PER_PAGE);
  const postsData = await getSlicedPostsData(offset, POSTS_PER_PAGE);

  return (
    <TopPage
      allPostsData={postsData}
      pageNumber={pageNumber}
      maxPageNumber={maxPageNumber}
    />
  );
}

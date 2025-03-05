import { getPostsCount, getSlicedPostsData } from '../lib/posts';
import TopPage from '../components/pages/TopPage';
import { PostListItem } from '../types/blog';

export default async function Page() {
  const offset = 0;
  const limit = 24;
  const postsData = await getSlicedPostsData(offset, limit);
  const totalPosts = await getPostsCount();
  const maxPageNumber = Math.ceil(totalPosts / limit);

  // 型を明示的に変換（contentが必須ではないPostListItemとして扱う）
  const topPageData: PostListItem[] = postsData;

  return <TopPage allPostsData={topPageData} pageNumber={1} maxPageNumber={maxPageNumber} />;
}

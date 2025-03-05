import { getPostsCount, getSlicedPostsData } from '../lib/posts';
import TopPage from '../components/pages/TopPage';
import { PostListItem } from '../types/blog';

export default async function Page() {
  // 定数
  const pageNumber = 1;
  const limit = 24;
  const offset = 0;
  
  // 総投稿数を取得
  const totalPosts = await getPostsCount();
  const maxPageNumber = Math.ceil(totalPosts / limit);
  
  // 指定範囲の投稿データを取得
  const postsData = await getSlicedPostsData(offset, limit);
  
  // 型を明示的に変換（contentが必須ではないPostListItemとして扱う）
  const topPageData: PostListItem[] = postsData;

  return <TopPage allPostsData={topPageData} pageNumber={pageNumber} maxPageNumber={maxPageNumber} />;
}

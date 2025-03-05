import { getPostsCount, getSlicedPostsData } from '../../../lib/posts';
import TopPage from '../../../components/pages/TopPage';
import { PostListItem } from '../../../types/blog';
import { notFound } from 'next/navigation';

type PageParams = {
  params: {
    number: string;
  };
};

export async function generateStaticParams() {
  const totalPosts = await getPostsCount();
  const limit = 24;
  const maxPageNumber = Math.ceil(totalPosts / limit);
  
  // ページ番号の配列を生成（1から最大ページ数まで）
  return Array.from({ length: maxPageNumber }, (_, i) => ({
    number: String(i + 1),
  }));
}

export default async function Page({ params }: PageParams) {
  const pageNumber = parseInt(params.number, 10);
  
  // 総投稿数を取得
  const totalPosts = await getPostsCount();
  const limit = 24;
  const maxPageNumber = Math.ceil(totalPosts / limit);
  
  // ページ番号が無効な場合は404
  if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > maxPageNumber) {
    notFound();
  }
  
  // オフセットを計算（0ベース）
  const offset = (pageNumber - 1) * limit;
  
  // 指定範囲の投稿データを取得
  const postsData = await getSlicedPostsData(offset, limit);
  
  // 型を明示的に変換（contentが必須ではないPostListItemとして扱う）
  const topPageData: PostListItem[] = postsData;
  
  return <TopPage allPostsData={topPageData} pageNumber={pageNumber} maxPageNumber={maxPageNumber} />;
}

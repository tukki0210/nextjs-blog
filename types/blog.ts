/**
 * ブログ関連の型定義
 */

// 日付の型定義
export type PostDate = `${number}-${number}-${number}`;

// 投稿データの型定義
export type PostData = {
  id: string;
  title: string;
  date: PostDate;
  image: string;
  metaDescription: string;
  tags: string[];
  content: string;
};

// 投稿リスト用のデータ型（contentなし）
export type PostListItem = Omit<PostData, 'content'> & {
  content?: string;
};

// ページネーションのプロパティ型
export type PaginationProps = {
  currentPageNumber: number;
  maxPageNumber: number;
};

// 投稿ページのパラメータ型
export type PostParams = {
  params: { 
    id: string 
  };
};

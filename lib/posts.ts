import fs from 'fs';
import path from 'path';
import matter, { GrayMatterFile, Input } from 'gray-matter';
import { PostData, PostDate, PostListItem } from '../types/blog';

const postsDirectory = path.join(process.cwd(), 'posts');

// キャッシュ
let cachedPosts: PostData[] | null = null;

/**
 * キャッシュをクリアする（開発時のホットリロード用）
 */
export const clearPostsCache = (): void => {
  cachedPosts = null;
};

/**
 * .mdファイルのみを取得する
 */
export const getMarkdownFiles = (): string[] => {
  return fs.readdirSync(postsDirectory).filter(fileName => fileName.endsWith('.md'));
};

/**
 * マークダウンファイルの内容を解析する
 * @param id ファイルID（拡張子なし）
 */
const getMatterFileContents = (id: string): GrayMatterFile<Input> => {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  return matter(fileContents);
};

/**
 * ファイル名から投稿データを取得する
 * @param fileName ファイル名
 */
const getPostDataByFileName = (fileName: string): PostData => {
  const id = fileName.replace(/\.md$/, '');
  const matterResult = getMatterFileContents(id);

  const { data, content } = matterResult;
  const { title, date, image, metaDescription, tags } = data as {
    title: string;
    date: PostDate;
    image: string;
    metaDescription: string;
    tags: string[];
  };

  return {
    id,
    title,
    date,
    image,
    metaDescription,
    tags,
    content,
  };
};

/**
 * IDから投稿データを取得する
 * @param id 投稿ID
 */
export const getPostDataById = async (id: string): Promise<PostData> => {
  return getPostDataByFileName(`${id}.md`);
};

/**
 * すべての投稿データを取得する（キャッシュ付き）
 */
export const getAllPostsData = async (): Promise<PostData[]> => {
  if (cachedPosts) {
    return cachedPosts;
  }

  const fileNames = getMarkdownFiles();
  const allPostsData = fileNames.map(fileName => getPostDataByFileName(fileName));

  // 日付順にソート（新しい順）
  cachedPosts = allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
  return cachedPosts;
};

/**
 * 指定範囲の投稿データを取得する（リスト用、contentなし）
 * @param offset 開始位置
 * @param limit 取得件数
 */
export const getSlicedPostsData = async (offset: number, limit: number): Promise<PostListItem[]> => {
  const allPostsData = await getAllPostsData();
  return allPostsData.slice(offset, offset + limit).map(({ content: _, ...rest }) => rest);
};

/**
 * すべての投稿IDを取得する
 */
export const getAllPostIds = async (): Promise<{ id: string }[]> => {
  const fileNames = getMarkdownFiles();
  return fileNames.map(fileName => ({
    id: fileName.replace(/\.md$/, '')
  }));
};

/**
 * 投稿の総数を取得する
 */
export const getPostsCount = async (): Promise<number> => {
  const fileNames = getMarkdownFiles();
  return fileNames.length;
};

/**
 * ページネーション情報を取得する
 * @param limit 1ページあたりの件数
 */
export const getPaginationInfo = async (limit: number): Promise<{
  totalPosts: number;
  maxPageNumber: number;
}> => {
  const totalPosts = await getPostsCount();
  return {
    totalPosts,
    maxPageNumber: Math.ceil(totalPosts / limit),
  };
};

/**
 * 前後の記事を取得する
 * @param currentId 現在の記事ID
 */
export const getAdjacentPosts = async (currentId: string): Promise<{
  prev: { id: string; title: string } | null;
  next: { id: string; title: string } | null;
}> => {
  const allPosts = await getAllPostsData();
  const currentIndex = allPosts.findIndex(post => post.id === currentId);

  // 記事が見つからない場合
  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  // 前の記事（新しい記事）
  const prev = currentIndex > 0
    ? { id: allPosts[currentIndex - 1].id, title: allPosts[currentIndex - 1].title }
    : null;

  // 次の記事（古い記事）
  const next = currentIndex < allPosts.length - 1
    ? { id: allPosts[currentIndex + 1].id, title: allPosts[currentIndex + 1].title }
    : null;

  return { prev, next };
};

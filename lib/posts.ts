import fs from 'fs';
import path from 'path';
import matter, { GrayMatterFile, Input } from 'gray-matter';
import { PostData, PostDate } from '../types/blog';

const postsDirectory = path.join(process.cwd(), 'posts');

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
 * すべての投稿データを取得する
 */
export const getAllPostsData = async (): Promise<PostData[]> => {
  const fileNames = getMarkdownFiles();
  const allPostsData = fileNames.map(fileName => getPostDataByFileName(fileName));
  
  // 日付順にソート（新しい順）
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
};

/**
 * 指定範囲の投稿データを取得する
 * @param offset 開始位置
 * @param limit 取得件数
 */
export const getSlicedPostsData = async (offset: number, limit: number): Promise<PostData[]> => {
  const allPostsData = await getAllPostsData();
  return allPostsData.slice(offset, offset + limit);
};

/**
 * すべての投稿IDを取得する
 */
export const getAllPostIds = async (): Promise<{ params: { id: string } }[]> => {
  const fileNames = getMarkdownFiles();
  return fileNames.map(fileName => ({
    params: {
      id: fileName.replace(/\.md$/, '')
    }
  }));
};

/**
 * 投稿の総数を取得する
 */
export const getPostsCount = async (): Promise<number> => {
  const fileNames = getMarkdownFiles();
  return fileNames.length;
};

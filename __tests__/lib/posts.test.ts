import * as postsModule from '../../lib/posts';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { PostDate } from '../../types/blog';

// モックの設定
jest.mock('fs');
jest.mock('path');
jest.mock('gray-matter');

// getMarkdownFilesをモック
const getMarkdownFilesMock = jest.fn();
const originalGetMarkdownFiles = jest.requireActual('../../lib/posts').getMarkdownFiles;
Object.defineProperty(postsModule, 'getMarkdownFiles', {
  value: getMarkdownFilesMock
});

// 実際の関数をインポート
const { getAllPostsData, getPostDataById, getSlicedPostsData, getAllPostIds, getPostsCount } = postsModule;

describe('posts.ts', () => {
  // テスト用のモックデータ
  const mockPostsDirectory = '/mock/posts';
  const mockFileNames = ['test1.md', 'test2.md', 'test3.md'];
  const mockPostData = {
    id: 'test1',
    title: 'Test Post 1',
    date: '2023-01-01' as PostDate,
    image: '/images/test.jpg',
    metaDescription: 'Test description',
    tags: ['test', 'mock'],
    content: '# Test Content'
  };

  beforeEach(() => {
    // モックのリセット
    jest.clearAllMocks();
    
    // getMarkdownFilesのモック
    getMarkdownFilesMock.mockReturnValue(mockFileNames);
    
    // path.joinのモック
    (path.join as jest.Mock).mockImplementation((dir: string, subdir: string) => {
      if (subdir === 'posts') return mockPostsDirectory;
      return `${mockPostsDirectory}/${subdir}`;
    });
    
    // fs.readdirSyncのモック
    (fs.readdirSync as jest.Mock).mockImplementation((dir: string) => {
      if (dir === mockPostsDirectory) return mockFileNames;
      return [];
    });
    
    // fs.readFileSyncのモック
    (fs.readFileSync as jest.Mock).mockReturnValue('mock file content');
    
    // matter関数のモック
    (matter as unknown as jest.Mock).mockReturnValue({
      data: {
        title: mockPostData.title,
        date: mockPostData.date,
        image: mockPostData.image,
        metaDescription: mockPostData.metaDescription,
        tags: mockPostData.tags,
      },
      content: mockPostData.content
    });
  });

  describe('getPostDataById', () => {
    it('指定されたIDの投稿データを返す', async () => {
      const result = await getPostDataById('test1');
      
      expect(fs.readFileSync).toHaveBeenCalledWith(
        `${mockPostsDirectory}/test1.md`,
        'utf8'
      );
      expect(result).toEqual({
        id: 'test1',
        title: mockPostData.title,
        date: mockPostData.date,
        image: mockPostData.image,
        metaDescription: mockPostData.metaDescription,
        tags: mockPostData.tags,
        content: mockPostData.content
      });
    });
  });

  describe('getAllPostsData', () => {
    it('すべての投稿データを日付順に返す', async () => {
      // 複数の投稿データを返すようにモックを設定
      (matter as unknown as jest.Mock)
        .mockReturnValueOnce({
          data: {
            title: 'Test Post 1',
            date: '2023-01-01' as PostDate,
            image: '/images/test1.jpg',
            metaDescription: 'Test description 1',
            tags: ['test1'],
          },
          content: '# Test Content 1'
        })
        .mockReturnValueOnce({
          data: {
            title: 'Test Post 2',
            date: '2023-02-01' as PostDate,
            image: '/images/test2.jpg',
            metaDescription: 'Test description 2',
            tags: ['test2'],
          },
          content: '# Test Content 2'
        })
        .mockReturnValueOnce({
          data: {
            title: 'Test Post 3',
            date: '2023-03-01' as PostDate,
            image: '/images/test3.jpg',
            metaDescription: 'Test description 3',
            tags: ['test3'],
          },
          content: '# Test Content 3'
        });

      const result = await getAllPostsData();
      
      expect(getMarkdownFilesMock).toHaveBeenCalled();
      expect(result.length).toBe(3);
      // 日付の降順でソートされていることを確認
      expect(result[0].date).toBe('2023-03-01');
      expect(result[1].date).toBe('2023-02-01');
      expect(result[2].date).toBe('2023-01-01');
    });
  });

  describe('getSlicedPostsData', () => {
    it('指定された範囲の投稿データを返す', async () => {
      // getAllPostsDataの結果をモック
      const mockAllPosts = [
        { id: 'post1', date: '2023-03-01' as PostDate },
        { id: 'post2', date: '2023-02-01' as PostDate },
        { id: 'post3', date: '2023-01-01' as PostDate }
      ] as any[];
      
      // getAllPostsDataをモック
      jest.spyOn(require('../../lib/posts'), 'getAllPostsData').mockResolvedValue(mockAllPosts);
      
      const result = await getSlicedPostsData(1, 2);
      
      expect(result.length).toBe(2);
      expect(result[0]).toBe(mockAllPosts[1]);
      expect(result[1]).toBe(mockAllPosts[2]);
    });
  });

  describe('getAllPostIds', () => {
    it('すべての投稿IDを返す', async () => {
      const result = await getAllPostIds();
      
      expect(getMarkdownFilesMock).toHaveBeenCalled();
      expect(result).toEqual([
        { params: { id: 'test1' } },
        { params: { id: 'test2' } },
        { params: { id: 'test3' } }
      ]);
    });
  });

  describe('getPostsCount', () => {
    it('投稿の総数を返す', async () => {
      const result = await getPostsCount();
      
      expect(getMarkdownFilesMock).toHaveBeenCalled();
      expect(result).toBe(3);
    });
  });
});

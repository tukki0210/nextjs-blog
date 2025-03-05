import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostCard from '../../../components/Organisms/PostCard';
import { PostDate } from '../../../types/blog';

// モックの設定
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    return <img {...props} />;
  },
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  },
}));

// DateBoxコンポーネントのモック
jest.mock('../../../components/Molecules/DateBox', () => {
  return {
    __esModule: true,
    default: ({ dateString }: { dateString: PostDate }) => {
      return <span data-testid="date-box">{dateString}</span>;
    },
  };
});

describe('PostCard', () => {
  const mockProps = {
    id: 'test-post',
    title: 'テスト投稿',
    date: '2023-01-01' as PostDate,
    image: '/images/test.jpg',
  };

  it('正しくレンダリングされる', () => {
    const { getByText, getByRole } = render(<PostCard {...mockProps} />);
    
    // タイトルが表示されていることを確認
    expect(getByText(mockProps.title)).toBeInTheDocument();
    
    // 画像が正しい属性で表示されていることを確認
    const image = getByRole('img');
    expect(image).toHaveAttribute('src', mockProps.image);
    expect(image).toHaveAttribute('alt', mockProps.title);
    
    // リンクが正しいURLを持っていることを確認
    const link = getByRole('link');
    expect(link).toHaveAttribute('href', `/posts/${mockProps.id}`);
  });
});

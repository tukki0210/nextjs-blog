import { getSlicedPostsData, getPaginationInfo } from '../../../lib/posts';
import { POSTS_PER_PAGE } from '../../../lib/constants';
import { PageNumberParams } from '../../../types/blog';
import TopPage from '../../../components/pages/TopPage';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const { maxPageNumber } = await getPaginationInfo(POSTS_PER_PAGE);

  return Array.from({ length: maxPageNumber }, (_, i) => ({
    number: String(i + 1),
  }));
}

export default async function Page({ params }: PageNumberParams) {
  const { number } = await params;
  const pageNumber = parseInt(number, 10);

  const { maxPageNumber } = await getPaginationInfo(POSTS_PER_PAGE);

  if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > maxPageNumber) {
    notFound();
  }

  const offset = (pageNumber - 1) * POSTS_PER_PAGE;
  const postsData = await getSlicedPostsData(offset, POSTS_PER_PAGE);

  return (
    <TopPage
      allPostsData={postsData}
      pageNumber={pageNumber}
      maxPageNumber={maxPageNumber}
    />
  );
}

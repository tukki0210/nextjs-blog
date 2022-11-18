import Link from 'next/link';
import React, { FC } from 'react';

type Props = {
  maxPageNumber: number;
  currentPageNumber: number;
};

const Pagenation: FC<Props> = ({ currentPageNumber, maxPageNumber }) => {
  const prevPage = currentPageNumber - 1;
  const nextPage = currentPageNumber + 1;

  return (
    <div className ="text-center -mt-5 mb-10">
      {currentPageNumber !== 1 && (
        <Link href={`/page/${prevPage}`}>
          <button className="inline-flex items-center px-4 py-2 text-m font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">前へ</button>
        </Link>
      )}
      {currentPageNumber !== maxPageNumber && (
        <Link href={`/page/${nextPage}`}>
          <button className="inline-flex items-center px-4 py-2 ml-3 text-m font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">次へ</button>
        </Link>
      )}
    </div>
  );
};

export default Pagenation;

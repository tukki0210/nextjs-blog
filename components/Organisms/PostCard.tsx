import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
import DateBox from '../Molecules/DateBox';

type Date = `${number}-${number}-${number}`;

type Props = {
  id: string;
  title: string;
  date: Date;
  image: string;
};

export const PostCard: FC<Props> = ({ id, title, date, image }) => {
  return (
    <div className='mx-auto w-full md:w-1/2 lg:w-1/3' key={id}>
      {/* 各記事カードのスタイル */}
      <div className='mb-4 mx-2 bg-white overflow-hidden hover:opacity-80 '>
        <Link href={`/posts/${id}`}>
          <div className='items-center '>
            <Image src={image} alt={title} width='400' height='300' />
            {/* タイトルカード */}
            <div className='items-center h-12 leading-tight px-2 text-gray-600 border-gray-200 border-0 border-solid border-t-2 -mt-3'>
              <p>{title}</p>
            </div>
            <div className='flex flex-row-reverse px-4 pb-1'>
              <DateBox dateString={date} />
            </div>
            {/* タイトルカード終わり */}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;

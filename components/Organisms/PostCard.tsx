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

const PostCard: FC<Props> = ({ id, title, date, image }) => (
  <li className='w-96 m-2' >
    {/* 各記事カードのスタイル */}
    <div className=' bg-white overflow-hidden hover:opacity-80 '>
      <Link href={`/posts/${id}`}>
        <div className='items-center'>
          <Image src={image} alt={title} width='384' height='230' />
          {/* タイトルカード */}
          <div className='items-center h-12 text-xl leading-tight px-4 text-gray-600  -mt-3'>
            <p>{title}</p>
          </div>
          <div className='flex flex-row-reverse text-lg px-4 pb-1'>
            <DateBox dateString={date} />
          </div>
          {/* タイトルカード終わり */}
        </div>
      </Link>
    </div>
  </li>
);

export default PostCard;

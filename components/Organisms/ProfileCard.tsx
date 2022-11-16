import React, { FC } from 'react';
import Image from 'next/image';

const name = 'つっきー';
const subTitle =
  '職業訓練校でプログラミング教えている公務員です。自分の勉強内容の振り返りと授業で出した課題の解説記事が中心です。このブログはTypeScript + Next.js + TailWind CSS + Vercelで構成してます。（一部未完成）';

const ProfileCard: FC = () => {
  return (
    <div className='bg-white '>
      <div className='flex justify-center'>
        <Image
          className='rounded-full mt-3'
          src='/images/components/tukki.jpg'
          alt='profileImage'
          width='120'
          height='120'
        />
      </div>

      <div className='text-center px-3 pb-6 pt-2'>
        <h2 className='text-gray-600 text-lg bold '>{name}</h2>
        <p className='text-gray-600 mt-2 font-light text-grey-dark'>{subTitle}</p>
      </div>
    </div>
  );
};

export default ProfileCard;

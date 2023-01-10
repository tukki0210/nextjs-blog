import React, { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const name = 'つっきー';
const subTitleA =
  '職業訓練校でプログラミング教えている公務員です。自分の勉強内容の振り返りと授業で出した課題の解説記事が中心です。';
const subTitleB =
  'このブログはTypeScript + Next.js + TailWind CSS + Vercelで構成してます。（まだまだ改修中）';

const ProfileCard: FC = () => {
  return (
    <div className='bg-white 2xl:w-52 flex flex-row 2xl:flex-col justify-center p-3'>
      <div className='mx-4 2xl:mx-auto'>
        <Image
          className='rounded-full mt-3'
          src='/images/components/tukki.jpg'
          alt='profileImage'
          width='120'
          height='120'
        />
        <div className="flex justify-between mt-2">
          <h3 className='text-gray-600 text-lg bold text-center'>{name}</h3>
          <Link href={'https://github.com/tukki0210'}>
            <Image
              src='/images/components/github-mark.png'
              alt='githubLink'
              width='30'
              height='30'
              className='ml-2 mt-4 hover:opacity-80'
            />
          </Link>
        </div>
      </div>

      <div className='text-gray-600 text-lg text-left p-2'>
        <p>{subTitleA}</p>
        <p>{subTitleB}</p>
      </div>
    </div>
  );
};

export default ProfileCard;

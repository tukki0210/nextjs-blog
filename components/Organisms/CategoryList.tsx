const CategoryList = () => {
  return (
    <div className='text-gray-600 bg-white mt-4 p-4 '>
      <h3 className='border-solid border-0 border-b-2 '>カテゴリー（未対応）</h3>
      <h4>プログラミングの話</h4>
      <ul>
        <li>
          <a href='/'>Java</a>
        </li>
        <li>
          <a href='/'>JavaScript</a>
        </li>
        <li>
          <a href='/'>React</a>
        </li>
        <li>
          <a href='/'>Next.js</a>
        </li>
      </ul>
      <h4>読書記録</h4>
      <ul>
        <li>
          <a href='/'>ビジネス書</a>
        </li>
      </ul>
    </div>
  );
};

export default CategoryList;

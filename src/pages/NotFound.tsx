import { Link } from 'react-router';

const NotFoundPage = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <p className="text-2xl font-bold">페이지를 찾을 수 없습니다.</p>
      <p className="text-neutral-500">주소가 올바른지 확인해주세요.</p>
      <Link to="/" className="border-2 border-black px-4 py-2 hover:bg-neutral-300">
        홈으로
      </Link>
    </div>
  );
};

export default NotFoundPage;

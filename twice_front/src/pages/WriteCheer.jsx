import Category from '../components/Category';

const WriteCheer = () => {
  const Categories = [
    { id: 1, detail: '내 편 좀 들어줘', tag:"다정한" },
    { id: 2, detail: '위로가 필요해', tag:"따뜻한" },
    { id: 3, detail: '잘하고 있다는 말이 듣고 싶어', tag:"든든한" },
  ];
  return (
    <div>
      <div>닉네임 님의 <span>사연</span>을 들려주세요</div>
      <div>어떤 응원을 위한 사연인가요?</div>
      {Categories.map((category) =>{
        <Category props = {category} />
      })}
    </div>
  );
}

export default WriteCheer;
import React, { useEffect } from 'react';

import { useState } from 'react';
import Button from "../components/Button";
import Category from "../components/Category";
import Footer from "../components/Footer";
import styled from "styled-components";
import { postStory } from '../api/storyApi';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../api/userApi';

const TextArea = styled.textarea`
  &::placeholder {
    color: rgba(206, 206, 206, 1);
    font-weight: 500;
    font-family: "Pretendard";
    translateY: 2px;
    translateX: 10px;
  translate: 5px -5px;
  }
  display: flex;
  align-items: center;
  width: 100%;
  height: 38px;
  border: 1.7px solid rgba(152, 108, 233, 1);
  border-radius: 18px;
  padding: 11px;
  box-shadow: 0px 4px 4px rgba(81, 80, 80, 0.25);
`;

const WriteCheer = () => {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [username, setUsername] = useState(''); // 사용자 이름 상태 추가
  const navigate = useNavigate(); 

  // Fetch username on mount
  useEffect(() => {
    async function fetchUsername() {
      try {
        const response = await getUserInfo();
        setUsername(response.data.username); // <-- fix here
      } catch (error) {
        setUsername('');
        console.error('사용자 정보를 불러오는 중 오류 발생:', error);
      }
    }
    fetchUsername();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (!content.trim()) {
      alert('내용을 입력해주세요!');
      return;
    }

    setIsLoading(true);
    
    try {
          const result = await postStory( {
          content: content,
          categoryId: selectedId
        })
        if(result || result.success) {
        setIsEnrolled(true); 
        console.log('응답 데이터:', result);
        setTimeout(() => setIsEnrolled(false), 2000); 
        setContent('');
        setSelectedId(null);}
    } catch (error) {
      console.error('Error는', error);
      alert('오류가 발생했습니다: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const Categories = [
    { id: 1, detail: "내 편 좀 들어줘", tag: "다정한", onclick: () => {} },
    { id: 2, detail: "위로가 필요해", tag: "따뜻한", onclick: () => {} },
    {
      id: 3,
      detail: "잘하고 있다는 말이 듣고 싶어",
      tag: "든든한",
      onclick: () => {},
    },
  ];

  const handleClick = (id) => {
  if (selectedId === id) {
    setSelectedId(null); // 이미 선택된 거면 해제
  } else {
    setSelectedId(id); // 선택
  }
};
  return (
    <div style={{ width: "100%", height: "100vh", background:"linear-gradient(180deg, #FFFFFF 0%, #F1E9FF 100%)" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "40px 30px",
        }}
      >
        <div style={{ fontSize: "24px", fontWeight: "600" }}>
          {(username ? username : "...") + ' 님의 '}<span style={{ color: "rgba(152, 108, 233, 1)" }}>사연</span>을 <br />
          들려주세요
        </div>
        <div style={{ height: "30px" }} />
        <form
          style={ !selectedId ? {display: "none"} : {
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            marginBottom: "30px",
          }}
          onSubmit={handleSubmit}
        >
          <label style={{ marginBottom: "10px", fontWeight: "500" }}>
            당신의 사연은 무엇인가요?
          </label>
          <TextArea value={content} onChange={(e) => setContent(e.target.value)} disabled={isLoading} placeholder="나의 사연 남기기" />
          <Button
            type="submit"
            style={{
              position: "fixed",
              bottom: "220px",
              right: "120px",
              width: "95px",
              height: "35px",
              borderRadius: "25px",
              backgroundColor: "rgba(152, 108, 233, 1)",
              border: "0",
              color: "white",
              gap:"5px",
              padding: "10px 15px",
            }}
            
            onClick={() => navigate('/myCheer')}
          >
            {isEnrolled && <div>✓</div>}
            등록하기
          </Button>
        </form>
        <div style={{ marginBottom: "10px", fontWeight: "500" }}>
          어떤 응원을 위한 사연인가요?
        </div>
        <div>
          {Categories.map((item) => {
            return (
              <Category
                key={item.id}
                detail={item.detail}
                tag={item.tag}
                onClick={() => handleClick(item.id)}
                style={
                  selectedId === item.id
                    ? {
                        border: "1.5px solid rgba(152, 108, 233, 1)",
                        color: "rgba(152, 108, 233, 1)",
                      }
                    : {}
                }
              />
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WriteCheer;

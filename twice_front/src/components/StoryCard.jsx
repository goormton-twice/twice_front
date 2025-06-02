// src/components/StoryCard.jsx
import React from 'react';

const StoryCard = ({ story }) => {
  if (!story) return null;

  const { username, categoryName, content, createdAt, cheerMessages, cheerCount } = story;

  return (
    <div style={styles.card}>
      <h3>{categoryName} · {username}</h3>
      <p>{content}</p>
      <small>{new Date(createdAt).toLocaleString()}</small>
      <p>응원 수: {cheerCount}</p>
      <hr />
      <div>
        <h4>응원 메시지</h4>
        {cheerMessages && cheerMessages.length > 0 ? (
          cheerMessages.map((cheer, idx) => (
            <div key={idx} style={styles.cheer}>
              <p>{cheer.content}</p>
              <small>{cheer.category} · {new Date(cheer.createdAt).toLocaleString()}</small>
            </div>
          ))
        ) : (
          <p>아직 응원 메시지가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  card: {
    padding: '1.5rem',
    margin: '1rem auto',
    border: '1px solid #ccc',
    borderRadius: '8px',
    maxWidth: '600px',
    backgroundColor: '#fdfdfd',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
  },
  cheer: {
    marginTop: '0.5rem',
    padding: '0.5rem',
    backgroundColor: '#f0f0ff',
    borderRadius: '6px',
  },
};

export default StoryCard;

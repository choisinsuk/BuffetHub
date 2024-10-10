import React, { useContext } from "react";
import { PostContext } from "../../../contexts/PostContext"; // 컨텍스트를 임포트

const NoticeList = () => {
  const { posts } = useContext(PostContext); // 컨텍스트에서 posts 가져오기

  return (
    <div>
      <h2>공지사항 리스트</h2>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>
            <h3>{post.title}</h3>
            <h4>{post.menuTitle}</h4>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoticeList;

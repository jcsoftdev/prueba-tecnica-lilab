import React, { useEffect, useState } from "react";

import useFetch from "../../hooks/useFetch";
import Item from "./Item";
import "./PostList.css";

const PostList = () => {

  const [posts, setPosts] = useState([])

  const headers = new Headers();
  headers.append("app-id", `${process.env.REACT_APP_APP_ID}`);
  const {
    response,
    loading,
    error,
  } = useFetch(`${process.env.REACT_APP_API_URL}/post?limit=10`, { headers });

  useEffect(() => {
    response?.data && setPosts(response.data)
    return () => {
    }
  }, [response])
  const onFilter = (tag) => {
    console.log(tag)
    const newPosts = posts.filter((post)=>post.tags.includes(tag))
    console.log(tag, newPosts)
    setPosts(newPosts)
  }

  return (
    <>
      {loading && <h1>Loading</h1>}
      {error && <h1>Error</h1>}
      <div className="content">
        {posts &&
          posts.map((post) => (
            <Item
              key={post.id}
              id={post.id}
              image={post.image}
              likes={post.likes}
              link={post.link}
              owner={post.owner}
              publishDate={post.publishDate}
              tags={post.tags}
              text={post.text}
              onFilter={onFilter}
            />
          ))}
      </div>
    </>
  );
};

export default PostList;

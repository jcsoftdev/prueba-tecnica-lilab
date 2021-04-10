import React, { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import Card from "../../Card";
import Modal from "../../Modal";
import "./Item.css";

const Tag = ({ tag, onClick }) => (
  <span className="tag" onClick={onClick}>
    #{tag}
  </span>
);

const Comment = ({ message, owner, publishDate }) => {
  return (
    <>
      <div className="comment">
        <div className="comment-profile">
          <img src={owner.picture} alt="" className="avatar" />
          <p>
            {owner.firstName} {owner.lastName}
          </p>
        </div>
        <p className="comment-message">{message}</p>
        <p className="comment-date">{publishDate}</p>
      </div>
    </>
  );
};

const Item = ({
  id,
  image,
  likes,
  link,
  owner,
  publishDate,
  tags,
  text,
  onFilter,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const headers = new Headers();
  headers.append("app-id", `${process.env.REACT_APP_APP_ID}`);
  const { response } = useFetch(
    `${process.env.REACT_APP_API_URL}/post/${id}/comment`,
    {
      headers,
    }
  );
  const showModalPost = () => {
    setIsModalOpen(true);
    console.log(response);
  };

  const hideModalPost = () => {
    setIsModalOpen(false);
  };

  return (
    <Card>
      <div className="header-item">
        <img src={owner.picture} alt="avatar" />
        <div className="header-info">
          <h3>
            {owner.title} {owner.firstName} {owner.lastName}
          </h3>
          <p>{owner.email}</p>
        </div>
      </div>
      <hr />
      <div className="body-item">
        <figure>
          <img src={image} alt="post" />
        </figure>
        <div className="tags">
          {tags.map((tag) => (
            <Tag
              tag={tag}
              key={tag}
              onClick={() => {
                onFilter(tag);
              }}
            />
          ))}
        </div>
        <h2 className="description">{text}</h2>
        {link && (
          <a className="link" href={link} target="_blank" rel="noreferrer">
            See post
          </a>
        )}
        <hr />
        <p className="likes">
          Likes: <span>{likes}</span>
        </p>
        <p className="publishDate">{publishDate}</p>
        {response?.data &&
          (response.data.length > 0 ? (
            <button onClick={showModalPost} className="comments">
              <span>{response.data?.length} comments</span>
            </button>
          ) : (
            <span>No comments</span>
          ))}
        {isModalOpen && (
          <Modal onCloseClick={hideModalPost} headerText="Comentarios">
            {response.data.map((comment) => {
              return (
                <Comment key={comment.id} {...comment}>
                  {comment.message}
                </Comment>
              );
            })}
          </Modal>
        )}
      </div>
    </Card>
  );
};

export default Item;

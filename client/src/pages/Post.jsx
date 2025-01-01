import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';
import './Post.css';

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const [postResponse, commentsResponse] = await Promise.all([
          axios.get(`http://localhost:3000/posts/byId/${id}`),
          axios.get(`http://localhost:3000/comments/${id}`)
        ]);
        setPostObject(postResponse.data);
        setComments(commentsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPostAndComments();
  }, [id]);

  const addComment = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/comments',
        {
          commentBody: newComment,
          PostId: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem('accessToken'),
          },
        }
      );

      if (response.data.error) {
        alert(`Error: ${response.data.error}`);
        return;
      }

      const commentToAdd = {
        commentBody: newComment,
        username: response.data.username,
        id: response.data.id,
      };
      setComments([...comments, commentToAdd]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:3000/comments/${commentId}`, {
        headers: {
          accessToken: localStorage.getItem('accessToken'),
        },
      });
      setComments(comments.filter((val) => val.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div className="postPage">
      <div className="postContent">
        <div className="title">{postObject.title}</div>
        <div className="body">{postObject.postText}</div>
        <div className="footer">Posted by: {postObject.username}</div>
      </div>
      <div className="commentsSection">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="Comment..."
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
          />
          <button onClick={addComment}>Add Comment</button>
        </div>
        <div className="listOfComments">
          {comments.map((comment) => (
            <div className="comment" key={comment.id}>
              <div className="commentContent">
                <div className="commentBody">{comment.commentBody}</div>
                <div className="commentUsername">By: {comment.username}</div>
              </div>
              {authState.username === comment.username && (
                <button onClick={() => deleteComment(comment.id)}>X</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Post;


import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css/photoDetail.css";

const DBJSON_BASE_URL = "http://localhost:5001";

export default function PhotoDetail() {
  const photoData = useLoaderData();

  const photo = photoData.photo;
  const album = photoData.album;
  const category = photoData.category;
  const year = photoData.year;

  const [users, setUsers] = useState(() => {
    if (photoData.users) {
      const usersArray = [];
      for (let i = 0; i < photoData.users.length; i++) {
        usersArray.push(photoData.users[i]);
      }
      return usersArray;
    } else {
      return [];
    }
  });

  const [comments, setComments] = useState(() => {
    if (photoData.comments) {
      const commentsArray = [];
      for (let i = 0; i < photoData.comments.length; i++) {
        commentsArray.push(photoData.comments[i]);
      }
      return commentsArray;
    } else {
      return [];
    }
  });

  const [newComment, setNewComment] = useState("");
  const [commenterName, setCommenterName] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");

  // Create new comment and save in db.json
  function createNewComment(user) {
    const newCommentData = {
      id: Date.now(),
      photoId: Number(photo.id),
      userId: Number(user.id),
      text: newComment,
      timestamp: new Date().toISOString(),
    };

    fetch(`${DBJSON_BASE_URL}/comments`, {
      method: "POST",
      body: JSON.stringify(newCommentData),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then(() => {
        const updatedComments = [];
        for (let i = 0; i < comments.length; i++) {
          updatedComments.push(comments[i]);
        }
        updatedComments.push(newCommentData);
        setComments(updatedComments);
        setNewComment("");
        setCommenterName("");
        toast.success("Comment added successfully!");
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
        toast.error("Failed to add comment.");
      });
  }

  // Add Comment
  function handleAddComment(event) {
    event.preventDefault();

    if (newComment.trim() === "" || commenterName.trim() === "") {
      toast.error("Please provide both a name and a comment.");
      return;
    }

    let user = users.filter((existingUser) => {
      return existingUser.name.toLowerCase() === commenterName.toLowerCase();
    })[0];

    if (!user) {
      const newUser = { id: Date.now(), name: commenterName };

      fetch(`${DBJSON_BASE_URL}/users`, {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((createdUser) => {
          const updatedUsers = [];
          for (let i = 0; i < users.length; i++) {
            updatedUsers.push(users[i]);
          }
          updatedUsers.push(createdUser);
          setUsers(updatedUsers);
          createNewComment(createdUser);
        })
        .catch((error) => {
          console.error("Error creating user:", error);
          toast.error("Failed to create user.");
        });
    } else {
      createNewComment(user);
    }
  }

  // Edit Comment
  function handleEditComment(event) {
    event.preventDefault();

    if (editCommentText.trim() === "") {
      toast.error("Comment cannot be empty.");
      return;
    }

    const numericEditCommentId = Number(editCommentId);

    fetch(`${DBJSON_BASE_URL}/comments/${numericEditCommentId}`, {
      method: "PATCH",
      body: JSON.stringify({
        text: editCommentText,
        timestamp: new Date().toISOString(),
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((updatedComment) => {
        const updatedComments = [];
        for (let i = 0; i < comments.length; i++) {
          if (Number(comments[i].id) === numericEditCommentId) {
            updatedComments.push(updatedComment);
          } else {
            updatedComments.push(comments[i]);
          }
        }
        setComments(updatedComments);
        setEditCommentId(null);
        setEditCommentText("");
        toast.success("Comment updated successfully!");
      })
      .catch((error) => {
        console.error("Error editing comment:", error);
        toast.error("Failed to edit comment.");
      });
  }

  // Delete Comment
  function handleDeleteComment(commentId) {
    const numericCommentId = Number(commentId);

    fetch(`${DBJSON_BASE_URL}/comments/${numericCommentId}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedComments = [];
        for (let i = 0; i < comments.length; i++) {
          if (Number(comments[i].id) !== numericCommentId) {
            updatedComments.push(comments[i]);
          }
        }
        setComments(updatedComments);
        toast.success("Comment deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting comment:", error);
        toast.error("Failed to delete comment.");
      });
  }

  // Group Comments
  function groupComments() {
    const groupedComments = [];
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const userComments = [];
      for (let j = 0; j < comments.length; j++) {
        if (Number(comments[j].userId) === Number(user.id)) {
          userComments.push(comments[j]);
        }
      }
      if (userComments.length > 0) {
        groupedComments.push({ user: user, comments: userComments });
      }
    }
    return groupedComments;
  }

  return (
    <div className="photo-detail-container">
      <ToastContainer />
      <h1>{photo.title}</h1>
      <img src={photo.url} alt={photo.title} className="photo-large" />

      <div className="photo-details">
        <p>
          <strong>Album:</strong> {album.name}
        </p>
        <p>
          <strong>Category:</strong> {category.name}
        </p>
        <p>
          <strong>Year:</strong> {year.year}
        </p>
      </div>

      <h2>Comments</h2>
      <ul className="comments-list">
        {groupComments().map((group) => (
          <li key={group.user.id}>
            <strong>{group.user.name}</strong>
            <ul>
              {group.comments.map((comment) => (
                <li key={comment.id}>
                  {comment.text}{" "}
                  <button
                    onClick={() => {
                      setEditCommentId(comment.id);
                      setEditCommentText(comment.text);
                    }}
                    className="btn btn-secondary"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      handleDeleteComment(comment.id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      {editCommentId ? (
        <form className="edit-comment-form" onSubmit={handleEditComment}>
          <textarea
            value={editCommentText}
            onChange={(e) => {
              setEditCommentText(e.target.value);
            }}
            placeholder="Edit your comment"
          />
          <button type="submit" className="btn btn-primary">
            Save
          </button>
          <button
            type="button"
            onClick={() => {
              setEditCommentId(null);
              setEditCommentText("");
            }}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </form>
      ) : (
        <form className="add-comment-form" onSubmit={handleAddComment}>
          <input
            type="text"
            placeholder="Your Name"
            value={commenterName}
            onChange={(e) => {
              setCommenterName(e.target.value);
            }}
          />
          <textarea
            value={newComment}
            onChange={(e) => {
              setNewComment(e.target.value);
            }}
            placeholder="Add a new comment"
          />
          <button type="submit" className="btn btn-primary">
            Add Comment
          </button>
        </form>
      )}
    </div>
  );
}

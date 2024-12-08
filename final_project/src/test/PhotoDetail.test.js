import React from "react";
import { render, fireEvent } from "@testing-library/react";

test("adds a new comment", () => {
  function MockPhotoDetail() {
    const [comments, setComments] = React.useState([
      {
        id: 1,
        photoId: 1,
        userId: 1,
        text: "Beautiful shot!",
        timestamp: "2024-12-01T06:20:54.426Z",
      },
    ]);

    const addComment = () => {
      const newComment = {
        id: Date.now(),
        photoId: 1,
        userId: 2,
        text: "Amazing view!",
        timestamp: new Date().toISOString(),
      };

      const updatedComments = [];
      for (let i = 0; i < comments.length; i++) {
        updatedComments.push(comments[i]);
      }
      updatedComments.push(newComment);

      setComments(updatedComments);
    };

    return (
      <div>
        <ul data-testid="comments-list">
          {comments.map((comment) => (
            <li key={comment.id} data-testid="comment-item">
              {comment.text}
            </li>
          ))}
        </ul>
        <button onClick={addComment} data-testid="add-comment-button">
          Add Comment
        </button>
      </div>
    );
  }

  const component = render(<MockPhotoDetail />);

  const initialComments = component.getAllByTestId("comment-item");
  expect(initialComments.length).toBe(1);

  fireEvent.click(component.getByTestId("add-comment-button"));

  const updatedComments = component.getAllByTestId("comment-item");
  expect(updatedComments.length).toBe(2);
  expect(updatedComments[1].textContent).toBe("Amazing view!");
});

test("deletes a comment", () => {
  function MockPhotoDetail() {
    const [comments, setComments] = React.useState([
      {
        id: 1,
        photoId: 1,
        userId: 1,
        text: "Beautiful shot!",
        timestamp: "2024-12-01T06:20:54.426Z",
      },
      {
        id: 2,
        photoId: 1,
        userId: 2,
        text: "Amazing view!",
        timestamp: "2024-12-01T07:20:54.426Z",
      },
    ]);

    const deleteComment = (id) => {
      const updatedComments = [];
      for (let i = 0; i < comments.length; i++) {
        if (comments[i].id !== id) {
          updatedComments.push(comments[i]);
        }
      }
      setComments(updatedComments);
    };

    return (
      <div>
        <ul data-testid="comments-list">
          {comments.map((comment) => (
            <li key={comment.id} data-testid="comment-item">
              {comment.text}
              <button
                onClick={() => deleteComment(comment.id)}
                data-testid={`delete-comment-button-${comment.id}`}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const component = render(<MockPhotoDetail />);

  const initialComments = component.getAllByTestId("comment-item");
  expect(initialComments.length).toBe(2);

  fireEvent.click(component.getByTestId("delete-comment-button-1"));

  const updatedComments = component.getAllByTestId("comment-item");
  expect(updatedComments.length).toBe(1);
});

test("groups comments by user", () => {
  function MockPhotoDetail() {
    const users = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ];
    const comments = [
      { id: 1, userId: 1, text: "Beautiful photo!" },
      { id: 2, userId: 1, text: "Amazing view!" },
      { id: 3, userId: 2, text: "Stunning shot!" },
    ];

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

    const groupedComments = groupComments();

    return (
      <div>
        <ul data-testid="grouped-comments">
          {groupedComments.map((group, index) => (
            <li key={index} data-testid="user-comment-group">
              <strong>{group.user.name}</strong>
              <ul>
                {group.comments.map((comment) => (
                  <li key={comment.id} data-testid="comment-item">
                    {comment.text}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const component = render(<MockPhotoDetail />);

  const userCommentGroups = component.getAllByTestId("user-comment-group");
  expect(userCommentGroups.length).toBe(2);

  const firstUserComments = userCommentGroups[0].querySelectorAll(
    "[data-testid='comment-item']"
  );
  expect(firstUserComments.length).toBe(2);

  const secondUserComments = userCommentGroups[1].querySelectorAll(
    "[data-testid='comment-item']"
  );
  expect(secondUserComments.length).toBe(1);
});

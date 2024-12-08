import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AlbumDetail from "./routes/AlbumDetail.js";
import Albums from "./routes/Albums.js";
import Confirmation from "./routes/Confirmation.js";
import ContactMe from "./routes/ContactMe.js";
import Index from "./routes/index.js";
import PhotoDetail from "./routes/PhotoDetail.js";
import Photos from "./routes/Photos.js";
import Resume from "./routes/Resume.js";
import Root from "./routes/Root.js";
import "./global.css";

const DBJSON_BASE_URL = "http://localhost:5001";

function fetchData(endpoint) {
  return fetch(`${DBJSON_BASE_URL}${endpoint}`)
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error(
        `Failed to fetch data from ${DBJSON_BASE_URL}${endpoint}:`,
        error
      );
      throw error;
    });
}

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Index />,
        loader() {
          return fetch(`${DBJSON_BASE_URL}/photos`).then((response) => {
            return response.json();
          });
        },
      },
      {
        path: "/contact",
        element: <ContactMe />,
      },
      {
        path: "/photos",
        element: <Photos />,
        loader() {
          return fetch(`${DBJSON_BASE_URL}/photos`).then((response) => {
            return response.json();
          });
        },
      },
      {
        path: "/photos/:photoId",
        element: <PhotoDetail />,
        loader({ params }) {
          const photoId = Number(params.photoId);

          return fetch(`${DBJSON_BASE_URL}/photos/${photoId}`)
            .then((response) => {
              return response.json();
            })
            .then((photo) => {
              return Promise.all([
                fetch(`${DBJSON_BASE_URL}/albums/${photo.albumId}`).then(
                  (response) => response.json()
                ),
                fetch(`${DBJSON_BASE_URL}/categories/${photo.categoryId}`).then(
                  (response) => response.json()
                ),
                fetch(`${DBJSON_BASE_URL}/years/${photo.yearId}`).then(
                  (response) => response.json()
                ),
                fetch(`${DBJSON_BASE_URL}/comments`)
                  .then((response) => response.json())
                  .then((comments) =>
                    comments.filter(
                      (comment) => Number(comment.photoId) === photoId
                    )
                  ),
                fetch(`${DBJSON_BASE_URL}/users`).then((response) =>
                  response.json()
                ),
              ]).then(([album, category, year, comments, users]) => {
                return { photo, album, category, year, comments, users };
              });
            })
            .catch((error) => {
              console.error("Error loading photo details:", error.message);
              return {
                photo: null,
                album: {},
                category: {},
                year: {},
                comments: [],
                users: [],
              };
            });
        },
      },
      {
        path: "/albums",
        element: <Albums />,
        loader() {
          return fetch(`${DBJSON_BASE_URL}/albums`).then((response) => {
            return response.json();
          });
        },
      },
      {
        path: "/albums/:albumId",
        element: <AlbumDetail />,
        loader({ params }) {
          return Promise.all([
            fetch(`${DBJSON_BASE_URL}/albums/${params.albumId}`).then(
              (response) => response.json()
            ),
            fetch(`${DBJSON_BASE_URL}/photos?albumId=${params.albumId}`).then(
              (response) => response.json()
            ),
          ]).then(([album, photos]) => {
            return { album, photos };
          });
        },
      },
      {
        path: "/resume",
        element: <Resume />,
      },
      {
        path: "/confirmation",
        element: <Confirmation />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();

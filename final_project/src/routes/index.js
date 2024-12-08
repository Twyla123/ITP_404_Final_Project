import React from "react";
import { Link } from "react-router-dom";
import "./css/index.css";

export default function Index() {
  document.title = "Twyla's Website - Home Page";

  return (
    <div className="container">
      <div className="about-me">
        <h1 className="title">About Me</h1>
        <div className="aboutP">
          <p>
            Hello, I'm Twyla Zhang. I'm currently pursuing double Bachelor's
            degrees in Economics and Data Science at the University of Southern
            California. At school, I have applied my technical skils, such as
            programming and data analysis in various projects. In terms of
            hobbies, I enjoy exploring different things such as archery,
            photography, exercise, and so on. I'm excited to apply my skills and
            experiences in new environments and look forward to collaborating
            with others who share my passion for economics and data science.
          </p>
        </div>
        <div className="columns-container">
          <div className="column">
            <img
              src="https://cdn.pixabay.com/photo/2014/09/25/00/43/target-459833_1280.jpg"
              alt="Archery"
              className="image"
            />
            <p>
              Last semester, I started archery, and it has been a very enjoyable
              experience. The sport requires focus, which helps me block out
              distractions and immerse myself in the present moment. Each
              successful shot motivates me to improve further. Additionally, the
              archery club is a welcoming community where I've made new friends
              and found support.
            </p>
          </div>

          <div className="column">
            <img
              src="https://img.freepik.com/premium-photo/female-photographer-with-camera-young-women-love-taking-pictures-camera-lover-taking-pictures-yellow-studio_24883-4926.jpg"
              alt="Photography"
              className="image"
            />
            <p>
              Photography, for me, is an endlessly fascinating journey of
              discovery and creativity. Often, I pick up my camera with no idea
              how to capture a good photo until I've taken dozens or even
              hundreds of shots. It requires imagination, creativity, and an
              understanding of the subject and its environment. While
              photography is challenging, each great photo motivates me to learn
              more and improve. In the future, I hope to constantly experiment
              with new techniques, angles, and compositions to bring new things
              to my images.
            </p>

            <Link to="/photos" className="btn btn-primary">
              View My Photos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

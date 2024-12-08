import React from "react";
import ResumeSection from "../components/ResumeSection";
import "./css/resume.css";

export default function Resume() {
  document.title = "Twyla's Website - Resume";

  const projects = [
    {
      title: "Final Project, Objected-Oriented Programming",
      details: [
        "Used Java to design and implement a program that resembles Evite.com, including two inheritance hierarchies for both host and users, a system that allows read and write user data to and from a file, and a text-based interface with a menu;",
      ],
    },
    {
      title: "Individual Research on Race and Housing Ownership",
      details: [
        "Analyze the social problem of income inequality between white people and black people through housing ownership and the impact of education on housing ownership.",
      ],
    },
  ];

  const workExperience = [
    {
      title: "Teaching Assistant, Afghan Pathways Program",
      details: [
        "USC, Los Angeles, CA",
        "Provide help and grade homework for female Afghan students with limited resource to study.",
      ],
    },
  ];

  const honorsAndAwards = [
    {
      title: null,
      details: [
        "USC Dornsife Dean’s List for Spring 2023",
        "USC Dornsife Dean’s List for Fall 2022",
        "College of Letters and Science Dean’s List at UW-Madison",
        "Honorable Mention, 23rd Annual High School Mathematical Contest of Modeling",
        "...",
      ],
    },
  ];

  const extracurricularActivities = [
    {
      title: null,
      details: [
        "Archery",
        "Spark (Volunteered English Tutor)",
        "Economics Student Association",
        "...",
      ],
    },
  ];

  const skills = [
    {
      title: null,
      details: [
        "Python",
        "Java",
        "HTML/CSS",
        "JavaScript",
        "Software: Stata, Excel, IntelliJ IDEA, Visual Code Studio, Jupyter Notebook",
        "...",
      ],
    },
  ];

  return (
    <div className="container" data-testid="resume-container">
      <h1 className="title" data-testid="resume-title">
        Resume
      </h1>
      <div className="resume" data-testid="resume-content">
        <header className="resume-header" data-testid="resume-header">
          <h2>XINXIN (TWYLA) ZHANG</h2>
          <p>Los Angeles, CA | 484-705-9133 | twylazha@usc.edu</p>
        </header>

        <h2 data-testid="education-title">Education</h2>
        <div className="education-container" data-testid="education-section">
          <div className="institution" data-testid="education-institution">
            <h3>University of Southern California</h3>
            <p>Double Bachelor's Degrees in Economics and Data Science</p>
            <p>Current GPA: 3.88/4.00</p>
          </div>
          <div className="mascot-container">
            <img
              src="https://www.si.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MjAwNjkyMTA1MDcxMzA2MTE0/usatsi_21337956.jpg"
              alt="USC Mascot"
              className="mascot"
              data-testid="mascot-image"
            />
          </div>
        </div>

        <ResumeSection
          title="Projects"
          items={projects}
          testId="projects-section"
        />
        <ResumeSection
          title="Work Experience"
          items={workExperience}
          testId="work-experience-section"
        />
        <ResumeSection
          title="Honors and Awards"
          items={honorsAndAwards}
          testId="honors-section"
        />
        <ResumeSection title="Skills" items={skills} testId="skills-section" />
        <ResumeSection
          title="Extracurricular Activities"
          items={extracurricularActivities}
          testId="extracurricular-section"
        />
      </div>
    </div>
  );
}

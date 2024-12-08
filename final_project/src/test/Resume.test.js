import React from "react";
import { render } from "@testing-library/react";

function ResumeSection(props) {
  return (
    <div className="section" data-testid={props.testId}>
      {props.title && <h2>{props.title}</h2>}
      {props.items.map((item, index) => {
        return (
          <div key={index} className="resume-item" data-testid="resume-item">
            {item.title && <h3>{item.title}</h3>}
            <ul>
              {item.details.map((detail, idx) => {
                return <li key={idx}>{detail}</li>;
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

test("renders ResumeSection with a title", () => {
  const items = [
    {
      title: "Sample Project",
      details: ["Detail 1", "Detail 2"],
    },
  ];

  const form = render(
    <ResumeSection title="Projects" items={items} testId="projects-section" />
  );

  const sections = form.getAllByTestId("projects-section");
  expect(sections.length).toBe(1);

  const resumeItems = form.getAllByTestId("resume-item");
  expect(resumeItems.length).toBe(1);

  const details = form.getAllByTestId("resume-item")[0].querySelectorAll("li");
  expect(details.length).toBe(2);
});

test("renders ResumeSection without a title", () => {
  const items = [
    {
      title: null,
      details: ["Detail 1", "Detail 2", "Detail 3"],
    },
  ];

  const form = render(
    <ResumeSection title={null} items={items} testId="honors-section" />
  );

  const sections = form.getAllByTestId("honors-section");
  expect(sections.length).toBe(1);

  const resumeItems = form.getAllByTestId("resume-item");
  expect(resumeItems.length).toBe(1);

  const details = form.getAllByTestId("resume-item")[0].querySelectorAll("li");
  expect(details.length).toBe(3);
});

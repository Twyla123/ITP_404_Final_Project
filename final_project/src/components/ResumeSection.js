import React from "react";

export default function ResumeSection(props) {
  return (
    <div className="section">
      <h2>{props.title}</h2>
      {props.items.map((item, index) => {
        return (
          <div key={index} className="resume-item">
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

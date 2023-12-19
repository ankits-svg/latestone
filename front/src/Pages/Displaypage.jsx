import React from "react";
import "../Components/Display.css";

const DisplayPage = () => {
  return (
    <div className="containerStyle">
      <div className="leftDivStyle">
        <div className="contentStyle">
          <h1>Your Content Here</h1>
          <p>Additional text or components can go here.</p>
        </div>
      </div>
      <div className="rightDivStyle">
        <h1>Right Div (30%)</h1>
        <div>
          <h2>Share this Certificate</h2>
        </div>
        <div>
          <span>Two icons: Twitter and LinkedIn</span>
          {/* You can add the icons here */}
        </div>
        <div className="copyButtonStyle">
          <input
            type="text"
            value="Certificate URL"
            readOnly
            style={{ width: "100%" }}
          />
          <button>Copy</button>
        </div>
        <div>
          <button style={{ padding: "0.3125rem" }}>Download</button>
        </div>
        <div>
          <h3>Title of Getting Certificate</h3>
        </div>
        <div>
          <p>Body of Getting Certificate</p>
        </div>
      </div>
    </div>
  );
};

export default DisplayPage;

import React from "react";
import "../Components/Display.css";

const DisplayPage = () => {
  return (
    <div className="containerStyle">
      <div className="leftDivStyle">
        <div className="template">
          <img src="https://i.ibb.co/pPL1QB3/leftdiv.png" alt="temp" />
        </div>

        <div className="contentStyle">
            <h1 class="top-right">
                <span class="byte">byte</span><sup class="xl">XL</sup>
            </h1>
          <div className="title">Certificate</div>
          <div className="box2">of</div>
          <div className="box3">Participation</div>
          <div className="box4">This is to certify that</div>
          <div className="box5">Ankit Sharma</div>
          <div className="box6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit eum
            necessitatibus officia cum reprehenderit delectus, rerum, molestias
            veniam voluptatum quis nostrum deleniti! Perferendis?
          </div>
          <div className="box7">Python Programming</div>
          <div className="footer">
            <div className="l">Date</div>
            <div className="r">Karun</div>
          </div>
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

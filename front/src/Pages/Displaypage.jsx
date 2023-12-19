import React from "react";
import "../Components/Display.css";

const DisplayPage = () => {
  return (
    <div className="containerStyle">
      <div className="leftDivStyle">
        <div className="template">
            <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/103572350/291574948-3bd5cd5d-3ac1-4d23-a1cb-40482041c7fc.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20231219%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231219T114025Z&X-Amz-Expires=300&X-Amz-Signature=89808a26e0dcc5bce9af22a0a15b0271746c98583ad5845f9f6f5c95c0e2698c&X-Amz-SignedHeaders=host&actor_id=103572350&key_id=0&repo_id=497514745" alt="temp" />
        </div>

        <div className="contentStyle">
          <div>
          <h1>Your Content Here</h1>
          <p>Additional text or components can go here.</p>
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

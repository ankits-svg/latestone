import React, { useEffect, useRef, useState } from "react";
import "../Components/Display.css";
import { Navigate, useNavigate, useParams } from "react-router-dom";

let topicsData = [
  { topic: "JavaScript (Basic)", body: "data-types, let vs const, hoisting, closures" },
  { topic: "Python (Basic)", body: "variables, oops" },
  { topic: "React (Introduction)", body: "components, props, state" },
  { topic: "HTML5", body: "semantic elements, forms" },
  { topic: "CSS3", body: "flexbox, grid, responsive design" },
  { topic: "Node.js", body: "npm, asynchronous programming" },
  { topic: "SQL (Databases)", body: "queries, joins, normalization" },
  { topic: "Git (Version Control)", body: "commit, branch, merge" },
  { topic: "RESTful API Design", body: "endpoints, HTTP methods, status codes" },
  { topic: "Responsive Web Design", body: "media queries, fluid layouts" },
  { topic: "Redux (State Management)", body: "actions, reducers, store" },
  { topic: "Docker (Containerization)", body: "containers, images, Dockerfile" },
  { topic: "GraphQL (API Query Language)", body: "schema, queries, mutations" },
  { topic: "Jest (JavaScript Testing Framework)", body: "unit testing, assertions" },
  { topic: "TypeScript (Typed JavaScript)", body: "interfaces, types, generics" },
  { topic: "Firebase (Backend as a Service)", body: "authentication, Firestore" },
  { topic: "Angular (JavaScript Framework)", body: "components, services, directives" },
  { topic: "Vue.js (JavaScript Framework)", body: "components, directives, Vuex" },
  { topic: "Web Accessibility", body: "aria, semantic HTML, focus management" },
  { topic: "CI/CD (Continuous Integration/Continuous Deployment)", body: "automated testing, deployment pipelines" },
];


const DisplayPage = () => {
  const [data, setData] = useState({});
  const { id } = useParams();
  const [url,setUrl]=useState(`http://localhost:1200/get/${id}`)
  const inputRef = useRef(null);
  const leftDivRef = useRef(null);
  const currentUrl = window.location.href;
  const [body,setBody]=useState("")
  const [topic,setTopic]=useState("")
  const navigate=useNavigate()
  // console.log("currentUrl:",currentUrl)
  // console.log("id:",id);

  let newBody; 
  
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setData(res.data)
        newBody = topicsData.find((el) => el.topic === res.data.course);
        setBody(newBody.body)
        setTopic(newBody.topic)
        console.log("newbody",newBody);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleCopyClick = () => {
    // console.log(inputRef.current)
    if(inputRef.current){
      inputRef.current.select();
      document.execCommand("copy");
    }
  }

  const openShareModal = () => {
    // Implement your modal logic here
    alert("Modal for sharing options will be implemented here");
  };
  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
      if (leftDivRef.current && leftDivRef.current.contains(e.target)) {
        // Simulate the "Save Image As" option
        const link = document.createElement("a");
        link.href = "path/to/your/image.jpg";
        link.download = "Certificate.jpg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Simulate the "Copy Image" option
        if (inputRef.current) {
          inputRef.current.toBlob((blob) => {
            const item = new ClipboardItem({ "image/png": blob });
            navigator.clipboard.write([item]);
          });
        }

        // Simulate the "Browser Details" option
        console.log(navigator.userAgent);

        // Simulate the "Inspect" option
        // You may want to replace this with your own logic
        alert("Inspecting the div");
      }
      
    };

    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [leftDivRef]);


  return (
    <>
    <button onClick={()=>{
      navigate("/")
    }}>Back</button>
    <div className="containerStyle">
      
      <div className="leftDivStyle" ref={inputRef} >
        <div className="template">
          <img src="https://i.ibb.co/pPL1QB3/leftdiv.png" alt="temp" />
          {/* <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/103572350/291668301-8abfda8d-ca09-45a2-a139-fbf561592c9a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20231219%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231219T173634Z&X-Amz-Expires=300&X-Amz-Signature=95468014ee86865509ea8a3cb411b09ae89a830dc326601faf662ecdd31681d6&X-Amz-SignedHeaders=host&actor_id=103572350&key_id=0&repo_id=497514745" alt="alt" /> */}
        </div>

        <div className="contentStyle">
          <h1 class="top-right" >
            <span class="byte">byte</span>
            <sup class="xl">XL</sup>
          </h1>
          <div className="title">Certificate</div>
          <div className="title1">of</div>
          <div className="title2">{data.type}</div>
          <div className="certify-text">This is to certify that</div>
          <div className="name">{data.name}</div>
          <div className="assessment-text">
          has successfully cleared the assessment for the skill
          </div>
          <div className="programming-language">{data.course}</div>
          <div class="footer">
            <div class="bet-1">
              <h3>
                <strong class="date">
                  
                  {new Date().toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </strong>
              </h3>
              <h4>Date of Achievement</h4>
            </div>
            <div class="bet">
              <img
                width="50%"
                src="https://ankit-123.my.canva.site/098/images/219f937dae02a117e97806b886894bfd.png"
                alt="sign"
              />
              <h3>Karun Tadepalli</h3>
              <h4>CEO & Co-founder</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="rightDivStyle" onContextMenu={(e) => e.preventDefault()}>
        {/* <h1>Right Div (30%)</h1> */}
        <div>
          <h2>Share this Certificate</h2>
        </div>
        <div>
          {/* Icons for Twitter and LinkedIn */}
          <span>
              <button>Twitter</button>
            </span>
            <span>
              <button>Linkedin</button>
            </span>
            {/* You can replace the alert with actual sharing logic */}
            <button onClick={openShareModal}>More Options</button>
          {/* You can add the icons here */}
        </div>
        <div className="copyButtonStyle">
          <input
            type="text"
            value={currentUrl}
            ref={inputRef}
            readOnly
            style={{ width: "100%" }}
          />
          <button onClick={handleCopyClick}>Copy</button>
        </div>
        <div>
          <button style={{ padding: "0.3125rem" }}>Download</button>
        </div>
        <div>
          <h3>{topic}</h3>
        </div>
        <div>
          <p>{body}</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default DisplayPage;

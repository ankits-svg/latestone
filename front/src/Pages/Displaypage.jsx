import React, { useEffect, useRef, useState } from "react";
import "../Components/Display.css";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Helmet } from 'react-helmet';
import html2canvas from 'html2canvas';
import CertificateCanvas from "./CertificateCanvas";


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

// https://serverbyte.onrender.com/save
const DisplayPage = () => {
  const [data, setData] = useState({});
  const { id } = useParams();
  const [url,setUrl]=useState(`https://serverbyte.onrender.com/get/${id}`)
  const inputRef = useRef(null);
  // const leftDivRef = useRef(null);
  const currentUrl = window.location.href;
  const [body,setBody]=useState("")
  const [topic,setTopic]=useState("")
  const navigate=useNavigate()
  const [image,setImage]=useState("")
  const [encode,setEncode]=useState("")
  const [atu,setAtu]=useState(null)
  console.log("currentUrl:",currentUrl)
  // console.log("id:",id);
  // const [props,setProps]=useState("11111")
  const props=canv=>{
    console.log("sadadaadsaad:",canv)
    setAtu(canv)
  }
  // props()
  // console.log("props:",props)
  console.log("data:",data)
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
        // Update the Open Graph meta tags dynamically
        // Assume you have an image URL and certificate page URL in the response
        const imageUrl = "http://localhost:3002/display/6585771b4f70ea2faaf6d6f1"; // Replace with the actual image URL
        const certificateUrl = "URL_of_the_certificate_page"; // Replace with the actual certificate page URL

        // Update the Open Graph meta tags dynamically
        const ogTitle = document.getElementById('meta-og-title');
        const ogImage = document.getElementById('meta-og-image');
        const ogUrl = document.getElementById('meta-og-url');

        ogTitle.setAttribute('content', `ByteXL ${res.data.type} Certificate`);
        ogImage.setAttribute('content', imageUrl);
        ogUrl.setAttribute('content', currentUrl);

        document.getElementById('twitter-image').setAttribute('content', imageUrl);
        // console.log("newbody", newBody);
        console.log("newbody",newBody);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [url]);

  const handleCopyClick = () => {
    // console.log(inputRef.current)
    if(inputRef.current){
      inputRef.current.select();
      document.execCommand("copy");
    }
  }

  
  

  const handleTwitter=()=>{
    window.open("https://twitter.com/intent/tweet?url=https%3A%2F%2Ffront-bewomtvqt-ankits-projects-b7dffc9e.vercel.app%2Fdisplay%2F"+id)
  }

  const handleLinkedin = () => {
    console.log("ankit")
    
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Ffront-bewomtvqt-ankits-projects-b7dffc9e.vercel.app%2Fdisplay%2F`+id,
        "_blank"
      );
    
  };



  const handleDownload = () => {
    // console.log("props:",props)
    const elementToCapture = document.querySelector('.canva');
    console.log(elementToCapture)
  // Use html2canvas to capture the content
  html2canvas(elementToCapture).then((atu) => {
    // Convert the canvas to a data URL
    console.log("atuuuu:",atu)
    const dataURL = atu.toDataURL();

    // Create a link element to download the screenshot
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'screenshot.png';

    // Trigger a click on the link to start the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },{
    allowTaint: true,
    foreignObjectRendering: true
});
  };

  

  return (
    <>
    <Helmet>
          {/* Update meta tags, titles, and other head elements here */}
          <title>{`ByteXL ${data.type} Certificate`}</title>
          {/* Add more meta tags as needed */}
        </Helmet>
    <button onClick={()=>{
      navigate("/")
    }}>Back</button>
    <div className="containerStyle">
      
    

      <div className="canva">
      <CertificateCanvas props={props} data={data}/>
      </div>
      <div className="rightDivStyle">
        {/* <h1>Right Div (30%)</h1> */}
        <div>
          <h2>Share this Certificate</h2>
        </div>
        <div className="social">
          {/* Icons for Twitter and LinkedIn */}
          <div onClick={()=>handleTwitter()}><img width={'80%'} src="https://hrcdn.net/fcore/assets/social_share/twitter-96e2c898ae.svg" alt="linkedin" /></div>
          <div onClick={()=>handleLinkedin()}><img width={'80%'} src="https://hrcdn.net/fcore/assets/social_share/linkedin-fd4be6309a.svg" alt="linkedin" /></div>
          
              {/* <button>Twitter</button> */}
           
              
              {/* <button>Linkedin</button> */}
           
            {/* You can replace the alert with actual sharing logic */}
            {/* <button onClick={openShareModal}>More Options</button> */}
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
          <button style={{ padding: "0.3125rem" }} onClick={handleDownload}>Download</button>
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

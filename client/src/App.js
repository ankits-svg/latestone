import React, { useEffect, useState } from "react";
import {
  ChakraProvider,
  Box,
  IconButton,
  Heading,
  Image,
  Input,
  Button,
  Text,
  InputGroup,
  InputRightElement,
  Divider,
} from "@chakra-ui/react";
import "./App.css";

import { FaTwitter, FaLinkedin } from "react-icons/fa";
import { MdDownload } from "react-icons/md";

function App() {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [type, setType] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [copy, setCopy] = useState("");
  const [image, setImage] = useState(null);
  const [toggle, setToggle] = useState(false);

  function capitalizeFirstLetter(string) {
    return string
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  const generateCertificatepdf = async () => {
    let obj = {
      name: capitalizeFirstLetter(name),
      course: capitalizeFirstLetter(course),
      type: capitalizeFirstLetter(type),
      linkedin: linkedin,
    };
    // localStorage.setItem("details", JSON.stringify(obj));
    if (
      obj.name !== "" ||
      obj.course !== "" ||
      obj.type !== "" ||
      obj.linkedin !== ""
    ) {
      try {
        const response = await fetch("http://localhost:1200/pdf", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            course,
            type: type.toUpperCase(),
            linkedin,
          }),
        });

        const pdfBuffer = await response.arrayBuffer();
        // console.log("pdfBuffer:",pdfBuffer)
        const blob = new Blob([pdfBuffer], { type: "application/pdf" });
        // console.log("blob:",blob)
        const url = URL.createObjectURL(blob);
        // console.log("url:",url)
        // localStorage.setItem('url',JSON.stringify(url))
        setPdfUrl(url);
        setName("");
        setCourse("");
        setType("");
        // setlinkedin("")
      } catch (error) {
        console.error("Error generating certificate:", error);
      }
    } else {
      alert("Please fill the details");
    }
  };

  const handleCopy = () => {
    const urlInput = document.getElementById("pdfUrlInput");
    console.log("urlInput:", urlInput.value);
    if (urlInput) {
      urlInput.select();
      document.execCommand("copy");
      setCopy("Copied!");
    }
  };

  const generateCertificateimage = () => {
    generateCertificatepdf();
    let obj = {
      name: capitalizeFirstLetter(name),
      course: capitalizeFirstLetter(course),
      type: capitalizeFirstLetter(type),
      linkedin: linkedin,
    };
    console.log("obj:", obj);

    if (
      obj.name !== "" ||
      obj.course !== "" ||
      obj.type !== "" ||
      obj.linkedin !== ""
    ) {
      fetch("http://localhost:1200/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then((res) => res.json())
        .then((res) => {
          // console.log(res.imageUrl)
          setImage(res.imageUrl);
          setName("");
          setType("");
          setCourse("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const isDisabled = !name || !course || !type || !linkedin;

  const downloadCertificate = () => {
    if (image) {
      // Create a temporary link element
      const link = document.createElement("a");
      link.href = image;
      link.download = "Certificate.png";
      document.body.appendChild(link);

      // Trigger the click event to start the download
      link.click();

      // Remove the link from the document
      document.body.removeChild(link);
    }
  };

  return (
    <ChakraProvider>
      <Box className="App" textAlign="center" p={8}>
        <Heading as="h1" size="xl" mb={4}>
          Generate byteXL certificate here...
        </Heading>
        <Box mb={4}>
          <InputGroup>
            <Input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </InputGroup>
        </Box>
        <Box mb={4}>
          <InputGroup>
            <Input
              placeholder="Course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            />
          </InputGroup>
        </Box>
        <Box mb={4}>
          <InputGroup>
            <Input
              placeholder="Type of Certificate"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </InputGroup>
        </Box>
        <Box mb={4}>
          <InputGroup>
            <Input
              placeholder="Linkedin Username"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
            />
          </InputGroup>
        </Box>
        {/* {toggle === true ? (
          <Button
            colorScheme="teal"
            size="md"
            mb={4}
            onClick={generateCertificatepdf}
            isDisabled={isDisabled}
          >
            Generate Certificate in pdf
          </Button>
        ) : (
          <Button
            colorScheme="teal"
            size="md"
            mb={4}
            onClick={generateCertificateimage}
            isDisabled={isDisabled}
          >
            Generate Certificate in Image
          </Button>
        )} */}
        <Button
          colorScheme="teal"
          size="md"
          mb={4}
          onClick={generateCertificateimage}
          isDisabled={isDisabled}
        >
          Generate Certificate
        </Button>
        <Box>
          <Button
            onClick={() => {
              setToggle(!toggle);
            }}
          >
            Toggle
          </Button>
        </Box>
        {toggle === true ? (
          <>
            {pdfUrl ? (
              <Box
                display="flex"
                flexDirection={{ base: "column", md: "row" }}
                justifyContent="space-around"
                w="100%"
                mb={4}
              >
                <Box flex="1" pr={{ base: 0, md: 4 }}>
                  <iframe
                    title="Generated Certificate"
                    src={pdfUrl}
                    frameBorder="0"
                    style={{
                      border: "2px solid gray",
                      width: "100%",
                      height: "494px",
                      margin: "auto",
                      marginTop: "20px",
                      borderRadius: "20px", // Add the desired border radius value
                    }}
                  ></iframe>
                </Box>

                <Box flex="0 0 30%" pl={{ base: 0, md: 4 }} m={"20px"}>
                  <Heading as="h2" size="lg" mb={4}>
                    Generated Certificate URL:
                  </Heading>
                  <Box>
                    <InputGroup>
                      <Input
                        id="pdfUrlInput"
                        type="url"
                        value={pdfUrl}
                        readOnly
                        onClick={(e) => e.target.select()}
                        pr="1rem"
                        focusBorderColor="teal" // Set the focus border color to teal
                        borderColor="teal" // Set the border color to teal
                      />
                      <InputRightElement width="4.5rem" pr="0">
                        <Button
                          h="1.75rem"
                          size="sm"
                          onClick={handleCopy}
                          colorScheme="teal"
                        >
                          {copy ? "Copied!" : "Copy"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <Text color="green.500" mt={2}>
                      {copy}
                    </Text>
                  </Box>
                  <Box mt={4}>
                    <Heading as="h3" size="md">
                      Share Certificate:
                    </Heading>
                    <IconButton
                      colorScheme="twitter"
                      size="md"
                      aria-label="Share on Twitter"
                      icon={<FaTwitter />}
                      onClick={() =>
                        window.open(
                          `https://twitter.com/intent/tweet?url=${pdfUrl}&text=Check out my certificate`
                        )
                      }
                      borderRadius="full"
                      mr={2}
                    />
                    <IconButton
                      colorScheme="linkedin"
                      size="md"
                      aria-label="Share on LinkedIn"
                      icon={<FaLinkedin />}
                      onClick={() =>
                        window.open(
                          `https://www.linkedin.com/in/${linkedin}/edit/forms/certification/new/?profileFormEntryPoint=PROFILE_COMPLETION_HUB`
                        )
                      }
                      borderRadius="full"
                    />
                  </Box>
                </Box>
              </Box>
            ) : (
              ""
            )}
          </>
        ) : (
          <>
            {image ? (
              <Box
                display={"flex"}
                flexDirection={{ base: "column", md: "row" }}
                justifyContent={"space-around"}
                w="100%"
                mb={4}
              >
                <Box
                  flex="1"
                  pr={{ base: 0, md: 4 }}
                  border={"1px solid gray"}
                  w={"60%"}
                >
                  <Image
                    src={image}
                    alt="Generated Certificate"
                    style={{ width: "90%" }}
                  />
                </Box>
                <Box flex="0 0 30%" pl={{ base: 0, md: 4 }} m={"20px"}>
                  <Heading as="h2" size="lg" mb={4}>
                    Generated Certificate URL:
                  </Heading>
                  <Box>
                    <InputGroup>
                      <Input
                        id="pdfUrlInput"
                        type="url"
                        value={image}
                        readOnly
                        onClick={(e) => e.target.select()}
                        pr="1rem"
                        focusBorderColor="teal" // Set the focus border color to teal
                        borderColor="teal" // Set the border color to teal
                      />
                      <InputRightElement width="4.5rem" pr="0">
                        <Button
                          h="1.75rem"
                          size="sm"
                          onClick={handleCopy}
                          colorScheme="teal"
                        >
                          {copy ? "Copied!" : "Copy"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <Text color="green.500" mt={2}>
                      {copy}
                    </Text>
                  </Box>
                  <Box mt={4}>
                    <Heading as="h3" size="md">
                      Share Certificate:
                    </Heading>
                    <IconButton
                      colorScheme="twitter"
                      size="md"
                      aria-label="Share on Twitter"
                      icon={<FaTwitter />}
                      onClick={() =>
                        window.open(
                          `https://twitter.com/intent/tweet?url=${image}&text=Check out my certificate`
                        )
                      }
                      borderRadius="full"
                      mr={2}
                    />
                    <IconButton
                      colorScheme="linkedin"
                      size="md"
                      aria-label="Share on LinkedIn"
                      icon={<FaLinkedin />}
                      onClick={() =>
                        window.open(
                          `https://www.linkedin.com/in/${linkedin}/edit/forms/certification/new/?profileFormEntryPoint=PROFILE_COMPLETION_HUB`
                        )
                      }
                      borderRadius="full"
                    />
                  </Box>
                  <Box mt={'20px'}>
                  <Button leftIcon={<MdDownload />} colorScheme='pink' variant='solid' onClick={downloadCertificate}>
                    Download
                  </Button>
                  </Box>
                </Box>
              </Box>
            ) : (
              ""
            )}
          </>
        )}
        {/* {image ? (
        <Box border={'1px solid gray'}  w={'60%'}>
          <Image src={image} alt="Generated Certificate" style={{ width: '90%' }} />
        </Box>
      ) : (
        <p>Loading...</p>
      )} */}

        {/* {pdfUrl && (
          <Box
            display="flex"
            flexDirection={{ base: "column", md: "row" }}
            justifyContent="space-around"
            w="100%"
            mb={4}
          >
            <Box flex="1" pr={{ base: 0, md: 4 }}>
              <iframe
                title="Generated Certificate"
                src={pdfUrl}
                frameBorder="0"
                style={{
                  border: "2px solid gray",
                  width: "100%",
                  height: "494px",
                  margin: "auto",
                  marginTop: "20px",
                  borderRadius: "20px", // Add the desired border radius value
                }}
              ></iframe>
            </Box>
            
            <Box flex="0 0 30%" pl={{ base: 0, md: 4 }} m={"20px"}>
              <Heading as="h2" size="lg" mb={4}>
                Generated Certificate URL:
              </Heading>
              <Box>
                <InputGroup>
                  <Input
                    id="pdfUrlInput"
                    type="url"
                    value={pdfUrl}
                    readOnly
                    onClick={(e) => e.target.select()}
                    pr="1rem"
                    focusBorderColor="teal" // Set the focus border color to teal
                    borderColor="teal" // Set the border color to teal
                  />
                  <InputRightElement width="4.5rem" pr="0">
                    <Button h="1.75rem" size="sm" onClick={handleCopy} colorScheme="teal">
                      {copy ? "Copied!" : "Copy"}
                    </Button>
                   
                  </InputRightElement>
                </InputGroup>
                <Text color="green.500" mt={2}>
                  {copy}
                </Text>
              </Box>
              <Box mt={4}>
                <Heading as="h3" size="md">
                  Share Certificate:
                </Heading>
                <IconButton
                  colorScheme="twitter"
                  size="md"
                  aria-label="Share on Twitter"
                  icon={<FaTwitter />}
                  onClick={() =>
                    window.open(
                      `https://twitter.com/intent/tweet?url=${pdfUrl}&text=Check out my certificate`
                    )
                  }
                  borderRadius="full"
                  mr={2}
                />
                <IconButton
                  colorScheme="linkedin"
                  size="md"
                  aria-label="Share on LinkedIn"
                  icon={<FaLinkedin />}
                  onClick={() =>
                    window.open(
                      `https://www.linkedin.com/in/${linkedin}/edit/forms/certification/new/?profileFormEntryPoint=PROFILE_COMPLETION_HUB`
                    )
                  }
                  borderRadius="full"
                />
              </Box>
            </Box>
          </Box>
        )} */}
      </Box>
    </ChakraProvider>
  );
}

export default App;

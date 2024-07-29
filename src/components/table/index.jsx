import React, { useState, useRef, useEffect } from "react";
import "./table.scss";
import axios from "axios";
import { Link } from "react-router-dom";
export const Table = () => {
  const [data, setData] = useState(() => {
    const savedData = sessionStorage.getItem("data");
    return savedData
      ? JSON.parse(savedData)
      : [
          {
            id: 1,
            taskName: "RS_SF9412",
            dimension: "1x1",
            templateId: "mwpswxcudtwxb",
            images: ["image1", "image2"],
            text: ["Text 1", "Text 2"],
            amount: 10,
            genType: "random_generation",
            genTasks: "Task A1",
            resultAds: "Result A1",
          },
          {
            id: 2,
            taskName: "Task 2",
            dimension: "16x9",
            templateId: "0xdoscyowl50c",
            images: ["image1", "image2"],
            text: ["Text 1", "Text 2"],
            amount: 20,
            genType: "cyclic_generation",
            genTasks: "Task B1",
            resultAds: "Result B1",
          },
        ];
  });

  const dimension = ["1x1", "9x16", "16x9"];
  const templateId = ["mwpswxcudtwxb", "0xdoscyowl50c"];
  const genType = ["cyclic_generation", "random_generation"];

  const [taskName, setTaskName] = useState("");
  const [dimensionValue, setDimensionValue] = useState("");
  const [templateIdValue, setTemplateIdValue] = useState("");
  const [images, setImages] = useState([]);
  const [text, setText] = useState([]);
  const [amount, setAmount] = useState("");
  const [genTypeValue, setGenTypeValue] = useState("");

  const [errors, setErrors] = useState({});

  useEffect(() => {
    sessionStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  const updateData = () => {
    const newErrors = {};

    if (!taskName) newErrors.taskName = true;
    if (!dimensionValue) newErrors.dimensionValue = true;
    if (!templateIdValue) newErrors.templateIdValue = true;
    if (!images.length) newErrors.images = true;
    if (!text.length) newErrors.text = true;
    if (!amount) newErrors.amount = true;
    if (!genTypeValue) newErrors.genTypeValue = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      console.log(Object.keys(errors).length);
      return;
    }
    axios
      .post(
        "https://fasteasy-jvqis72guq-lm.a.run.app/tz-front/generate_formats",
        {
          task_name: taskName,
          dimension: dimensionValue,
          template_id: templateIdValue,
          amount: amount,
          gen_type: genTypeValue,
          image_layers: images,
          text_layers: text,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic cmVuZXNhbmRybzpxd2VydHkxMjM0",
            accept: "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    setData([
      ...data,
      {
        id: data.length + 1,
        taskName: taskName,
        dimension: dimensionValue,
        templateId: templateIdValue,
        images: images,
        text: text,
        amount: Number(amount),
        genType: genTypeValue,
        genTasks: "Task A1",
        resultAds: "Result A1",
      },
    ]);

    setTaskName("");
    setDimensionValue("");
    setTemplateIdValue("");
    setImages([]);
    setText([]);
    setAmount("");
    setGenTypeValue("");
    setErrors({});
  };

  const [isEditImage, setIsEditImage] = useState(false);
  const [isEditValueImage, setIsEditValueImage] = useState("");
  const [isEditText, setIsEditText] = useState(false);
  const [isEditValueText, setIsEditValueText] = useState("");
  const imagesRef = useRef(null);
  const textsRef = useRef(null);

  const handleClickOutside = (event) => {
    if (imagesRef.current && !imagesRef.current.contains(event.target)) {
      setIsEditImage(false);
    }
    if (textsRef.current && !textsRef.current.contains(event.target)) {
      setIsEditText(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="table">
          <div className="table-header">
            <ul>
              <li className="taskName">Task Name</li>
              <li className="dimension"></li>
              <li className="templateId">Template Id</li>
              <li className="images">Images</li>
              <li className="text">Text</li>
              <li className="amount">Amount</li>
              <li className="genType">Gen Type</li>
              <li className="genTasks">Gen Tasks</li>
              <li className="resultAds">Result Ads</li>
            </ul>
          </div>
          <div className="table-content">
            <div className="table-content-header">
              <ul>
                <li className="taskName">
                  <div className="status-container">
                    <p className="status">STATUS</p>
                    <p className="to-do">to do</p>
                  </div>
                  <p className="count">Count 7</p>
                </li>
                <li className="dimension"></li>
                <li className="templateId"></li>
                <li className="images"></li>
                <li className="text"></li>
                <li className="amount">Sum 40</li>
                <li className="genType">Unique 1</li>
                <li className="genTasks"></li>
                <li className="resultAds"></li>
              </ul>
            </div>
            <div className="table-content-body">
              {data.map((item, index) => (
                <ul key={index}>
                  <li className="taskName">
                    <Link to={`/card/${item.id}`}>
                      {item.id}
                      <span>{item.taskName}</span>
                    </Link>
                  </li>
                  <li className="dimension">
                    <p>{item.dimension}</p>
                  </li>
                  <li className="templateId">
                    <p>{item.templateId}</p>
                  </li>
                  <li className="images">
                    {item.images.map((item, index) => (
                      <p key={index}>{item}</p>
                    ))}
                  </li>
                  <li className="text">
                    {item.text.map((item, index) => (
                      <p key={index}>{item}</p>
                    ))}
                  </li>
                  <li className="amount">{item.amount}</li>
                  <li className="genType">
                    <p>{item.genType}</p>
                  </li>
                  <li className="genTasks">
                    <p>Generate</p>
                  </li>
                  <li className="resultAds" href="#">
                    <a
                      href={`https://testapi-jvqis72guq-lm.a.run.app/test_vidro/${item.taskName}_${item.dimension}/format_validation`}
                    >
                      Folder
                    </a>
                  </li>
                </ul>
              ))}
              <ul>
                <li
                  className="taskName"
                  style={errors.taskName ? { borderColor: "#df5452" } : {}}
                >
                  {data.length + 1}
                  <span>
                    <input
                      type="text"
                      onChange={(e) => setTaskName(e.target.value)}
                      value={taskName}
                      placeholder="Task Name"
                    />
                  </span>
                </li>
                <li
                  className="dimension"
                  style={
                    errors.dimensionValue ? { borderColor: "#df5452" } : {}
                  }
                >
                  {dimensionValue ? <p>{dimensionValue}</p> : ""}
                  <select
                    onChange={(e) => setDimensionValue(e.target.value)}
                    value={dimensionValue}
                  >
                    <option value="" disabled>
                      Select...
                    </option>
                    {dimension.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </li>
                <li
                  className="templateId"
                  style={
                    errors.templateIdValue ? { borderColor: "#df5452" } : {}
                  }
                >
                  {templateIdValue ? <p>{templateIdValue}</p> : ""}
                  <select
                    onChange={(e) => setTemplateIdValue(e.target.value)}
                    value={templateIdValue}
                  >
                    <option value="" disabled>
                      Select...
                    </option>
                    {templateId.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </li>
                <li
                  className="images"
                  ref={imagesRef}
                  onClick={() => setIsEditImage(true)}
                  style={errors.images ? { borderColor: "#df5452" } : {}}
                >
                  {images.map((item, index) => (
                    <p key={index}>{item}</p>
                  ))}
                  {isEditImage && (
                    <div className="drop">
                      <input
                        type="text"
                        onChange={(e) => setIsEditValueImage(e.target.value)}
                        value={isEditValueImage}
                        placeholder="Enter text..."
                      />

                      {isEditValueImage ? (
                        <p
                          className="add"
                          onClick={() => {
                            setImages((prev) => [...prev, isEditValueImage]);
                            setIsEditValueImage("");
                            setIsEditImage(false);
                          }}
                        >
                          {isEditValueImage} +
                        </p>
                      ) : (
                        ""
                      )}
                      <div className="list">
                        {images.map((item, index) => (
                          <p
                            className="delete"
                            key={index}
                            onClick={() => {
                              setImages(images.filter((i) => i !== item));
                              setIsEditImage(false);
                            }}
                          >
                            {item} x
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
                <li
                  className="text"
                  ref={textsRef}
                  onClick={() => setIsEditText(true)}
                  style={errors.text ? { borderColor: "#df5452" } : {}}
                >
                  {text.map((item, index) => (
                    <p key={index}>{item}</p>
                  ))}
                  {isEditText && (
                    <div className="drop">
                      <input
                        type="text"
                        onChange={(e) => setIsEditValueText(e.target.value)}
                        value={isEditValueText}
                        placeholder="Enter text..."
                      />

                      {isEditValueText ? (
                        <p
                          className="add"
                          onClick={() => {
                            setText((prev) => [...prev, isEditValueText]);
                            setIsEditValueText("");
                            setIsEditText(false);
                          }}
                        >
                          {isEditValueText} +
                        </p>
                      ) : (
                        ""
                      )}
                      <div className="list">
                        {text.map((item, index) => (
                          <p
                            className="delete"
                            key={index}
                            onClick={() => {
                              setText(text.filter((i) => i !== item));
                              setIsEditText(false);
                            }}
                          >
                            {item} x
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
                <li
                  className="amount"
                  style={errors.amount ? { borderColor: "#df5452" } : {}}
                >
                  <input
                    type="number"
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                    placeholder="Enter..."
                  />
                </li>
                <li
                  className="genType"
                  style={errors.genTypeValue ? { borderColor: "#df5452" } : {}}
                >
                  {genTypeValue ? <p>{genTypeValue}</p> : ""}
                  <select
                    onChange={(e) => setGenTypeValue(e.target.value)}
                    value={genTypeValue}
                  >
                    <option value="" disabled>
                      Select...
                    </option>
                    {genType.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </li>
                <li className="genTasks" onClick={updateData}>
                  <p
                    style={{
                      backgroundColor:
                        Object.keys(errors).length > 0 ? "#df5452" : "#CEF5D1",
                    }}
                  >
                    Generate
                  </p>
                </li>
                <li className="resultAds"></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

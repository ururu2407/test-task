import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Card.scss";
import DropdownSelect from "../FormControl";
import {
  CloseIcon,
  DropDownIcon,
  DeleteIcon,
  ArrowOutwardIcon,
  AddImageIcon,
} from "../../assets/icon";
export const CardTask = () => {
  const { id } = useParams();
  const [task, setTask] = React.useState();
  const [dimensions, setDimensions] = React.useState([]);
  const [flows, setFlows] = React.useState([]);
  const [styles, setStyles] = React.useState([]);
  const [imageRefs, setImageRefs] = React.useState([[]]);
  const [manualPrompts, setManualPrompts] = React.useState([]);
  const [generationsPerRef, setGenerationsPerRef] = React.useState([]);

  React.useEffect(() => {
    const savedData = sessionStorage.getItem("data");
    if (savedData) {
      const data = JSON.parse(savedData);
      const foundTask = data.find((item) => item.id === Number(id));
      setTask(foundTask);

      if (foundTask) {
        setDimensions(new Array(foundTask.images.length).fill(""));
        setFlows(new Array(foundTask.images.length).fill(""));
        setStyles(new Array(foundTask.images.length).fill(""));
        setImageRefs(new Array(foundTask.images.length).fill([]));
        setManualPrompts(new Array(foundTask.images.length).fill(""));
        setGenerationsPerRef(new Array(foundTask.images.length).fill(""));
      }
    }
  }, [id]);

  if (!task) return <div>Loading...</div>;

  const updateData = () => {
    axios
      .post(
        "https://fasteasy-jvqis72guq-lm.a.run.app/tz-front/generate_images",
        {
          dimension: dimensions[0],
          flow: flows[0],
          style: styles[0],
          manual_prompts: manualPrompts[0],
          gen_per_ref: Number(generationsPerRef[0]),
          images: imageRefs[0],
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
  };

  const toggleAccordion = (e) => {
    const accordionText = e.currentTarget.nextElementSibling;
    const expanded = e.currentTarget;
    accordionText.classList.toggle("expanded");
    expanded.classList.toggle("expanded");
  };

  const handleAddImage = (index) => {
    const imageUrl = prompt("Введите ссылку на изображение:");
    const isValidUrl = (url) => {
      try {
        new URL(url);
        return true;
      } catch (_) {
        return false;
      }
    };

    const finalUrl = isValidUrl(imageUrl)
      ? imageUrl
      : "https://garden.spoonflower.com/c/2808368/p/f/m/wz4MJ0j3cdHpOHkTN5qdj7tovQRD_FFQl_DuHWO3th-bkCbrFGzA704q/Solid%20Mid%20Grey.jpg";

    if (finalUrl) {
      const newImageRefs = [...imageRefs];
      newImageRefs[index] = [...newImageRefs[index], finalUrl];
      setImageRefs(newImageRefs);
    }
  };

  const handleDeleteImage = (index, refIndex) => {
    const newImageRefs = [...imageRefs];
    newImageRefs[index] = newImageRefs[index].filter((_, i) => i !== refIndex);
    setImageRefs(newImageRefs);
  };

  const handleChangeDimension = (index, event) => {
    const newDimensions = [...dimensions];
    newDimensions[index] = event.target.value;
    setDimensions(newDimensions);
  };

  const handleChangeFlow = (index, event) => {
    const newFlows = [...flows];
    newFlows[index] = event.target.value;
    setFlows(newFlows);
  };

  const handleChangeStyles = (index, event) => {
    const newStyles = [...styles];
    newStyles[index] = event.target.value;
    setStyles(newStyles);
  };

  const handleChangeManualPrompts = (index, event) => {
    const newManualPrompts = [...manualPrompts];
    newManualPrompts[index] = event.target.value;
    setManualPrompts(newManualPrompts);
  };

  const handleChangeGenerationsPerRef = (index, event) => {
    const newGenerationsPerRef = [...generationsPerRef];
    newGenerationsPerRef[index] = event.target.value;
    setGenerationsPerRef(newGenerationsPerRef);
  };

  const dimensionOptions = ["1:1", "9:16", "16:9"];
  const flowOptions = ["Photorealistic", "Stylized", "Abstract"];
  const styleOptions = ["Realistic", "Anime", "Cartoon"];

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-header-path">
          <div className="card-header-path-title">
            <Link to="/">My Projects</Link>
            <span>/</span>
            <p>{task.taskName}</p>
          </div>
          <div className="card-header-path-close">
            <CloseIcon />
          </div>
        </div>
        <div className="card-header-title">
          <p>{task.taskName}</p>
          <span>Subtitle</span>
        </div>
      </div>
      <div className="card-body">
        <div className="card-content">
          <div className="card-content_text">
            <p>Text</p>
            <DropDownIcon />
          </div>
        </div>
        <div className="card-content">
          <div className="card-content_image">
            <p className="title">Image</p>
            <div className="accordion-container">
              {task.images.map((image, index) => (
                <div key={index} className="accordion-block">
                  <div className="accordion-trigger" onClick={toggleAccordion}>
                    <p>{image}</p>
                    <DropDownIcon />
                  </div>
                  <div className="accordion-text">
                    <DropdownSelect
                      label="Proportions"
                      options={dimensionOptions}
                      value={dimensions[index]}
                      onChange={handleChangeDimension}
                      index={index}
                    />
                    <DropdownSelect
                      label="Flow"
                      options={flowOptions}
                      value={flows[index]}
                      onChange={handleChangeFlow}
                      index={index}
                    />
                    <div className="divider"></div>
                    <div className="image-refs-block">
                      <p>Image refs</p>
                      <div className="image-refs">
                        {imageRefs[index].map((item, refIndex) => (
                          <div key={refIndex} className="image">
                            <div
                              className="delete"
                              onClick={() => handleDeleteImage(index, refIndex)}
                            >
                              <DeleteIcon />
                            </div>
                            <img src={item} alt="" />
                          </div>
                        ))}
                        <div
                          className="image-ref"
                          onClick={() => handleAddImage(index)}
                        >
                          <AddImageIcon />
                        </div>
                      </div>
                    </div>
                    <div className="divider"></div>
                    <div className="manual-text">
                      <input
                        type="text"
                        placeholder="Manual prompts"
                        value={manualPrompts[index]}
                        onChange={(event) =>
                          handleChangeManualPrompts(index, event)
                        }
                      />
                    </div>
                    <div className="inputValue">
                      <p>{manualPrompts[index]}</p>
                      {manualPrompts[index] && <ArrowOutwardIcon />}
                    </div>
                    <div className="manual-text">
                      <input
                        type="number"
                        placeholder="Generations per ref (number)"
                        value={generationsPerRef[index]}
                        onChange={(event) =>
                          handleChangeGenerationsPerRef(index, event)
                        }
                      />
                    </div>
                    <div className="inputValue">
                      <p>{generationsPerRef[index]}</p>
                      {generationsPerRef[index] && <ArrowOutwardIcon />}
                    </div>
                    <DropdownSelect
                      label="Styles"
                      options={styleOptions}
                      value={styles[index]}
                      onChange={handleChangeStyles}
                      index={index}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            console.log({
              dimensions,
              flows,
              styles,
              imageRefs,
              manualPrompts,
              generationsPerRef,
            });
            updateData();
          }}
        >
          Generate
        </button>
      </div>
    </div>
  );
};

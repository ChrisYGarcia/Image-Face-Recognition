import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, box1, box2 }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img id="inputimage" alt="" src={imageUrl} width="500px" heigh="auto" />
        <div
          className="bounding-box1"
          style={{
            top: box1.topRow,
            right: box1.rightCol,
            bottom: box1.bottomRow,
            left: box1.leftCol
          }}
        />
        <div
          className="bounding-box2"
          style={{
            top: box2.topRow,
            right: box2.rightCol,
            bottom: box2.bottomRow,
            left: box2.leftCol
          }}
        />
      </div>
    </div>
  );
};

export default FaceRecognition;

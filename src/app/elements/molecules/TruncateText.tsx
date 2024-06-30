import React, { useState } from "react";

const TruncatedText = ({ text, wordLimit, isExpanded }) => {

  const words = text.split(" ");
  const isTruncatable = words.length > wordLimit;

  const displayText = isExpanded ? text : words.slice(0, wordLimit).join(" ") + (isTruncatable ? "" : "");

  return (
    <div>
      <p>{displayText}</p>
      {isTruncatable && (
        <div style={{color: 'grey'}}>
          {isExpanded ? "show less" : "...more"}
        </div>
      )}
    </div>
  );
};

export default TruncatedText;

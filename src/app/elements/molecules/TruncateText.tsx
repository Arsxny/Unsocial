import React, { useState } from "react";

const TruncatedText = ({ text, wordLimit, isExpanded }) => {

  const words = text.split(" ");
  const isTruncatable = words.length > wordLimit;

  const displayText = isExpanded ? text : words.slice(0, wordLimit).join(" ") + (isTruncatable ? "" : "");

  return (
    <div>
      <p>{displayText}</p>
      {isTruncatable && (
        <button style={{color: 'grey'}}>
          {isExpanded ? "show less" : "...more"}
        </button>
      )}
    </div>
  );
};

export default TruncatedText;

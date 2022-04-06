import React from "react";

function Iframe({ title, src }) {
  return (
    <div>
      <iframe
        title={title}
        src={src}
        width="480"
        height="480"
        frameBorder="0"
        className="giphy-embed"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default Iframe;

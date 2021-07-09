import React from 'react';

function LoadingScreen() {
  return (
    <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '200px', height: '200px'}}>
      <p style={{textAlign: 'center', fontSize: '20px', fontWeight: '500'}}>Loading...</p>
      <svg
        version="1.1" id="L6"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 100 100"
        enableBackground="new 0 0 100 100"
        xmlSpace="preserve"
        data-testid="spinner-animation"
      >
        <rect fill="#4481c3" stroke="#fff" strokeWidth="4" x="25" y="25" width="50" height="50">
          <animateTransform
            attributeName="transform"
            dur="0.5s"
            from="0 50 50"
            to="180 50 50"
            type="rotate"
            id="strokeBox"
            attributeType="XML"
            begin="rectBox.end"
          />
        </rect>
        <rect x="27" y="27" fill="#fff" width="46" height="50">
          <animate
            attributeName="height"
            dur="1.3s"
            attributeType="XML"
            from="50"
            to="0"
            id="rectBox"
            fill="freeze"
            begin="0s;strokeBox.end"
          />
        </rect>
      </svg>
    </div>
  );
}

export default LoadingScreen;

import React, { useLayoutEffect, useState } from 'react';
import './styles.css';

export default function WhiteBoard() {


  const [sizeBoard, setSizeBoard] = useState({ width: 0, height: 0 });
  let mouseIsDrawing = false;

  function startDrawing() {
    mouseIsDrawing = true;
  }

  function finishDrawing() {
    mouseIsDrawing = false;
  }

  //Utilizado para alterar o tamanho do canvas/quadro
  useLayoutEffect(() => {
    function updateSize() {
      setSizeBoard({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  function draw(e) {
    //Verifica se o botao esquerdo está pressionado
    if (!mouseIsDrawing) return;

    // console.log(e)

    let { clientX: x, clientY: y } = e.nativeEvent;

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.fillRect(x, y, 5, 5);
  }

  return (
    <div>
      <canvas width={sizeBoard.width} height={sizeBoard.height} id='canvas' style={{ width: '100%', height: '100vh' }}>
      </canvas >

      <div className="root-board" onMouseDown={startDrawing} onMouseUp={finishDrawing} onMouseMove={draw}>
      </div>

    </div>

  );
}
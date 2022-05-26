import React, { useEffect, useLayoutEffect, useState } from 'react';
import './styles.css';


let stackCanvas = [];

export default function WhiteBoard() {
  const [sizeBoard, setSizeBoard] = useState({ width: 0, height: 0 });

  let mouseIsDrawing = false;

  function startDrawing() {
    mouseIsDrawing = true;
    addCopyOnStack();
  }

  function finishDrawing() {
    mouseIsDrawing = false;
  }

  function addCopyOnStack() {
    var sourceCanvas = document.getElementById("canvas");
    var sourceImageData = sourceCanvas.toDataURL("image/png");

    //Salva a imagem na pilha no formato base64
    stackCanvas.push(sourceImageData);
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

    let { clientX: x, clientY: y } = e.nativeEvent;

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.fillRect(x, y, 5, 5);
  }

  function roolback() {
    //Carrega a imagem do quadro anterior
    let previousImage = new Image();
    previousImage.src = stackCanvas.pop();

    //Quando a imagem for carregada
    previousImage.onload = function () {
      var canvas = document.getElementById("canvas");
      var ctx = canvas.getContext("2d");

      //Limpa o canvas e desenha a imagem
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(previousImage, 0, 0, canvas.width, canvas.height);
    }
  }



  useEffect(() => {
    function keyDown(e) {
      if (e.ctrlKey && e.key === 'z') {
        roolback();
      }
    }

    document.addEventListener('keydown', keyDown);
    return () => window.removeEventListener('keydown', keyDown);
  }, [])



  return (
    <div>
      <canvas width={sizeBoard.width} height={sizeBoard.height} id='canvas' style={{ width: '100%', height: '100vh' }}>
      </canvas >

      <div className="root-board" onMouseDown={startDrawing} onMouseUp={finishDrawing} onMouseMove={draw}>
      </div>

    </div>

  );
}

import StartApplication from "./App/App";
import {Engine} from "./Core/Engine";

var GameEngineInstance: Engine  = null;

window.onload = () => {
    let viewPort  = document.getElementById("viewport");

    viewPort.setAttribute("height", window.innerHeight.toString());
    viewPort.setAttribute("width", window.innerWidth.toString());
    GameEngineInstance = StartApplication();
};

window.onresize = () => {
    GameEngineInstance.resize();
}


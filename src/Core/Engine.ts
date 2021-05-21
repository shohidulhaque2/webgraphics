
import {WebGLUtilities} from "./WebGL/WebGL";
//https://www.youtube.com/watch?v=HQbzO0xDuX8&list=PLv8Ddw9K0JPiTHLMQw31Yh4qyTAcHRnJx&index=3
//27 minutes
//https://webglfundamentals.org/webgl/lessons/webgl-animation.html
export class Engine{
    private _count: number = 0;
    private _canvas: HTMLCanvasElement;

    public constructor() {
    }

    public start(): void {
        this._canvas = WebGLUtilities.initialize("viewport");
        WebGLUtilities.WebGLRenderingContext.clearColor(0, 0, 0, 1);
        this.loop();
    }

    private loop(): void{
        WebGLUtilities.WebGLRenderingContext.clear(WebGLRenderingContext.COLOR_BUFFER_BIT);
       requestAnimationFrame(this.loop.bind(this));
    }

    public resize(): void {
        if(this._canvas !== undefined){
            this._canvas.width = window.innerWidth;
            this._canvas.height = window.innerHeight;
        }

    }
}



import {WebGLUtilities} from "./WebGL/WebGL";
import {Shader} from "./WebGL/Shader";
//https://www.youtube.com/watch?v=HQbzO0xDuX8&list=PLv8Ddw9K0JPiTHLMQw31Yh4qyTAcHRnJx&index=3
//https://webglfundamentals.org/webgl/lessons/webgl-animation.html
export class Engine{
    private _count: number = 0;
    private _canvas: HTMLCanvasElement;
    private _shader: Shader;
    private _instant: number = 0;
    private readonly convertToSeconds = (instant: number ) => instant * 0.001

    public constructor() {
    }

    public start(): void {
        this._canvas = WebGLUtilities.initialize("viewport");
        WebGLUtilities.WebGLRenderingContext.clearColor(60, 60, 60, 1);
        this.loadShaders();
        this._shader.use();
        this.loop(0);
    }


    private loop(instant: number): void{
        this._count += 1;
        instant = this.convertToSeconds(instant);
        const delta = instant - this._instant;
        if(delta >= 1){
            WebGLUtilities.WebGLRenderingContext.clearColor(Math.random(), Math.random(), Math.random(), 1);
            WebGLUtilities.WebGLRenderingContext.clear(WebGLUtilities.WebGLRenderingContext.COLOR_BUFFER_BIT);
            this._instant = instant;
        }

       requestAnimationFrame(this.loop.bind(this));
    }

    public resize(): void {
        if(this._canvas !== undefined){
            this._canvas.width = window.innerWidth;
            this._canvas.height = window.innerHeight;
        }
    }

    private loadShaders(): void {
        const vertexShaderSource = `
            attribute vec3 a_position;
            void main(){
                gl_Position = vec4(a_position, 1.0);
            }
        `;

        const fragmentShaderSource = `
            precision mediump float;
            void main(){
                gl_FragColor = vec4(1.0);
            }
        `;

        this._shader = new Shader("simple_shader", vertexShaderSource, fragmentShaderSource);

    }
}


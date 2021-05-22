
import {WebGLUtilities} from "./WebGL/WebGL";
import {Shader} from "./WebGL/Shader";
//https://webglfundamentals.org/webgl/lessons/webgl-animation.html
//https://www.youtube.com/watch?v=KFiXhV57jsU&list=PLv8Ddw9K0JPiTHLMQw31Yh4qyTAcHRnJx&index=4
export class Engine{
    private _count: number = 0;
    private _canvas: HTMLCanvasElement;
    private _shader: Shader;
    private _buffer: WebGLBuffer;
    private _instant: number = 0;
    private readonly convertToSeconds = (instant: number ) => instant * 0.001

    public constructor() {
    }

    public start(): void {
        this._canvas = WebGLUtilities.initialize("viewport");
        WebGLUtilities.WebGLRenderingContext.clearColor(60, 60, 60, 1);
        this.loadShaders();
        this._shader.use();
        this.createBuffer();
        this.resize();
        this.loop(0);
    }

    private loop(instant: number): void{
        this._count += 1;
        instant = this.convertToSeconds(instant);
        const delta = instant - this._instant;
        if(delta >= 1){
            WebGLUtilities.WebGLRenderingContext.clearColor(Math.random(), Math.random(), Math.random(), 1);
            WebGLUtilities.WebGLRenderingContext.clear(WebGLUtilities.WebGLRenderingContext.COLOR_BUFFER_BIT)
            //=============================
            //tell opengl how to map array buffer to vertex shader
            WebGLUtilities.WebGLRenderingContext.bindBuffer(WebGLUtilities.WebGLRenderingContext.ARRAY_BUFFER, this._buffer);
            WebGLUtilities.WebGLRenderingContext.vertexAttribPointer(0, 3, WebGLUtilities.WebGLRenderingContext.FLOAT, false, 0, 0);
            WebGLUtilities.WebGLRenderingContext.enableVertexAttribArray(0);
            //=============================
            WebGLUtilities.WebGLRenderingContext.drawArrays(WebGLUtilities.WebGLRenderingContext.TRIANGLES, 0, 3);
            WebGLUtilities.WebGLRenderingContext.bindBuffer(WebGLUtilities.WebGLRenderingContext.ARRAY_BUFFER, undefined);
            WebGLUtilities.WebGLRenderingContext.disableVertexAttribArray(0);
            this._instant = instant;
        }
       requestAnimationFrame(this.loop.bind(this));
    }

    public resize(): void {
        if(this._canvas !== undefined){
            this._canvas.width = window.innerWidth;
            this._canvas.height = window.innerHeight;
            WebGLUtilities.WebGLRenderingContext.viewport(0, 0, this._canvas.width, this._canvas.height);
        }
    }

    private createBuffer():void {
        this._buffer = WebGLUtilities.WebGLRenderingContext.createBuffer();
        let vertices = [
            0, 0, 0,
            0, 0.5, 0,
            0.5, 0.5, 0
        ];
        WebGLUtilities.WebGLRenderingContext.bindBuffer(WebGLUtilities.WebGLRenderingContext.ARRAY_BUFFER, this._buffer);
        //WebGLUtilities.WebGLRenderingContext.vertexAttribPointer(0, 3, WebGLUtilities.WebGLRenderingContext.FLOAT, false, 0, 0);
        //WebGLUtilities.WebGLRenderingContext.enableVertexAttribArray(0);
        WebGLUtilities.WebGLRenderingContext.bufferData(WebGLUtilities.WebGLRenderingContext.ARRAY_BUFFER, new Float32Array(vertices), WebGLUtilities.WebGLRenderingContext.STATIC_DRAW);
        WebGLUtilities.WebGLRenderingContext.bindBuffer(WebGLUtilities.WebGLRenderingContext.ARRAY_BUFFER, undefined);
        //WebGLUtilities.WebGLRenderingContext.disableVertexAttribArray(0);
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


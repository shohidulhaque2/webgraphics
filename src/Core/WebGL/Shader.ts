import {WebGLUtilities} from "./WebGL";

export class Shader {
    private _name: string;
    private _program: WebGLProgram;

    public constructor(name: string, vertexSource: string, fragmentSource: string) {
        this._name = name;
        let vertextShader = this.loadShader(vertexSource, WebGLRenderingContext.VERTEX_SHADER);
        let fragmentShader = this.loadShader(fragmentSource, WebGLRenderingContext.FRAGMENT_SHADER);
        this._program = this.createProgram(vertextShader, fragmentShader);
    }

    public get name(): string {
        return this._name;
    }

    private loadShader(source: string, shaderType: number): WebGLShader {
        let shader: WebGLShader = WebGLUtilities.WebGLRenderingContext.createShader(shaderType);
        WebGLUtilities.WebGLRenderingContext.shaderSource(shader, source);
        WebGLUtilities.WebGLRenderingContext.compileShader(shader);
        let error  = WebGLUtilities.WebGLRenderingContext.getShaderInfoLog(shader);
        if(error !== undefined){
            throw new Error("error compiling  " +  this._name + " shader: " + error);
        }
        return shader;
    }

    private createProgram(vertextShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram {
        this._program = WebGLUtilities.WebGLRenderingContext.createProgram();
        WebGLUtilities.WebGLRenderingContext.attachShader(this._program , vertextShader);
        WebGLUtilities.WebGLRenderingContext.attachShader(this._program , fragmentShader);
        let error = WebGLUtilities.WebGLRenderingContext.getProgramInfoLog(this._program);
        if(error !== undefined){
            throw new Error("error linking shader " + this._name + ": " + error);
        }
        return this._program;
    }

}

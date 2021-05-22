
export class WebGLUtilities {
    static WebGLRenderingContext: WebGLRenderingContext;
    public static initialize(elementId?: string): HTMLCanvasElement {
        let canvas: HTMLCanvasElement;
        if (elementId !== undefined) {
            canvas = document.getElementById(elementId) as HTMLCanvasElement;
            if (canvas === undefined) {
                throw new Error("cannot find canvas element named: " + elementId);
            }
        } else {
            canvas = document.createElement("canvas") as HTMLCanvasElement;
            document.body.appendChild(canvas);
        }

        WebGLUtilities.WebGLRenderingContext = canvas.getContext("webgl");
        if (WebGLRenderingContext === undefined) {
            throw new Error("Unable to initialize WebGL.");
        }
        return canvas;
    }
}


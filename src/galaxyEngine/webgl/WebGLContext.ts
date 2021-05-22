import { LayaGL } from "../layagl/LayaGL";



export class WebGLContext {

    private static _useProgram: any = null;
    private static _depthTest: boolean = true;
    private static _depthMask: boolean = true;
    private static _depthFunc: number;
    private static _blend: boolean = false;
    private static _blendEquation: number;
    private static _blendEquationRGB: number;
    private static _blendEquationAlpha: number;
    private static __sFactor: number;
    private static __dFactor: number;
    private static _sFactorRGB: number;
    private static _dFactorRGB: number;
    private static _sFactorAlpha: number;
    private static _dFactorAlpha: number;
    private static _cullFace: boolean = false;
    private static _frontFace: number;
    private static _activedTextureID: number;

    private static _glTextureIDs: any[];
    private static _activeTextures: any[] = new Array(8);
    
    static mainContext: WebGLRenderingContext|null = null;


    static __init__(): void {
        var gl: WebGLRenderingContext = LayaGL.instance;
        WebGLContext._depthFunc = gl.LESS;
        WebGLContext._blendEquation = gl.FUNC_ADD;
        WebGLContext._blendEquationRGB = gl.FUNC_ADD;
        WebGLContext._blendEquationAlpha = gl.FUNC_ADD;
        WebGLContext._sFactor = gl.ONE;
        WebGLContext._dFactor = gl.ZERO;
        WebGLContext._sFactorAlpha = gl.ONE;
        WebGLContext._dFactorAlpha = gl.ZERO;
        WebGLContext._activedTextureID = gl.TEXTURE0;//默认激活纹理区为0
        WebGLContext._glTextureIDs = [gl.TEXTURE0, gl.TEXTURE1, gl.TEXTURE2, gl.TEXTURE3, gl.TEXTURE4, gl.TEXTURE5, gl.TEXTURE6, gl.TEXTURE7];
    }

    static get _sFactor() {
        return WebGLContext.__sFactor;
    }

    static set _sFactor(value) {
        WebGLContext.__sFactor = value;
    }

    static get _dFactor() {
        return WebGLContext.__dFactor;
    }

    static set _dFactor(value) {
        WebGLContext.__dFactor = value;
    }

    static useProgram(gl: WebGLRenderingContext, program: any): boolean {
        if (WebGLContext._useProgram === program)
            return false;
        gl.useProgram(program);
        WebGLContext._useProgram = program;
        return true;
    }


    static setDepthTest(gl: WebGLRenderingContext, value: boolean): void {
        value !== WebGLContext._depthTest && (WebGLContext._depthTest = value, value ? gl.enable(gl.DEPTH_TEST) : gl.disable(gl.DEPTH_TEST));
    }

    static setDepthMask(gl: WebGLRenderingContext, value: boolean): void {
        value !== WebGLContext._depthMask && (WebGLContext._depthMask = value, gl.depthMask(value));
    }

    static setDepthFunc(gl: WebGLRenderingContext, value: number): void {
        value !== WebGLContext._depthFunc && (WebGLContext._depthFunc = value, gl.depthFunc(value));
    }

    static setBlend(gl: WebGLRenderingContext, value: boolean): void {
        value !== WebGLContext._blend && (WebGLContext._blend = value, value ? gl.enable(gl.BLEND) : gl.disable(gl.BLEND));
    }

    static setBlendEquation(gl: WebGLRenderingContext, blendEquation: number): void {
        if (blendEquation !== WebGLContext._blendEquation) {
            WebGLContext._blendEquation = blendEquation;
            WebGLContext._blendEquationRGB = WebGLContext._blendEquationAlpha = 0;
            gl.blendEquation(blendEquation);
        }
    }

    static setBlendEquationSeparate(gl: WebGLRenderingContext, blendEquationRGB: number, blendEquationAlpha: number): void {
        if (blendEquationRGB !== WebGLContext._blendEquationRGB || blendEquationAlpha !== WebGLContext._blendEquationAlpha) {
            WebGLContext._blendEquationRGB = blendEquationRGB;
            WebGLContext._blendEquationAlpha = blendEquationAlpha;
            WebGLContext._blendEquation = 0;
            gl.blendEquationSeparate(blendEquationRGB, blendEquationAlpha);
        }
    }

    static setBlendFunc(gl: WebGLRenderingContext, sFactor: number, dFactor: number): void {
        if (sFactor !== WebGLContext._sFactor || dFactor !== WebGLContext._dFactor) {
            WebGLContext._sFactor = sFactor;
            WebGLContext._dFactor = dFactor;
            WebGLContext._sFactorRGB = 0;
            WebGLContext._dFactorRGB = 0;
            WebGLContext._sFactorAlpha = 0;
            WebGLContext._dFactorAlpha = 0;
            gl.blendFunc(sFactor, dFactor);
        }
    }

    static setBlendFuncSeperate(gl: WebGLRenderingContext, srcRGB: number, dstRGB: number, srcAlpha: number, dstAlpha: number): void {
        if (srcRGB !== WebGLContext._sFactorRGB || dstRGB !== WebGLContext._dFactorRGB || srcAlpha !== WebGLContext._sFactorAlpha || dstAlpha !== WebGLContext._dFactorAlpha) {
            WebGLContext._sFactorRGB = srcRGB;
            WebGLContext._dFactorRGB = dstRGB;
            WebGLContext._sFactorAlpha = srcAlpha;
            WebGLContext._dFactorAlpha = dstAlpha;
            WebGLContext._sFactor = 0;
            WebGLContext._dFactor = 0;
            gl.blendFuncSeparate(srcRGB, dstRGB, srcAlpha, dstAlpha);
        }
    }

    static setCullFace(gl: WebGLRenderingContext, value: boolean): void {
        value !== WebGLContext._cullFace && (WebGLContext._cullFace = value, value ? gl.enable(gl.CULL_FACE) : gl.disable(gl.CULL_FACE));
    }

    static setFrontFace(gl: WebGLRenderingContext, value: number): void {
        value !== WebGLContext._frontFace && (WebGLContext._frontFace = value, gl.frontFace(value));
    }

    static activeTexture(gl: WebGLRenderingContext, textureID: number): void {
        if (WebGLContext._activedTextureID !== textureID) {
            gl.activeTexture(textureID);
            WebGLContext._activedTextureID = textureID;
        }
    }

    static bindTexture(gl: WebGLRenderingContext, target: any, texture: any): void {
        if (WebGLContext._activeTextures[WebGLContext._activedTextureID - gl.TEXTURE0] !== texture) {
            gl.bindTexture(target, texture);
            WebGLContext._activeTextures[WebGLContext._activedTextureID - gl.TEXTURE0] = texture;
        }
    }
}






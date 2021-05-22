import { LayaGL } from "../layagl/LayaGL";


export class BufferStateBase {
    static _curBindedBufferState: BufferStateBase|null;

    private _nativeVertexArrayObject: any;
    protected _bindedIndexBuffer: Buffer|null = null;

    constructor() {
        this._nativeVertexArrayObject = LayaGL.layaGPUInstance.createVertexArray();
    }

    bind(): void {
        if (BufferStateBase._curBindedBufferState !== this) {
            LayaGL.layaGPUInstance.bindVertexArray(this._nativeVertexArrayObject);
            BufferStateBase._curBindedBufferState = this;
        }
    }

    unBind(): void {
        if (BufferStateBase._curBindedBufferState === this) {
            LayaGL.layaGPUInstance.bindVertexArray(null);
            BufferStateBase._curBindedBufferState = null;
        } else {
            throw "BufferState: must call bind() function first.";
        }
    }

    destroy(): void {
        LayaGL.layaGPUInstance.deleteVertexArray(this._nativeVertexArrayObject);
    }
}



export class SystemUtils {
    static _maxTextureCount: number;
    static _maxTextureSize: number;
    static _shaderCapailityLevel: number;

    /**
     * 图形设备支持的最大纹理数量。
     */
     static get maxTextureCount(): number {
        return this._maxTextureCount;
    }

    /**
     * 图形设备支持的最大纹理尺寸。
     */
    static get maxTextureSize(): number {
        return this._maxTextureSize;
    }

    /**
     * 图形设备着色器的大致能力等级,类似于DirectX的shader model概念。
     */
    static get shaderCapailityLevel(): number {
        return this._shaderCapailityLevel;
    }

}
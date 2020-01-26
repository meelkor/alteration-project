import { UVMapping, ClampToEdgeWrapping, NearestFilter, CanvasTexture, Texture } from 'three';

import { ResourceInfo } from '../resources/resourceIndex';

export class ThreeSprite {
    public readonly texture: CanvasTexture;

    // @ts-ignore
    private mapWidth: number;
    // @ts-ignore
    private mapHeight: number;
    // @ts-ignore
    private states: string[];

    public get width(): number {
        return this.mapWidth / this.states.length;
    }

    public get height(): number {
        return this.mapHeight;
    }

    constructor(private resInfo: ResourceInfo) {
        this.mapWidth = resInfo.img.naturalWidth;
        this.mapHeight = resInfo.img.naturalHeight;
        this.states = resInfo.states;

        this.texture = new CanvasTexture(
            resInfo.img as any,
            UVMapping,
            ClampToEdgeWrapping,
            ClampToEdgeWrapping,
            NearestFilter,
            NearestFilter,
        );
    }

    public setState(_state: string) {
        // TODO: change texture params
    }

    public getTexture(): Texture {
        return this.texture;
    }

    /**
     * Create new Texture instance for this sprite.
     */
    public clone(): ThreeSprite {
        return new ThreeSprite(this.resInfo);
    }
}

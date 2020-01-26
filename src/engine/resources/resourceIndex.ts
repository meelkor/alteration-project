import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import join from 'url-join';

import { Injectable } from '@alt/common';

import { LibraryIndex } from './libraryIndex';

export class ResourceIndex extends Injectable {
    private index = new Map<string, ResourceInfo>();

    public async init(jsonUrl: string): Promise<void> {
        const index: LibraryIndex = await (await fetch(jsonUrl)).json();
        const base = jsonUrl.slice(0, jsonUrl.lastIndexOf('/'));

        await from(index.resources).pipe(
            mergeMap(async res => {
                 const img = await new Promise<HTMLImageElement>((resolve, reject) => {
                    const image = new Image();

                    image.onload = () => resolve(image);
                    image.onerror = () => reject();

                    image.src = join(base, res.path);
                });

                this.index.set(res.name, {
                    img,
                    states: res.states,
                });
            }),
        ).toPromise();
    }

    public getResource(asset: string): ResourceInfo {
        return this.index.get(asset);
    }
}

export interface ResourceInfo {
    img: HTMLImageElement;
    states: string[];
}
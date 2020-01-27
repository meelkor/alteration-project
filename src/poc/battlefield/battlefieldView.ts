import { View } from '@alt/engine/view';
import { GameMap } from '@alt/game';

import { Sprite } from '@alt/game/piece/sprite';
import { TilePos } from '@alt/engine/projection/tile';
import { EventHandler } from '@alt/engine/events';

import { OverworldMapComponent } from './components/overworldMapComponent';
import { SpriteComponent } from './components/spriteComponent';

export class OverworldView extends View {
    private eventHandler = this.inject(EventHandler);

    public async createOverworld(map: GameMap): Promise<void> {
        const mapComponent = this.provide(OverworldMapComponent);
        mapComponent.setMap(map);
        this.bindComponent(mapComponent);

        this.makePiece(new TilePos(2, 32), 1);
        this.makePiece(new TilePos(10 - 3 - 1, 10 - 4), 1);
        this.makePiece(new TilePos(10 - 3, 10 - 3), 1);
        this.makePiece(new TilePos(10 - 2, 10 - 2), 1);
        this.makePiece(new TilePos(10 - 1, 10 - 1), 1);
        this.makePiece(new TilePos(10 + 3 + 1, 10 + 4), 1);
        this.makePiece(new TilePos(1 + 10 - 3 - 1, 10 - 4), 1);
        this.makePiece(new TilePos(1 + 10 - 3, 10 - 3), 1);
        this.makePiece(new TilePos(1 + 10 - 2, 10 - 2), 1);
        this.makePiece(new TilePos(1 + 10 - 1, 10 - 1), 1);
        this.makePiece(new TilePos(1 + 10 + 3 + 1, 10 + 4), 1);
        this.makePiece(new TilePos(2, 2), 1);

        this.eventHandler.click$.subscribe(({ tile }) => {

        });
    }

    private makePiece(pos: TilePos, light: number): void {
        const piece = new Sprite();

        piece.asset = 'bitch';
        piece.state = 'idle';
        piece.light = light;
        piece.position = pos.add({ x: 0.3, y: 0.3 });

        const pieceComponent = this.instantiate(SpriteComponent);
        pieceComponent.setPiece(piece);
        this.bindComponent(pieceComponent);
    }
}

export default class MapManager {
    constructor(scene) {
        this.scene = scene;
    }

    createMap() {
        const map = this.scene.make.tilemap({ key: 'portfolio_map' });

        const tileset1 = map.addTilesetImage('tilemap', 'tiles_main');
        const tileset2 = map.addTilesetImage('tilemap_Castel', 'tiles_castel');
        const tileset3 = map.addTilesetImage('tilemap2', 'tiles_extra');
        const allTilesets = [tileset1, tileset2, tileset3];

        this.scene.groundLayer = map.createLayer('Ground', allTilesets, 0, 0);
        this.scene.pondLayer = map.createLayer('Pond', allTilesets, 0, 0);
        this.scene.treesLayer = map.createLayer('Trees', allTilesets, 0, 0);
        this.scene.buildingsLayer = map.createLayer('Buildings', allTilesets, 0, 0);
        this.scene.buildingCompsLayer = map.createLayer('Buildiong_Components', allTilesets, 0, 0);
        this.scene.objectsLayer = map.createLayer('Objects', allTilesets, 0, 0);

        // Define obstacles
        const solidLayers = [
            this.scene.treesLayer, 
            this.scene.buildingsLayer, 
            this.scene.buildingCompsLayer, 
            this.scene.objectsLayer, 
            this.scene.pondLayer
        ];

        solidLayers.forEach(layer => {
            if (layer) layer.setCollisionByExclusion([-1]);
        });

        this.scene.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        return { map, solidLayers };
    }
}
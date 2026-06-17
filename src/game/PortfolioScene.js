import Phaser from 'phaser';
import MapManager from './MapManager';
import Player from './entities/Player';
import NPC from './entities/NPC';

export default class PortfolioScene extends Phaser.Scene {
    constructor() {
        super('PortfolioScene');
    }

    preload() {
        this.load.tilemapTiledJSON('portfolio_map', 'maps/portfolio_map.json');
        this.load.image('tiles_main', 'assets/map_tiles/tilemap.png');
        this.load.image('tiles_castel', 'assets/map_tiles/tilemap_Castel.png');
        this.load.image('tiles_extra', 'assets/map_tiles/tilemap2.png');

        this.load.spritesheet('main_char', 'assets/sprites/main_char.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('scientist', 'assets/sprites/scientist.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('white_queen', 'assets/sprites/white_queen.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('red_sum', 'assets/sprites/red_sum.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('black_sum', 'assets/sprites/black_sum.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('demon', 'assets/sprites/demon.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('wolf', 'assets/sprites/wolf.png', { frameWidth: 48, frameHeight: 48 });
    }

    create() {
        const mapManager = new MapManager(this);
        const { map, solidLayers } = mapManager.createMap();

        this.createAnimations('main_char', 'walk');
        this.createAnimations('scientist', 'sci');
        this.createAnimations('white_queen', 'wqeen');
        this.createAnimations('demon', 'demon');
        this.createAnimations('red_sum', 'redsum');
        this.createAnimations('black_sum', 'blacksim'); 
        this.createAnimations('wolf', 'wolf');

        this.player = new Player(this, 400, 300, 'main_char');
        this.scientist = new NPC(this, 500, 400, 'scientist', 'sci');
        this.white_queen = new NPC(this, 1000, 400, 'white_queen', 'wqeen');
        this.white_queen1 = new NPC(this, 70, 150, 'white_queen', 'wqeen');
        this.demon = new NPC(this, 750, 200, 'demon', 'demon');
        this.demon1 = new NPC(this, 50, 200, 'demon', 'demon');
        this.red_sum = new NPC(this, 350, 700, 'red_sum', 'redsum');
        this.red_sum1 = new NPC(this, 1020, 800, 'red_sum', 'redsum');
        this.black_sum = new NPC(this, 950, 160, 'black_sum', 'blacksim');
        this.wolf = new NPC(this, 600, 500, 'wolf', 'wolf');

        solidLayers.forEach(layer => {
            this.physics.add.collider(this.player, layer);
            this.physics.add.collider(this.scientist, layer);
            this.physics.add.collider(this.wolf, layer);
            this.physics.add.collider(this.white_queen, layer);
            this.physics.add.collider(this.demon, layer);
            this.physics.add.collider(this.red_sum, layer);
            this.physics.add.collider(this.black_sum, layer);
            this.physics.add.collider(this.demon1, layer);
            this.physics.add.collider(this.white_queen1, layer);
            this.physics.add.collider(this.red_sum1, layer);
        });

        this.physics.add.collider(this.player, this.scientist);
        this.physics.add.collider(this.player, this.wolf);
        this.physics.add.collider(this.player, this.white_queen);
        this.physics.add.collider(this.player, this.demon);
        this.physics.add.collider(this.player, this.red_sum);
        this.physics.add.collider(this.player, this.black_sum);
        

        // --- THE VISUAL PROMPT ---
        // Create a hidden text bubble that we will move above the player later
        this.interactPrompt = this.add.text(0, 0, '[ PRESS ENTER ]', { 
            fontSize: '10px', backgroundColor: '#000000', color: '#ffffff', 
            padding: { x: 4, y: 2 }, fontFamily: 'monospace' 
        }).setOrigin(0.5).setDepth(100).setVisible(false);

        this.actionKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        // --- GROUP THE INTERACTION ZONES ---
        // Instead of adding logic to each zone, we put them in a group to check them all at once later
        this.interactionZones = this.physics.add.staticGroup();
        const interactionLayer = map.getObjectLayer('InteractionZones');
        
        if (interactionLayer && interactionLayer.objects) {
            interactionLayer.objects.forEach(obj => {
                const centerX = obj.x + (obj.width / 2);
                const centerY = obj.y + (obj.height / 2);
                
                const zone = this.add.zone(centerX, centerY, obj.width, obj.height);
                zone.name = obj.name; 
                this.interactionZones.add(zone);
            });
        }

        // --- DRAW TEXT FROM 'Names' LAYER ---
        const namesLayer = map.getObjectLayer('Names');
        
        if (namesLayer && namesLayer.objects) {
            namesLayer.objects.forEach(obj => {
                if (obj.text) {
                    this.add.text(obj.x, obj.y, obj.text.text, {
                        fontSize: `${obj.text.pixelsize || 18}px`,
                        fontFamily: obj.text.fontfamily || 'monospace',
                        color: obj.text.color || '#ffffff',
                        backgroundColor: 'rgba(0, 0, 0, 0.1)', 
                        padding: { x: 4, y: 2 }
                    })
                    .setOrigin(0, 0)
                    .setResolution(2)
                    .setDepth(50);
                }
            });
        }

        // --- THE CINEMATIC INTRO ---
        // Lock player controls initially
        this.controlsEnabled = false;

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.setZoom(2);
        
        // Start camera in the middle of the map
        this.cameras.main.centerOn(map.widthInPixels / 2, map.heightInPixels / 2);

        // Smoothly pan the camera to the player over 2 seconds (2000ms)
        this.cameras.main.pan(this.player.x, this.player.y, 2000, 'Power2');

        // When the pan finishes, attach the camera, unlock controls, and show the intro modal!
        this.time.delayedCall(2000, () => {
            this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
            this.controlsEnabled = true;
            window.dispatchEvent(new CustomEvent('open-portfolio-modal', { detail: 'intro' }));
        });
    }

    createAnimations(spriteKey, prefix) {
        this.anims.create({ key: `${prefix}-down`, frames: this.anims.generateFrameNumbers(spriteKey, { start: 0, end: 2 }), frameRate: 8, repeat: -1 });
        this.anims.create({ key: `${prefix}-left`, frames: this.anims.generateFrameNumbers(spriteKey, { start: 12, end: 14 }), frameRate: 8, repeat: -1 });
        this.anims.create({ key: `${prefix}-right`, frames: this.anims.generateFrameNumbers(spriteKey, { start: 24, end: 26 }), frameRate: 8, repeat: -1 });
        this.anims.create({ key: `${prefix}-up`, frames: this.anims.generateFrameNumbers(spriteKey, { start: 36, end: 38 }), frameRate: 8, repeat: -1 });
    }

    update() {
        // Prevent player from moving during the camera intro
        if (!this.controlsEnabled || !this.player) return;

        // Run the player's movement logic
        this.player.update();

        // --- CHECK FOR ZONE OVERLAPS EVERY FRAME ---
        let isOverlapping = false;
        let currentZoneName = null;

        // Check if the player is touching ANY zone in our group
        this.physics.overlap(this.player, this.interactionZones, (player, zone) => {
            isOverlapping = true;
            currentZoneName = zone.name;
        });

        // If touching a zone, show the prompt above their head
        if (isOverlapping) {
            this.interactPrompt.setVisible(true);
            this.interactPrompt.setPosition(this.player.x, this.player.y - 30); // 30px above the player

            // If they press Enter, fire the React event!
            if (Phaser.Input.Keyboard.JustDown(this.actionKey)) {
                window.dispatchEvent(new CustomEvent('open-portfolio-modal', { detail: currentZoneName }));
            }
        } else {
            // Hide the prompt when they walk away
            this.interactPrompt.setVisible(false);
        }
    }
}
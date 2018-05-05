// const GameEngine = require( 'lance-gg/src/GameEngine' );
// const CannonPhysicsEngine = require( 'lance/physics/CannonPhysicsEngine' );
//
// const BB8 = require( './BB8' );

import GameEngine from "lance-gg/src/GameEngine";
import CannonPhysicsEngine from "lance-gg/src/physics/CannonPhysicsEngine";
import BB8 from "./BB8";

export default class TheGameEngine extends GameEngine {

    constructor( options ) {
        super( options );

        this.log = [];
        this.physicsEngine = new CannonPhysicsEngine( { gameEngine: this } );

        this.players = [];

        this.on( 'server__init', this.gameInit.bind( this ) );
    }

    start() {
        super.start();
    }

    // The Game engine step
    step( isReenact, t, dt, physicsOnly ) {
        super.step( isReenact, t, dt, physicsOnly );

        // todo update positions and stuff
    }

    registerClasses( serializer ) {
        serializer.registerClass( BB8 );
    }

    addPlayer( playerId, team ) {
        console.log( 'adding a new player ' + playerId );

        let player = new BB8( this, new Vec3( 0, 0, 0 ) );

        this.players.push( player );
    }

    removePlayer( playerId ) {
        console.log( `removing player ${playerId}` );

        let obj = this.world.queryObject( { playerId } );
        if ( obj ) {
            this.removeObjectFromWorld( obj.id );
        }
    }

    processInput( inputData, playerId ) {
        super.processInput( inputData, playerId );
        let playerObj = this.world.queryObject( { playerId } );
        if ( playerObj ) {

        }
    }

}

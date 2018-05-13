const _ = require( 'underscore' );
const EventEmitter = require( 'eventemitter4' );
const THREE = require( 'three/build/three' );
THREE.FileLoader = require( '../lib/FileLoader' );

export default class MapLoader {

    constructor( isServer ) {
        this.assignEmitter();
        this.loader = new THREE.FileLoader( THREE.DefaultLoadingManager );
        // this.loader.setPath( '/maps/' );
        this.mapsData = [];
        this.isServer = isServer;
    }

    loadMapData( name ) {
        let url = '/maps/' + name;
        if ( this.isServer) {
            url = `http://localhost:${process.env.PORT}/maps/${name}`;
        }
        this.loader.load(
            url,
            data => {
                let object = JSON.parse( data );
                if ( name !== undefined ) {
                    this.emit( name, object );
                    this.mapsData[ name ] = object;
                }
            }
        )
    }

    assignEmitter() {
        // extend the ResourceManager class with EventEmitter fields and methods
        _.extend( this, EventEmitter.prototype );
        // call the init method of the emitter to warm it up and apply the lube
        EventEmitter.prototype.init.call( this );
    }
};
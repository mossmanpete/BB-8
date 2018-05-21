import ClientEngine from "lance/ClientEngine";
import TheRenderer from "./TheRenderer";
import KeyboardControls from "./KeyboardControls";

const $ = require( 'jquery' );
const THREE = require( 'three/build/three' );
THREE.OrbitControls = require( '../lib/OrbitControls' );

export default class TheClientEngine extends ClientEngine {

    /**
     * @param gameEngine {TheGameEngine}
     * @param options {Object}
     */
    constructor ( gameEngine, options ) {
        /** @param TheRenderer {TheRenderer} */
        super( gameEngine, options, TheRenderer );

        this.gameEngine.on( 'client__preStep', this.preStep, this );
        this.gameEngine.on( 'client__postStep', this.postStep, this );
    }

    start () {
        super.start();

        if ( this.renderer.isReady ) {
            this.onRendererReady();
        } else {
            this.renderer.once( 'ready', this.onRendererReady, this );
        }

        this.networkMonitor.on( 'RTTUpdate', e => this.renderer.updateHUD( e ) );
    }

    connect () {
        return super.connect().then( () => {

            this.socket.on( 'disconnect', e => {
                console.log( 'disconnected' );
                let body = $( 'body' );
                body.addClass( 'disconnected' );
                body.removeClass( 'gameActive' );
                $( '#reconnect' ).prop( 'disabled', false );
            } );

            this.socket.on( 'metaDataUpdate', e => {
                console.log( 'metaDataUpdate', e );
                this.gameEngine.metaData = e;
                this.renderer.onMetaDataUpdate();
            } );
        } )
    }

    onRendererReady () {
        this.connect();

        this.controls = new KeyboardControls( this.renderer );

        $( '#joinGame' ).click( () => this.socket.emit( 'requestRestart' ) );
        $( '#reconnect' ).click( () => window.location.reload() );
    }

    preStep () {
        if ( this.controls ) {
            let input = this.controls.activeInput;

            if ( input.up ) {
                this.sendInput( 'up', { movement: true } );
            } else if ( input.down ) {
                this.sendInput( 'down', { movement: true } );
            } else if ( input.left ) {
                this.sendInput( 'left', { movement: true } );
            } else if ( input.right ) {
                this.sendInput( 'right', { movement: true } );
            } else if ( input.up && input.left ) {
                this.sendInput( 'upleft', { movement: true } );
            } else if ( input.up && input.right ) {
                this.sendInput( 'upright', { movement: true } );
            } else if ( input.down && input.left ) {
                this.sendInput( 'downleft', { movement: true } );
            } else if ( input.down && input.right ) {
                this.sendInput( 'downright', { movement: true } );
            }

        }
    }

    postStep ( clientEngine ) {

    }
}
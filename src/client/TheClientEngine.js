import ClientEngine from "lance/ClientEngine";
import TheRenderer from "./TheRenderer";
const $ = require( 'jquery' );

export default class TheClientEngine extends ClientEngine {

    constructor( gameEngine, options ) {
        super( gameEngine, options, TheRenderer );

        this.gameEngine.on( 'client__preStep', this.preStep, this );
        this.gameEngine.on( 'client__postStep', this.postStep, this );
    }

    start() {
        super.start();

        if ( this.renderer.isReady ) {
            this.onRendererReady();
        } else {
            this.renderer.once( 'ready', this.onRendererReady, this );
        }

        this.networkMonitor.on( 'RTTUpdate', e => {
            this.renderer.updateHUD( e );
        } );
    }

    connect() {
        return super.connect().then( _ => {

            this.socket.on( 'disconnect', e => {
                console.log( 'disconnected' );
                let body = $( 'body' );
                body.addClass( 'disconnected' );
                body.removeClass( 'gameActive' );
                $( '#reconnect' ).prop( 'disabled', true );
            } );

            this.socket.on( 'metaDataUpdate', e => {
                console.log( 'metaDataUpdate', e );
                this.gameEngine.metaData = e;
                this.renderer.onMetaDataUpdate();
            } );
        })
    }

    onRendererReady() {
        this.connect();

        this.controls = new KeyboardControls( this.renderer );


        $( '#joinGame' ).click( _ => {
            this.socket.emit( 'requestRestart' );
        });

        $( '#reconnect' ).click( _ => {
            window.location.reload();
        });
    }

    preStep() {
        if ( this.controls ) {
            if (this.controls.activeInput.up) {
                this.sendInput('up', { movement: true });
            }

            if (this.controls.activeInput.left) {
                this.sendInput('left', { movement: true });
            }

            if (this.controls.activeInput.right) {
                this.sendInput('right', { movement: true });
            }

            if (this.controls.activeInput.down) {
                this.sendInput('down', { movement: true });
            }
        }
    }

    postStep() {}
}
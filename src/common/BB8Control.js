let CANNON = null;

const FORWARD_IMPULSE = .45;
const MAX_VELOCITY = 25;
const MIN_TURNING_VELOCITY = 4;
const TURN_IMPULSE = .16;
const SMALL_TURNING_VELOCITY = 8;
const BOOST_VELOCITY = 3;

const MAX_FORCE = 1000;
const MAX_STEERING_VALUE = .5;
const BRAKE_FORCE = 1000000;

export default class BB8Control {

    constructor( options ) {
        CANNON = options.CANNON;
    }

    /**
     * @param bb8 {BB8}
     * @param input {String} up, down, left, right
     */
    controlVehicle( bb8, input ) {
        let vehicle = bb8.physicalObj;

        switch ( input ) {
            // second parameter (0) is the wheel index

            case 'up':
                vehicle.applyEngineForce( -MAX_FORCE, 0 );
                break;

            case 'down':
                vehicle.applyEngineForce( MAX_FORCE, 0 );
                break;

            case 'left':
                vehicle.setSteeringValue( MAX_STEERING_VALUE, 0 );
                break;

            case 'right':
                vehicle.setSteeringValue( -MAX_STEERING_VALUE, 0 );

            // todo consider adding braking
        }
    }

    /*accelerate( o, direction ) {
        let curVel = o.physicsObj.velocity.length();
        if ( curVel > MAX_VELOCITY ) {
            return;
        }

        let impulse = FORWARD_IMPULSE;
        if ( direction === 'down' ) {
            impulse = -impulse;
        }
        let movingForward = this.isMovingForward( o );
        let move = movingForward ? 'up' : 'down';
        if ( curVel < BOOST_VELOCITY && direction === move ) {
            impulse *= 3;
        }
        let newVec = o.physicsObj.quaternion.vmult( new CANNON.Vec3( 0, 0, impulse ) );

        o.isMovingForward = movingForward;
        o.physicsObj.velocity.vadd( newVec, o.physicsObj.velocity );
    }

    isMovingForward( o ) {
        let xzPlaneOrientation = o.physicsObj.quaternion.vmult( new CANNON.Vec3( 0, 0, 1 ) );
        let xzPlaneVelocity = o.physicsObj.velocity.clone();
        xzPlaneOrientation.y = 0;
        xzPlaneVelocity.y = 0;
        return xzPlaneOrientation.dot( xzPlaneVelocity ) >= 0;
    }

    turn( o, direction ) {
        let curVel = o.physicsObj.velocity.length();
        if ( curVel < MIN_TURNING_VELOCITY ) {
            return;
        }

        let deltaAngularVelocity = o.physicsObj.quaternion.vmult( new CANNON.Vec3( 0, 1, 0 ) );
        let impulse = TURN_IMPULSE;
        if ( direction === 'right' ) {
            impulse = -impulse;
        }
        if ( !this.isMovingForward( o ) ) {
            impulse = -impulse;
        }
        if ( curVel < SMALL_TURNING_VELOCITY ) {
            impulse *= .6;
            deltaAngularVelocity.scale( impulse, deltaAngularVelocity );
            o.physicsObj.angularVelocity.vadd( deltaAngularVelocity, o.physicsObj.angularVelocity );
        }
    }*/

    jump( robot ) {
        // todo jumping
    }
}
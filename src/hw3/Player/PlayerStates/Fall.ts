import MathUtils from "../../../Wolfie2D/Utils/MathUtils";
import { PlayerStates } from "../PlayerController";
import PlayerState from "./PlayerState";

export default class Fall extends PlayerState {
    tookDamage: boolean = false;
    dying: boolean = false;

    onEnter(options: Record<string, any>): void {
        // If we're falling, the vertical velocity should be >= 0
        this.parent.velocity.y = 0;
    }

    update(deltaT: number): void {

        // If the player hits the ground, start idling and check if we should take damage
        if (this.owner.onGround) {
            if(this.tookDamage == false && this.parent.velocity.y > 200) {
                this.parent.health -= Math.floor(this.parent.velocity.y / 200);
                if(this.parent.health <= 0) {
                    this.dying = true;
                    this.finished(PlayerStates.DEAD);
                }
                if(this.dying == false) {
                    this.owner.animation.playIfNotAlready("TAKING_DAMAGE", false);
                }
                this.tookDamage = true;
            }
            if(this.owner.animation.isPlaying("TAKING_DAMAGE") == false) {
                this.tookDamage = false;
                this.finished(PlayerStates.IDLE);
            }
        } 
        // Otherwise, keep moving
        else {
            // Get the movement direction from the player 
            let dir = this.parent.inputDir;
            // Update the horizontal velocity of the player
            this.parent.velocity.x += dir.x * this.parent.speed/3.5 - 0.3*this.parent.velocity.x;
            // Update the vertical velocity of the player
            this.parent.velocity.y += this.gravity*deltaT;
            // Move the player
            this.owner.move(this.parent.velocity.scaled(deltaT));
        }

    }

    onExit(): Record<string, any> {
        return {};
    }
}
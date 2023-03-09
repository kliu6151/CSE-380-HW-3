import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import { PlayerAnimations, PlayerTweens } from "../PlayerController";
import { GameEventType } from "../../../Wolfie2D/Events/GameEventType";

import PlayerState from "./PlayerState";
import { HW3Events } from "../../HW3Events";

/**
 * The Dead state for the player's FSM AI. 
 */
export default class Dead extends PlayerState {

    // Trigger the player's death animation when we enter the dead state
    public onEnter(options: Record<string, any>): void {
        let deathAudio = this.owner.getScene().getDeathAudioKey();
        // Play the death sound for the player
        this.owner.animation.playIfNotAlready(PlayerAnimations.DYING);

		this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: deathAudio, loop: false, holdReference: false});
    }

    // Ignore all events from the rest of the game
    public handleInput(event: GameEvent): void { }

    // Empty update method - if the player is dead, don't update anything
    public update(deltaT: number): void {
        if(this.owner.animation.isPlaying(PlayerAnimations.DYING) !== true) {
            this.owner.animation.playIfNotAlready("DEAD", false, HW3Events.PLAYER_DEAD)
        }
    }

    public onExit(): Record<string, any> { return {}; }
    
}
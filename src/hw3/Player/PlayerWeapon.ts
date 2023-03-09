import Particle from "../../Wolfie2D/Nodes/Graphics/Particle";
import ParticleSystem from "../../Wolfie2D/Rendering/Animations/ParticleSystem";
import Color from "../../Wolfie2D/Utils/Color";
import { EaseFunctionType } from "../../Wolfie2D/Utils/EaseFunctions";
import RandUtils from "../../Wolfie2D/Utils/RandUtils";
import Input from "../../Wolfie2D/Input/Input";
import Scene from "../../Wolfie2D/Scene/Scene";
import { GraphicType } from "../../Wolfie2D/Nodes/Graphics/GraphicTypes";
import { HW3PhysicsGroups } from "../HW3PhysicsGroups";
 

/**
 * // TODO get the particles to move towards the mouse when the player attacks
 * 
 * The particle system used for the player's attack. Particles in the particle system should
 * be spawned at the player's position and fired in the direction of the mouse's position.
 */
export default class PlayerWeapon extends ParticleSystem {

        /** Initialize the pool of all particles, creating the assets in advance */
        initializePool(scene: Scene, layer: string) {
            for (let i = 0; i < this.particlePool.length; i++) {
                this.particlePool[i] = <Particle>scene.add.graphic(GraphicType.PARTICLE, layer,
                    { position: this.sourcePoint.clone(), size: this.particleSize.clone(), mass: this.particleMass });
                this.particlePool[i].addPhysics();
                this.particlePool[i].setGroup(HW3PhysicsGroups.PLAYER_WEAPON);
                console.log(this.particlePool[i].group);
                this.particlePool[i].isCollidable = false;
                this.particlePool[i].visible = false;
            }
            console.log("Player weapon initialized");
        }

    public getPool(): Readonly<Array<Particle>> {
        return this.particlePool;
    }

    /**
     * @returns true if the particle system is running; false otherwise.
     */
    public isSystemRunning(): boolean { return this.systemRunning; }

    /**
     * Sets the animations for a particle in the player's weapon
     * @param particle the particle to give the animation to
     */
    public setParticleAnimation(particle: Particle) {


        let direction = Input.getGlobalMousePosition().sub(this.sourcePoint).normalize();
        // console.log("DIRECTION: ",direction);
        particle.vel = direction.scale(RandUtils.randInt(50, 100)).add(RandUtils.randVec(direction.x - 100, direction.x + 100, direction.y - 32, direction.y + 32));

        // Give the particle a random velocity.
        // particle.vel = RandUtils.randVec(100, 200, -32, 32);
        particle.color = Color.RED;

        // Give the particle tweens
        particle.tweens.add("active", {
            startDelay: 0,
            duration: this.lifetime,
            effects: [
                {
                    property: "alpha",
                    start: 1,
                    end: 0,
                    ease: EaseFunctionType.IN_OUT_SINE
                }
            ]
        });
    }

}
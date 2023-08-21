import { _decorator, Component, Node } from 'cc';
import { Constant } from '../Framework/Constant';
const { ccclass, property } = _decorator;

const OUTOFRANGE = 13;
@ccclass('EnemyPlane')
export class EnemyPlane extends Component {
  public enemySpeed = 0;

  start() {}

  update(deltaTime: number) {
    const position = this.node.position;
    const z = position.z + this.enemySpeed;
    this.node.setPosition(position.x, position.y, z);
    if (z > OUTOFRANGE) {
      this.node.destroy;
    }
  }

  show(speed: number) {
    this.enemySpeed = speed;
  }
}

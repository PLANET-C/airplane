import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

const OUTOFRANGE = 10;

@ccclass('Bullet')
export class Bullet extends Component {
  @property
  //子弹速度
  public bulletSpeed = 1;
  start() {}

  update(deltaTime: number) {
    const position = this.node.position;
    const moveLength = position.z - this.bulletSpeed;
    this.node.setPosition(position.x, position.y, moveLength);
    if (moveLength > OUTOFRANGE) {
      this.node.destroy();
    }
  }
}

import { _decorator, Component, Node } from 'cc';
const { ccclass, property, executeInEditMode } = _decorator;

@ccclass('BgMv')
export class BgMv extends Component {
  @property
  private bgMvSpeed = 8;

  @property
  private bgMvupperlimit = 25;

  @property(Node)
  private plane1: Node = null;

  @property(Node)
  private plane2: Node = null;

  start() {
    this.init;
  }

  update(deltaTime: number) {
    this.mvBg(deltaTime);
  }

  private mvBg(deltaTime: number) {
    this.plane1.setPosition(0, 0, this.plane1.position.z + this.bgMvSpeed * deltaTime);
    this.plane2.setPosition(0, 0, this.plane2.position.z + this.bgMvSpeed * deltaTime);
    // if (this.plane1.position.z >= this.bgMvupperlimit) {
    //   this.plane1.setPosition(0, 0, this.plane2.position.z - this.bgMvupperlimit);
    // } else if (this.plane2.position.z >= this.bgMvupperlimit) {
    //   this.plane2.setPosition(0, 0, this.plane1.position.z - this.bgMvupperlimit);
    // }
    if (this.plane1.position.z > this.bgMvupperlimit) {
      this.plane1.setPosition(0, 0, this.plane2.position.z - this.bgMvupperlimit);
    } else if (this.plane2.position.z > this.bgMvupperlimit) {
      this.plane2.setPosition(0, 0, this.plane1.position.z - this.bgMvupperlimit);
    }
  }

  private init() {
    this.plane1.setPosition(0, 0, 0);
    this.plane2.setPosition(0, 0, -this.bgMvupperlimit);
  }
}

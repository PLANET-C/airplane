import { _decorator, Component, EventTouch, Input, input, Node, SystemEvent, systemEvent, Touch } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerPlane')
export class PlayerPlane extends Component {
  @property
  public mvSpeed = 2;

  start() {
    // systemEvent.on(SystemEvent.EventType.TOUCH_MOVE, this._mvPlane, this);
    input.on(Input.EventType.TOUCH_MOVE, this._mvPlane, this);
  }

  _mvPlane(event: EventTouch) {
    const deltas = event.getDelta();
    let pos = this.node.position;
    let x = pos.x + deltas.x * this.mvSpeed * 0.01;
    let y = pos.y;
    let z = pos.z - deltas.y * 0.01 * this.mvSpeed;
    this.node.setPosition(pos.x + deltas.x * this.mvSpeed * 0.01, pos.y, pos.z - deltas.y * 0.01 * this.mvSpeed);
  }

  _mvPlane1(touch: Touch, event: EventTouch) {
    const deltas = touch.getDelta();
    let pos = this.node.position;
    let x = pos.x + deltas.x * this.mvSpeed * 0.01;
    let y = pos.y;
    let z = pos.z - deltas.y * 0.01 * this.mvSpeed;
    this.node.setPosition(pos.x + deltas.x * this.mvSpeed * 0.01, pos.y, pos.z - deltas.y * 0.01 * this.mvSpeed);
  }
}

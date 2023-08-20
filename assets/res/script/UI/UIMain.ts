import { __private, _decorator, Component, EventTouch, Input, input, Node, SystemEvent, systemEvent, Touch } from 'cc';
import { GameManager } from '../Framework/GameManager';
const { ccclass, property } = _decorator;

@ccclass('UIMain')
export class UIMain extends Component {
  @property
  public PlaneMvSpeed = 2;

  @property(Node)
  public playerPlane: Node = null;

  @property(GameManager)
  public gameManager: GameManager = null;

  start() {
    // systemEvent.on(SystemEvent.EventType.TOUCH_MOVE, this._mvPlane, this);
    // input.on(Input.EventType.TOUCH_MOVE, this._mvPlane, this);
    this.node.on(Input.EventType.TOUCH_START, this._touchStart, this);
    this.node.on(Input.EventType.TOUCH_MOVE, this._mvPlane, this);
    this.node.on(Input.EventType.TOUCH_END, this._touchEnd, this);
  }
  _touchStart(touch: Touch, event: SystemEvent) {
    this.gameManager.isShooting(true);
  }

  _touchEnd(touch: Touch, event: SystemEvent) {
    this.gameManager.isShooting(false);
  }

  _mvPlane(event: EventTouch) {
    const deltas = event.getDelta();
    let pos = this.playerPlane.position;
    let x = pos.x + deltas.x * this.PlaneMvSpeed * 0.01;
    let y = pos.y;
    let z = pos.z - deltas.y * 0.01 * this.PlaneMvSpeed;
    this.playerPlane.setPosition(pos.x + deltas.x * this.PlaneMvSpeed * 0.01, pos.y, pos.z - deltas.y * 0.01 * this.PlaneMvSpeed);
  }
}

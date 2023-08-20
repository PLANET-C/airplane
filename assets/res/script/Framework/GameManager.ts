import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
import { Bullet } from '../Bullet/Bullet';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
  @property(Node)
  public playerPlane: Node = null;
  @property(Prefab)
  public bullet01: Prefab = null;
  @property(Prefab)
  public bullet02: Prefab = null;
  @property(Prefab)
  public bullet03: Prefab = null;
  @property(Prefab)
  public bullet04: Prefab = null;
  @property(Prefab)
  public bullet05: Prefab = null;
  @property(Node)
  public bulletRoot: Node = null;
  //子弹移动速度
  @property
  public bulletSpeed = 1;

  //射击周期（速度）
  @property
  public shootTime = 0.3;

  private _currShootTime = 0;

  private _isShooting = false;

  start() {
    this._init();
  }

  update(deltaTime: number) {
    this._currShootTime += deltaTime;
    if (this._isShooting && this._currShootTime > this.shootTime) {
      this.createBullet();
      this._currShootTime = 0;
    }
  }

  public createBullet() {
    const bullet = instantiate(this.bullet01);
    bullet.setParent(this.bulletRoot);
    const position = this.playerPlane.position;
    bullet.setPosition(position.x, position.y, position.z - 1.5);
    const bulletComp = bullet.getComponent(Bullet);
    bulletComp.bulletSpeed = this.bulletSpeed;
  }

  public isShooting(value: boolean) {
    this._isShooting = value;
  }
  private _init() {
    this._currShootTime = this.shootTime;
  }
}

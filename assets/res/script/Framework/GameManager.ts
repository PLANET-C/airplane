import { _decorator, Component, instantiate, math, Node, Prefab } from 'cc';
import { Bullet } from '../Bullet/Bullet';
import { Constant } from './Constant';
import { EnemyPlane } from '../Plane/EnemyPlane';
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
  //射击间隔时间，当间隔时间大于射击周期时，再次射击
  private _currShootTime = 0;
  //是否射击
  private _isShooting = false;

  //敌机
  @property(Prefab)
  public enemyPlane01: Prefab = null;
  @property(Prefab)
  public enemyPlane02: Prefab = null;

  //敌机生成时间
  @property
  public creatorEnemyPlaneTime = 1;
  //敌机一速度
  @property
  public enemyPlane01Speed = 1;
  //敌机二速度
  @property
  public enemyPlane02Speed = 2;
  //创建敌机的时间，大于敌机生成时间时，应当生成敌机
  private _currCreatorEnemyPlaneTime = 1;
  //组合间隔状态
  private _combinationInterval = 0;

  start() {
    this._init();
  }

  update(deltaTime: number) {
    this._currShootTime += deltaTime;
    if (this._isShooting && this._currShootTime > this.shootTime) {
      this.createBullet();
      this._currShootTime = 0;
    }
    this._currCreatorEnemyPlaneTime += deltaTime;
    if (this._combinationInterval === Constant.Combination.PLANE1) {
      console.log('开始创建一号敌机');
      console.log(this._currCreatorEnemyPlaneTime);
      if (this._currCreatorEnemyPlaneTime > this.creatorEnemyPlaneTime) {
        console.log('正在创建一号敌机');
        this.creatorEnemyPlane();
        this._currCreatorEnemyPlaneTime = 0;
      }
    } else if (this._combinationInterval === Constant.Combination.PLANE2) {
    } else {
    }
  }

  //创建敌机
  public creatorEnemyPlane() {
    //随机生成两种敌机中的一种
    console.log('创建中');
    const EnemyPlaneType = math.randomRangeInt(1, 3);
    let planePrefab: Prefab = null;
    let speed = 0;
    if (EnemyPlaneType === Constant.EnemyPlaneType.TYPER1) {
      planePrefab = this.enemyPlane01;
      speed = this.enemyPlane01Speed;
    } else {
      planePrefab = this.enemyPlane02;
      speed = this.enemyPlane02Speed;
    }

    const enemy = instantiate(planePrefab);
    enemy.setParent(this.node);
    const enemyComp = enemy.getComponent(EnemyPlane);
    enemyComp.enemySpeed = speed;
    // enemyComp.show(speed);

    // 随机生成敌机位置（X轴）
    const EnemyPostion = math.randomRange(-6.5, 6.5);
    enemy.setPosition(EnemyPostion, enemy.position.y, -10);
  }

  //创建子弹
  public createBullet() {
    const bullet = instantiate(this.bullet01);
    bullet.setParent(this.bulletRoot);
    const position = this.playerPlane.position;
    bullet.setPosition(position.x, position.y, position.z - 1.5);
    const bulletComp = bullet.getComponent(Bullet);
    bulletComp.bulletSpeed = this.bulletSpeed;
  }
  //判断是否需要射击，触摸射击，未触摸停止
  public isShooting(value: boolean) {
    this._isShooting = value;
  }
  //第一发子弹不用等待射击时间
  private _init() {
    this._currShootTime = this.shootTime;
    this.changeEnemyPlane();
  }

  //定时切换敌机组合
  private changeEnemyPlaneSchedule() {
    this.schedule(this._combinationInterval, 10, 3);
  }

  //定时器每执行一次切换一种组合
  private changeEnemyPlane() {
    this._combinationInterval++;
  }
}

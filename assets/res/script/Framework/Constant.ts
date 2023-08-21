import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Constant')
export class Constant {
  public static EnemyPlaneType = {
    TYPER1: 1,
    TYPER2: 2,
  };

  public static Combination = {
    PLANE1: 1,
    PLANE2: 2,
    PLANE3: 3,
  };
}

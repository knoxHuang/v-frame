'use strict';

// 图文件的格式
export interface GraphInfo {
    // 数据版本，为以后数据兼容预留
    version: number;
    // 缩放比例，会传递到 attribute 上
    scale: number;
    // 绘制设置
    option: GraphOption;
    // 节点列表
    nodes: { [uuid: string]: NodeInfo }
    // 线段列表
    lines: { [uuid: string]: LineInfo }
}

// 图配置
export interface GraphOption {
    // 渲染方式，纯色，网格
    type: 'pure' | 'mesh';
    // 网格尺寸
    meshSize?: number;
    // 原点坐标
    originPoint?: boolean;
    // origin 颜色
    originColor?: string;
    // mesh 颜色
    meshColor?: string;
    // 背景颜色
    backgroundColor?: string;
}

// 图里节点的信息
export interface NodeInfo {
    // 节点类型
    type: string;
    // 节点所在的坐标
    position: { x: number, y: number };
    // 附加描述信息
    details: { [key: string]: any };
}

// 图里的线段信息
export interface LineInfo {
    // 线条类型，曲线，直线
    type: 'curve' | 'straight';
    // 附加描述信息
    details: { [key: string]: any };
    // 线段开始连接的节点
    input: {
        node: string;
        param?: string;
        __fake?: NodeInfo;
    };
    // 线段结束连接的节点
    output: {
        node: string;
        param?: string;
        __fake?: NodeInfo;
    };
}

// 曲线生成规则，允许单向或者全向绘制
export type PathParamRole = 'up' | 'down' | 'left' | 'right' | 'all';

export interface ParamConnectData {
    x1: number; // 起始点的 x 坐标
    y1: number; // 起始点的 y 坐标
    x2: number; // 终点的 x 坐标
    y2: number; // 终点的 y 坐标
    r1: PathParamRole, // 起始点开始的线段的朝向
    r2: PathParamRole, // 终点开始的线段的朝向
    d1: 0 | 1; // 当 r1 为全向的时候，起始点优先以横向还是竖向显示
    d2: 0 | 1; // 当 r2 为全向的时候，终点点优先以横向还是竖向显示
}
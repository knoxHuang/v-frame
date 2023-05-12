'use strict';

import type { PathParamRole } from '../interface';

export function generateUUID() {
    return 't_' + Date.now();
}

/**
 * 获取一个 param 元素相对 node 的偏移坐标
 * @param $node 
 * @param selector 
 * @param scale 
 * @returns 
 */
export function getParamElementOffset($node: HTMLElement, selector: string, scale: number) {
    const $param = $node.querySelector(selector);
    if (!$param) {
        return null;
    }
    const nodeBBound = $node.getBoundingClientRect();
    const paramBBound = $param.getBoundingClientRect();
    return {
        x: ((paramBBound.width / 2 + paramBBound.x) - (nodeBBound.width / 2 + nodeBBound.x)) / scale,
        y: ((paramBBound.height / 2 + paramBBound.y) - (nodeBBound.height / 2 + nodeBBound.y)) / scale,
        role: $param.getAttribute('role') as PathParamRole,
    };
}

export function queryParamInfo($root: HTMLElement, node: string, param?: string) {
    const $node = $root.querySelector(`#nodes > v-graph-node[node-uuid="${node}"]`);
    if (!$node) {
        return;
    }
    const $param = $node.querySelector(`v-graph-node-param[name="${param}"]`);
    if (!$param) {
        return;
    }
    return {
        direction: $param.getAttribute('direction'),
        type: $param.getAttribute('type'),
        name: $param.getAttribute('name'),
        role: $param.getAttribute('role'),
    };
}
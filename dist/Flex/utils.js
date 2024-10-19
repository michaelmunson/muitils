"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRow = isRow;
exports.isCol = isCol;
exports.getLayout = getLayout;
exports.getDirection = getDirection;
function isRow(props) {
    return (!isCol(props));
}
function isCol(props) {
    return ('col' in props);
}
function getLayout(props) {
    const layout = props.layout ?? {};
    const css = {};
    if (props.center) {
        const center = Array.isArray(props.center) ? props.center : [props.center];
        if (center.includes('x'))
            layout.x = 'center';
        if (center.includes('y'))
            layout.y = 'center';
    }
    if (isRow(props)) {
        css.alignItems = layout.y ?? 'initial';
        css.justifyContent = layout.x ?? 'initial';
    }
    else {
        css.alignItems = layout.x ?? 'initial';
        css.justifyContent = layout.y ?? 'initial';
    }
    return css;
}
function getDirection(props) {
    if (isRow(props)) {
        if (props.reverse)
            return 'row-reverse';
        else
            return 'row';
    }
    else {
        if (props.reverse)
            return 'column-reverse';
        else
            return 'column';
    }
}

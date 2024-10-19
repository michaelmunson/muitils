"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSx = createSx;
exports.extendSx = extendSx;
const DEFAULT_CONFIG = {
    classes: [],
    definitions: {},
    theme: {},
};
const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
const cssOperator = ['&', ' ', '+', '>', ',', '*', '=', '[', ']'];
const isDefinition = (config, str) => (typeof str === "string" && str in config['definitions']);
const isElementSelector = (selector) => typeof selector === 'string' && letters.includes(selector[0]);
// const isClass = <Config extends SxConfig, Theme extends MuiTheme>(config: Config, cls: any): cls is Config['classes'][number] => (
//   typeof cls === "string" && config.classes.includes(cls)
// );
// const isClassSelector = (selector: any): selector is ClassSelector => typeof selector === 'string' && selector.startsWith('.');
/**@_UTILS */
const createConfig = (config) => ({ ...DEFAULT_CONFIG, ...config });
function createSxFunction(config) {
    const definitions = config.definitions;
    return (...styles) => {
        const muisx = {};
        for (const style of styles) {
            if (!style)
                continue;
            if (isDefinition(config, style)) {
                Object.assign(muisx, definitions[style]);
            }
        }
        return muisx;
    };
}
function createSxExtensions(config) {
    return {
        classes: config.classes.reduce((p, c) => ({ ...p, [c]: c }), {}),
        definitions: config.definitions,
        theme: config.theme,
        colors: config.theme.palette,
        cls(...className) {
            return `&.${className.join('.')}`;
        },
        _cls(...className) {
            return `& .${className.join(' .')}`;
        },
        el(...elements) {
            return `& ${elements.join(',')}`;
        },
        hov(modifier = "") {
            return `&${modifier}:hover`;
        },
        def(definition) {
            const definitions = config.definitions;
            if (!isDefinition(config, definition)) {
                console.warn(`Warning: "${definition}" is not defined in Muitils SxConfig`);
                return {};
            }
            return definitions[definition];
        },
        sel(...selectors) {
            const newSelectorsArray = [];
            let lastSelector = null;
            for (const rawSelector of selectors) {
                if (typeof rawSelector === 'string') {
                    const selector = rawSelector.trim();
                    if (rawSelector === ' ')
                        newSelectorsArray.push(rawSelector);
                    if (isElementSelector(selector)) {
                        if (lastSelector && isElementSelector(lastSelector)) {
                            newSelectorsArray.push(' ', selector);
                        }
                        else {
                            newSelectorsArray.push(selector);
                        }
                    }
                    lastSelector = selector;
                }
                else {
                    console.warn(`Expected selector to be of type "string", recieved "${typeof rawSelector}"`);
                }
            }
            return newSelectorsArray.join('');
        },
        _sel(...selectors) {
            return `& ${this.sel(...selectors)}`;
        }
    };
}
/**@_EXPORT */
function createSx(configuration = {}) {
    const config = createConfig(configuration);
    const sxFunction = createSxFunction(config);
    const sxExtensions = createSxExtensions(config);
    Object.assign(sxFunction, sxExtensions);
    return sxFunction;
}
function extendSx(sx, config) {
    const SX = sx;
    const CF = { ...DEFAULT_CONFIG, ...config };
    const classes = [SX.classes, CF.classes].flat();
    const definitions = { ...SX?.definitions, ...CF.definitions };
    const theme = { ...SX?.theme, ...CF.theme };
    return createSx({
        classes,
        definitions,
        theme,
    });
}
/* const sx1 = createSx({
  classes: <const>['asd', 'xyz'],
  definitions: {
    'brad20': { borderRadius: 4 }
  },
  theme: {} as any
});

const sx2 = extendSx(sx1, {
  classes: <const>['jjj'],
  definitions: {fs: {fontSize: '1rem'}}
})

const sx3 = extendSx(sx2, {
  classes: <const>['kkk']
});

const styles = sx1(
  { fontSize: '123' },
  {
    [x.cls('asd', 'xyz')]: {

    },
    ...x.defs.brad20
  },
)
 */ 

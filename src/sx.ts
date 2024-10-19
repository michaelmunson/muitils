import { SxProps as MuiSxProps, Theme as MuiTheme } from "@mui/material"

type HTMLTag = keyof HTMLElementTagNameMap | `${string}-${string}`;

type ClassList = readonly string[];
type ClassEnums<T extends ClassList> = Readonly<{[K in T[number]]: K}>

type DefinitionValue<Theme extends MuiTheme=any, Args extends any[] = any[]> = MuiSxProps<Theme> | ((...args:Args) => MuiSxProps<Theme>)
type DefinitionRecord<Theme extends MuiTheme=any> = Readonly<Record<string, DefinitionValue<Theme>>>
type DefinitionKey<Theme extends MuiTheme=any> = keyof DefinitionRecord<Theme>

type SxConfig<Theme extends MuiTheme=any> = {
    classes: ClassList;
    definitions: DefinitionRecord;
}

type SxArg
type Sx<Config extends SxConfig<Theme>, Theme extends MuiTheme=any> = (
    (
        (...styles:(MuiSxProps<Theme> | undefined)[]) => MuiSxProps<{}>
    ) & {
        cls: ((...className: Config['classes'][number][]) => `&.${Config['classes'][number]}`);
        _cls: ((...className: Config['classes'][number][]) => `& .${Config['classes'][number]}`);
        el: ((...element: HTMLTag[]) => `& ${HTMLTag}`);
        hov: (modifier?:string) => `&${string}:hover`;
        classes: ClassEnums<Config['classes']>;
        defs: Config['definitions']
    }
)

function createSx<Config extends SxConfig, Theme extends MuiTheme=any>(config:Config) : Sx<Config, Theme>{
    return (() => {}) as any
}


const x = createSx({
    classes: <const>['asd', 'xyz'],
    definitions: {
        'brad20' : {borderRadius: 4}
    }
});


const styles = x(
    {fontSize: '123'},
    {
        [x.cls('asd', 'xyz')] : {
            
        }
    }
)

/*========= */

function sx<Theme extends object = object>(...styles:(MuiSxProps<Theme> | undefined)[]){
    return styles.reduce((prev, curr) => ({...prev, ...(curr ?? {})}), {});
}

namespace sx {
    export const classes = <Enums extends [...string[]]>(...enums:Enums) => enums.reduce((p,c) => ({...p, [c]:c}), {}) as Readonly<{[K in Enums[number]]: K}>;

    export function el(name:keyof HTMLElementTagNameMap){
        return `& ${name}`
    }
    export function cls(name:string){
        return `&.${name}`
    }
    export function _cls(name:string){
        return `& .${name}`
    }
}

export const $display_xs = sx({display: { xs: 'flex', md: 'none' }});
export const $display_md = sx({display: { xs: 'none', md: 'flex' }});
export const $center = sx({alignItems:'center', justifyContent:'center'})
export const $row = sx({display:"flex", flexDirection:'row'});
export const $col = sx({display:"flex", flexDirection:'column'});
export const $raised = sx({boxShadow: '0px 2px 3px 0px lightgray'});
export const $hw100 = sx({height:'100%', width:'100%'});
export const $container = sx($col, $center, $hw100);
export const $border_rad = sx({borderRadius: "20px"});

export default sx;
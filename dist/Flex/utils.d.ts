import { ColProps, RowProps, FlexProps, CSSDirection } from './types';
import { CSSProperties } from 'react';
export declare function isRow(props: FlexProps): props is RowProps;
export declare function isCol(props: FlexProps): props is ColProps;
export declare function getLayout(props: FlexProps): Pick<CSSProperties, 'justifyContent' | 'alignItems'>;
export declare function getDirection(props: FlexProps): CSSDirection;

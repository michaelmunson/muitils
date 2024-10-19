import { CircularProgressProps } from '@mui/material';
type SpinnerProps = Omit<CircularProgressProps, "size"> & {
    fillContainer?: boolean;
    size?: {
        x?: number;
        y?: number;
    };
};
declare function Spinner({ fillContainer, ...props }: SpinnerProps): import("react/jsx-runtime").JSX.Element;
export { type SpinnerProps, Spinner };
export default Spinner;

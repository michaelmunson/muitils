import { CircularProgressProps } from "@mui/material";
export default function Spinner({ fillContainer, ...props }: Omit<CircularProgressProps, "size"> & {
    fillContainer?: boolean;
    size?: {
        x?: number;
        y?: number;
    };
}): import("react/jsx-runtime").JSX.Element;

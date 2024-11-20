const sprite = "/assets/icons/sprite.svg";

interface IconProps {
    id: string;
    width?: number | string;
    height?: number | string;
    fill?: string;
    stroke?: string;
    testId?: string;
}

export const Icon = ({id, width, height, stroke, testId}: IconProps) => {

    return (
        <svg width={width} height={height} data-testid={testId}>
            <use
                href={`${sprite}#${id}`}
                fill="none"
                stroke={stroke}
            ></use>
        </svg>
    )
}
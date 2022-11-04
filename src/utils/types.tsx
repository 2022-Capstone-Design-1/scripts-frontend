export type FileType = {
    object: File;
};

export type RectangleButtonType = {
    text: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export type ScriptDataType = {
    script: {
        fullScript: string;
        srcAddress: string;
        summary: string;
        timeTable: object[];
    };
    type: string;
};

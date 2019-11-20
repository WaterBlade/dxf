export type PaperSizeType = 'A1' | 'A2' | 'A3';
export const PaperSizeData = new Map<PaperSizeType, { leftBottom: number[], rightTop: number[], width: number, height: number }>();
PaperSizeData.set(
    'A1',
    {
        leftBottom: [0, 0],
        rightTop: [841, 594],
        width: 841,
        height: 594
    }
);
PaperSizeData.set(
    'A2',
    {
        leftBottom: [0, 0],
        rightTop: [594, 420],
        width: 594,
        height: 420
    }
);
PaperSizeData.set(
    'A3',
    {
        leftBottom: [0, 0],
        rightTop: [420, 297],
        width: 420,
        height: 297
    }
)

export type LineType = 'CONTINUOUS' | 'CENTER' | 'DASHED' | 'ByLayer' | 'ByBlock';
export const LineData = new Map<LineType, { name: string, desc: string, data: number[] }>();
LineData.set('CONTINUOUS', { name: 'CONTINUOUS', desc: '', data: [] });
LineData.set('ByLayer', { name: 'ByLayer', desc: '', data: [] });
LineData.set('ByBlock', { name: 'ByBlock', desc: '', data: [] });
LineData.set(
    'CENTER',
    {
        name: 'CENTER',
        desc: 'Center ____ _ ____ _ ____ _ ____ _ ____ _ ____',
        data: [1.25, -0.25, 0.25, -0.25]
    }
);
LineData.set(
    'DASHED',
    {
        name: 'DASHED',
        desc: 'Dashed __ __ __ __ __ __ __ __ __ __ __ __ __ _',
        data: [0.5, -0.25]
    }
);

export type PatternType = 'ANSI31' | 'SOLID' | 'CONCRETE' | 'REINFORCED';
export const PatternData = new Map<PatternType, { name: string, desc: string, data: number[][] }>();
PatternData.set(
    'ANSI31',
    {
        name: 'ANSI31',
        desc: 'ANSI Iron, Brick, Stone masonry',
        data: [
            [45, 0, 0, 0, 3.175]
        ]
    }
);
PatternData.set(
    'SOLID',
    {
        name: 'SOLID',
        desc: 'Solid fill',
        data: [
            [45, 0, 0, 0, 0.125]
        ]
    }
);
PatternData.set(
    'CONCRETE',
    {
        name: '混凝土2',
        desc: '',
        data: [
            [50, 0, 0, 4.12975034, -5.89789472, 0.75, -8.25],
            [355, 0, 0, -2.03781207, 7.37236840, 0.60, -6.6],
            [100.4514, 0.5977168, -0.0522934, 5.7305871, -6.9397673, 0.6374019, -7.01142112],
            [46.1842, 0, 2, 6.19462551, -8.84684208, 1.125, -12.375],
            [96.6356, 0.88936745, 1.86206693, 8.59588071, -10.40965104, 0.95610288, -10.51713],
            [351.1842, 0, 2, 7.74328189, 11.0585526, 0.9, -9.9],
            [21, 1, 1.5, 4.12975034, -5.89789472, 0.75, -8.25],
            [326, 1, 1.5, -2.03781207, 7.37236840, 0.60, -6.6],
            [71.4514, 1.49742233, 1.16448394, 5.7305871, -6.9397673, 0.6374019, -7.01142112],
            [37.5, 0, 0, 2.123, 2.567, 0, -6.52, 0, -6.7, 0, -6.625],
            [7.5, 0, 0, 3.123, 3.567, 0, -3.82, 0, -6.37, 0, -2.525],
            [-32.5, -2.23, 0, 4.6234, 2.678, 0, -2.5, 0, -7.8, 0, -10.35],
            [-42.5, -3.23, 0, 3.6234, 4.678, 0, -3.25, 0, -5.18, 0, -7.35]
        ]
    }
);
PatternData.set(
    'REINFORCED',
    {
        name: '钢筋混凝土',
        desc: '钢筋混凝土',
        data: [
            [50, 0, 0, 4.12975034, -5.89789472, 0.75, -8.25],
            [355, 0, 0, -2.03781207, 7.37236840, 0.60, -6.6],
            [100.4514, 0.5977168, -0.0522934, 5.7305871, -6.9397673, 0.6374019, -7.01142112],
            [46.1842, 0, 2, 6.19462551, -8.84684208, 1.125, -12.375],
            [96.6356, 0.88936745, 1.86206693, 8.59588071, -10.40965104, 0.95610288, -10.51713],
            [351.1842, 0, 2, 7.74328189, 11.0585526, 0.9, -9.9],
            [21, 1, 1.5, 4.12975034, -5.89789472, 0.75, -8.25],
            [326, 1, 1.5, -2.03781207, 7.37236840, 0.60, -6.6],
            [71.4514, 1.49742233, 1.16448394, 5.7305871, -6.9397673, 0.6374019, -7.01142112],
            [37.5, 0, 0, 2.123, 2.567, 0, -6.52, 0, -6.7, 0, -6.625],
            [7.5, 0, 0, 3.123, 3.567, 0, -3.82, 0, -6.37, 0, -2.525],
            [-32.5, -2.23, 0, 4.6234, 2.678, 0, -2.5, 0, -7.8, 0, -10.35],
            [-42.5, -3.23, 0, 3.6234, 4.678, 0, -3.25, 0, -5.18, 0, -7.35],
            [0, 0, 0, 0, 1.5, 1]
        ]
    }
)

export enum ColorIndex {
    red = 1,
    yellow = 2,
    green = 3,
    cyan = 4,
    blue = 5,
    magenta = 6,
    white = 7,
    dark = 8,
    gray = 9
}


export type LayerType = 'THIN' | 'MID' | 'THICK' | 'THICKER' | 'DASHED' | 'CENTER' | 'TEXT' | 'FILL';
export const LayerData = new Map<LayerType, string>(
    [
        ['THIN', '细实线'],
        ['MID', '中粗线'],
        ['THICK', '粗线'],
        ['THICKER', '加粗线'],
        ['DASHED', '虚线'],
        ['CENTER', '中心线'],
        ['TEXT', '文字'],
        ['FILL', '填充']
    ]
)

export const PaperSize = {
    A1:{
        leftBottom: [0, 0],
        rightTop: [841, 594],
        width: 841,
        height: 594
    },
    A2: {
        leftBottom: [0, 0],
        rightTop: [594, 420],
        width: 594, 
        height: 420
    },
    A3: {
        leftBottom: [0, 0],
        rightTop: [420, 297],
        width: 420,
        height: 297
    }
}

export type LineType = 'CONTINUOUS' | 'CENTER' | 'DASHED'

export const LineTypeData = {
    center: {
        name: 'CENTER',
        desc: 'Center ____ _ ____ _ ____ _ ____ _ ____ _ ____',
        data: [1.25, -0.25, 0.25, -0.25]
    },
    dashed: {
        name: 'DASHED',
        desc: 'Dashed __ __ __ __ __ __ __ __ __ __ __ __ __ _',
        data: [0.5, -0.25]
    }
}

export const PatternData: {[name: string]: {name: string, desc: string, data: number[][]}} = {
    ansi31: {
        name: 'ANSI31',
        desc: 'ANSI Iron, Brick, Stone masonry',
        data: [
            [45, 0, 0, 0, 3.175]
        ]
    },
    solid: {
        name: 'SOLID',
        desc: 'Solid fill',
        data: [
            [45, 0, 0, 0, 0.125]
        ]
    }
}

export const ColorIndex = {
    red: 1,
    yellow: 2,
    green: 3,
    cyan: 4,
    blue: 5,
    magenta: 6,
    white: 7,
    dark: 8,
    gray: 9
}

export enum LayerName{
    thin = '细实线',
    middle = '中粗线',
    thick = '粗线',
    thicker = '加粗线',
    dashed = '虚线',
    center = '中心线',
    text = '文字'
}
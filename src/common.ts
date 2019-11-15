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
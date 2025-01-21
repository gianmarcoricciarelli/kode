export const categories: ApexXAxis['categories'] = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
]

export const singleLineSeries: ApexAxisChartSeries = [
    {
        name: 'Series A',
        data: Array.from({ length: 10 }).map(
            () => Math.round((Math.random() + Number.EPSILON) * 100) / 100
        ),
    },
]

export const multiLineSeries: ApexAxisChartSeries = [
    {
        name: 'Series A',
        data: Array.from({ length: 10 }).map(
            () => Math.round((Math.random() + Number.EPSILON) * 100) / 100
        ),
    },
    {
        name: 'Series B',
        data: Array.from({ length: 10 }).map(
            () => Math.round((Math.random() + Number.EPSILON) * 100) / 100
        ),
    },
]

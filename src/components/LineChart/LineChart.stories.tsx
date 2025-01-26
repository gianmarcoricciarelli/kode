import { categories, multiLineSeries, singleLineSeries } from '@data/index'
import { Meta, StoryObj } from '@storybook/react'
import LineChart from './LineChart'
import { markerClickEventOptions } from './LineChart.types'

const meta = {
    title: 'LineChart',
    component: LineChart,
    parameters: {
        layout: 'centered',
    },
    args: {
        data: singleLineSeries,
        labels: categories,
        options: {
            title: {
                text: 'Numbers and Letters',
            },
            xaxis: {
                categories,
                title: { text: 'Letters' },
            },
            yaxis: {
                title: { text: 'Numbers' },
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof LineChart>

export default meta
type Story = StoryObj<typeof LineChart>

export const SimpleLineChart: Story = {}

export const MultiLineChart: Story = {
    args: {
        data: multiLineSeries,
    },
}

export const WithDataLabels: Story = {
    args: {
        options: {
            ...meta.args.options,
            dataLabels: {
                enabled: true,
            },
        },
    },
}

const max = Math.max(...(singleLineSeries[0].data as number[]))
const min = Math.min(...(singleLineSeries[0].data as number[]))
export const WithAnnotations: Story = {
    args: {
        ...meta.args.options,
        annotations: {
            xaxis: [
                {
                    x: 'E',
                    borderColor: '#06b6d4',
                    label: {
                        text: 'Vertical Threshold',
                        style: {
                            color: '#FFFFFF',
                            background: '#06b6d4',
                        },
                    },
                },
            ],
            yaxis: [
                {
                    y: 0.25,
                    borderColor: '#06b6d4',
                    label: {
                        text: 'Threshold',
                        style: {
                            color: '#FFFFFF',
                            background: '#06b6d4',
                        },
                    },
                },
                {
                    y: 0.75,
                    borderColor: '#06b6d4',
                    label: {
                        borderColor: '#06b6d4',
                        text: 'Other Threshold',
                        style: {
                            color: '#FFFFFF',
                            background: '#06b6d4',
                        },
                    },
                },
            ],
            points: [
                {
                    x: categories[
                        singleLineSeries[0].data.findIndex(
                            (value) => value === min
                        )
                    ],
                    y: min,
                    label: {
                        text: 'Min',
                        borderColor: '#EF4444',
                        style: { color: '#FFFFFF', background: '#EF4444' },
                    },
                },
                {
                    x: categories[
                        singleLineSeries[0].data.findIndex(
                            (value) => value === max
                        )
                    ],
                    y: max,
                    label: {
                        text: 'Max',
                        borderColor: '#22C55E',
                        style: { color: '#FFFFFF', background: '#22C55E' },
                    },
                },
            ],
        },
    },
}

export const WithActionOnClick: Story = {
    args: {
        onClick: (options: markerClickEventOptions) => {
            const seriesIndex = options.seriesIndex
            const dataPointIndex = options.dataPointIndex

            alert(
                `Clicked on DataPoint ${singleLineSeries[seriesIndex].data[dataPointIndex]}!`
            )
        },
    },
}

export const DataIsLoading: Story = {
    args: {
        data: [],
        labels: [],
        loading: true,
    },
}

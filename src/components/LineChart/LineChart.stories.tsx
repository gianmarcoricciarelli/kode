import { categories, multiLineSeries, singleLineSeries } from '@data/index'
import { Meta, StoryObj } from '@storybook/react'
import { userEvent, within } from '@storybook/test'
import LineChart from './LineChart'
import { markerClickEventOptions } from './types'

const meta = {
    title: 'LineChart',
    component: LineChart,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof LineChart>

export default meta
type Story = StoryObj<typeof LineChart>

export const SimpleLineChart: Story = {
    args: {
        data: singleLineSeries,
        labels: categories,
        options: {
            title: {
                text: 'Numbers and Letters',
            },
            xaxis: {
                title: { text: 'Letters' },
            },
            yaxis: {
                title: { text: 'Numbers' },
            },
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)

        await userEvent.hover(canvas.getByTestId('line-chart'))
    },
}

export const MultiLineChart: Story = {
    args: {
        data: multiLineSeries,
        labels: categories,
        options: {
            title: {
                text: 'Numbers and Letters',
            },
            xaxis: {
                title: { text: 'Letters' },
            },
            yaxis: {
                title: { text: 'Numbers' },
            },
        },
    },
}

export const WithDataLabels: Story = {
    args: {
        data: singleLineSeries,
        labels: categories,
        options: {
            dataLabels: {
                enabled: true,
            },
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
}

const max = Math.max(...(singleLineSeries[0].data as number[]))
const min = Math.min(...(singleLineSeries[0].data as number[]))
export const WithAnnotations: Story = {
    args: {
        data: singleLineSeries,
        labels: categories,
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
        options: {
            title: {
                text: 'Numbers and Letters',
            },
            xaxis: {
                title: { text: 'Letters' },
            },
            yaxis: {
                title: { text: 'Numbers' },
            },
        },
    },
}

export const WithActionOnClick: Story = {
    args: {
        data: singleLineSeries,
        labels: categories,
        options: {
            title: {
                text: 'Numbers and Letters',
            },
            xaxis: {
                title: { text: 'Letters' },
            },
            yaxis: {
                title: { text: 'Numbers' },
            },
        },
        onClick: (options: markerClickEventOptions) => {
            const seriesIndex = options.seriesIndex
            const dataPointIndex = options.dataPointIndex

            alert(
                `Clicked on DataPoint ${singleLineSeries[seriesIndex].data[dataPointIndex]}!`
            )
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await canvas.findByTestId('line-chart')
        await userEvent.click(canvas.getByTestId('line-chart'))
    },
}

export const DataIsLoading: Story = {
    args: {
        data: [],
        labels: [],
        options: {
            title: {
                text: 'Numbers and Letters',
            },
            xaxis: {
                title: { text: 'Letters' },
            },
            yaxis: {
                title: { text: 'Numbers' },
            },
        },
        loading: true,
    },
}

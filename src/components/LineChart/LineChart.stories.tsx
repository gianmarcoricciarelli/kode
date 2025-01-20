import { Meta, StoryObj } from '@storybook/react'
import { multiLineSeries, singleLineSeries } from '../../data'
import LineChart from './LineChart'

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
        options: {
            xaxis: {
                categories: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
                title: { text: 'Letters' },
            },
            yaxis: {
                title: { text: 'Numbers' },
            },
        },
    },
}

export const MultiLineChart: Story = {
    args: {
        data: multiLineSeries,
        options: {
            xaxis: {
                categories: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
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
        options: {
            dataLabels: {
                enabled: true,
            },
            xaxis: {
                categories: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
                title: { text: 'Letters' },
            },
            yaxis: {
                title: { text: 'Numbers' },
            },
        },
    },
}

import { categories, multiLineSeries, singleLineSeries } from '@data/index'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import LineChart from '../LineChart'

const MAIN_CSS_CLASS = '.apexcharts-canvas'
const LEGEND_CSS_CLASS = '.apexcharts-legend'
const X_AXIS_TICKS_CSS_CLASS = '.apexcharts-xaxis-texts-g text title'
const ANNOTATIONS_CSS_CLASSES = {
    xAxis: '.apexcharts-xaxis-annotations',
    yAXis: '.apexcharts-yaxis-annotations',
    points: '.apexcharts-point-annotations',
}
const SERIES_CSS_CLASS = '.apexcharts-series'
const DATALABELS_CSS_CLASS = '.apexcharts-datalabels .apexcharts-data-labels'

describe('Simple Line Chart', () => {
    it('Should be rendered correctly', () => {
        render(<LineChart data={singleLineSeries} labels={categories} />)

        const xTicks = document.querySelectorAll(X_AXIS_TICKS_CSS_CLASS)
        const ticksTexts = Array.from(xTicks).map((tick) => tick.textContent)

        expect(screen.queryByTestId('spinner-container')).toBe(null)
        expect(document.querySelector(MAIN_CSS_CLASS)).toBeInTheDocument()
        expect(document.querySelector(LEGEND_CSS_CLASS)?.innerHTML).toBe('')
        expect(xTicks.length).toBe(10)
        expect(ticksTexts).toEqual(categories)
        expect(
            document.querySelector(ANNOTATIONS_CSS_CLASSES.xAxis)?.innerHTML
        ).toBe('')
        expect(
            document.querySelector(ANNOTATIONS_CSS_CLASSES.yAXis)?.innerHTML
        ).toBe('')
        expect(
            document.querySelector(ANNOTATIONS_CSS_CLASSES.points)?.innerHTML
        ).toBe('')
    })
})

describe('Multi-Line Chart', () => {
    it('Should render the components for describing the series provided as input', () => {
        render(<LineChart data={multiLineSeries} labels={categories} />)

        expect(screen.queryByTestId('spinner-container')).toBe(null)
        expect(document.querySelector(MAIN_CSS_CLASS)).toBeInTheDocument()
        expect(
            document.querySelectorAll(
                LEGEND_CSS_CLASS + ' .apexcharts-legend-series'
            ).length
        ).toBe(2)
        expect(document.querySelectorAll(SERIES_CSS_CLASS).length).toBe(2)
    })
})

describe('With Data Labels', () => {
    it('Should render the Data Labels for each of the Data Points provided as input', () => {
        render(
            <LineChart
                data={singleLineSeries}
                labels={categories}
                options={{ dataLabels: { enabled: true } }}
            />
        )

        expect(screen.queryByTestId('spinner-container')).toBe(null)
        expect(document.querySelector(MAIN_CSS_CLASS)).toBeInTheDocument()
        expect(document.querySelectorAll(DATALABELS_CSS_CLASS).length).toBe(
            singleLineSeries[0].data.length - 1
        )
    })
})

describe('With Annotations', () => {
    it('Should render the Annotations as expected', () => {
        render(
            <LineChart
                data={singleLineSeries}
                labels={categories}
                annotations={{
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
                }}
            />
        )

        expect(screen.queryByTestId('spinner-container')).toBe(null)
        expect(document.querySelector(MAIN_CSS_CLASS)).toBeInTheDocument()
        expect(
            document.querySelector(ANNOTATIONS_CSS_CLASSES.xAxis + ' text')
        ).toBeInTheDocument()
        expect(
            document.querySelector(ANNOTATIONS_CSS_CLASSES.xAxis + ' text')
        ).toHaveTextContent('Vertical Threshold')
    })
})

describe('Loading state', () => {
    it('Should render a Spinner with an informative text', () => {
        render(
            <LineChart data={singleLineSeries} labels={categories} loading />
        )

        expect(document.querySelector(MAIN_CSS_CLASS)).not.toBeInTheDocument()
        expect(screen.getByTestId('spinner-container')).toBeInTheDocument()
    })
})

import { categories, singleLineSeries } from '@data/index'
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import LineChart from '../LineChart'

describe('LineChart Component', () => {
    it('Should be rendered correctly', () => {
        render(<LineChart data={singleLineSeries} labels={categories} />)

        expect(document.querySelector('.apexcharts-canvas')).toBeInTheDocument()
    })
})

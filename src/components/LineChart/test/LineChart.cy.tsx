import { categories, singleLineSeries } from '@data/index'
import LineChart from '../LineChart'

describe('Interactions', () => {
    it('Should call the onClick function when passed as input', () => {
        cy.on('window:alert', (text) => {
            expect(text).to.eq('Click!')
        })

        const onClick = () => alert('Click!')
        cy.mount(
            <LineChart
                data={singleLineSeries}
                labels={categories}
                onClick={onClick}
            />
        )
        cy.get('svg').should('be.visible')
        cy.get('svg').realClick()
    })

    it('Should present a tooltip when hovering on the Chart', () => {
        cy.mount(<LineChart data={singleLineSeries} labels={categories} />)
        cy.get('.apexcharts-tooltip').should('not.be.visible')
        cy.get('svg').realHover()
        cy.get('.apexcharts-tooltip').should('be.visible')
    })
})

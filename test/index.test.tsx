import React from 'react'
import { render } from '@testing-library/react'

import sc, { ThemedBaseStyledInterface } from 'styled-components'
import emotion from '@emotion/styled'

import when from '../src'

const libraries = [
    { name: 'styled-components', styled: sc as any },
    { name: 'emotion', styled: emotion as any },
]

libraries.forEach(({ name, styled }: { name: string; styled: ThemedBaseStyledInterface<any> }) => {
    describe(name, () => {
        test('prop key', () => {
            const Text = styled.span<{ strong?: boolean }>`
                font-weight: regular;

                ${when('strong')} {
                    font-weight: bold;
                }
            `

            const { getByText } = render(
                <>
                    <Text>normal</Text>
                    <Text strong>strong</Text>
                </>
            )

            const normal = getByText('normal')
            const strong = getByText('strong')

            expect(window.getComputedStyle(normal).fontWeight).toBe('regular')
            expect(window.getComputedStyle(strong).fontWeight).toBe('bold')
        })

        test('prop callback', () => {
            const Text = styled.span<{ strong?: boolean }>`
                font-weight: regular;

                ${when(props => props.strong)} {
                    font-weight: bold;
                }
            `

            const { getByText } = render(
                <>
                    <Text>normal</Text>
                    <Text strong>strong</Text>
                </>
            )

            const normal = getByText('normal')
            const strong = getByText('strong')

            expect(window.getComputedStyle(normal).fontWeight).toBe('regular')
            expect(window.getComputedStyle(strong).fontWeight).toBe('bold')
        })

        test('constant', () => {
            const createTextComponent = ({ isEmbedded }: { isEmbedded: boolean }) => styled.span`
                font-weight: regular;

                ${when(isEmbedded)} {
                    font-weight: bold;
                }
            `

            const NoramlText = createTextComponent({ isEmbedded: false })
            const normal = render(<NoramlText>normal</NoramlText>).getByText('normal')

            const EmbedddText = createTextComponent({ isEmbedded: true })
            const embedded = render(<EmbedddText>embedded</EmbedddText>).getByText('embedded')

            expect(window.getComputedStyle(normal).fontWeight).toBe('regular')
            expect(window.getComputedStyle(embedded).fontWeight).toBe('bold')
        })
    })
})

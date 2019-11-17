import React from 'react'
import styled from 'styled-components'
import { render } from '@testing-library/react'

import when from '../src'

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

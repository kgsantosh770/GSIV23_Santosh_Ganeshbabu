import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Pagination from '../Pagination/Pagination'

describe('Pagination', () => {
    const totalPages = 28

    beforeEach(() => {
        render(
            <Pagination totalPages={totalPages} />
        )
    })

    it('should render properly', () => {
        const paginatedElement = screen.getByRole('navigation')
        expect(paginatedElement).toHaveClass('pagination')
        expect(paginatedElement).toBeInTheDocument()
    })

    it('should have focus on 1st page on load', () => {
        const paginatedElement = screen.getByRole('navigation')
        const activeButton = paginatedElement?.querySelector('.active')
        expect(activeButton).toHaveTextContent('1')
    })

    it('should have the previous button disabled only if the page is 1', () => {
        const previousButton = screen.getByText('◀').parentElement
        expect(previousButton).toHaveClass('disabled')

        const pageTwoButton = screen.getByText('2')
        expect(pageTwoButton).toBeInTheDocument()

        pageTwoButton && fireEvent.click(pageTwoButton)
        expect(previousButton).not.toHaveClass('disabled')
    })

    it('should have next button disabled when it is last page', () => {
        const nextButton = screen.getByText('▶').parentElement
        expect(nextButton).not.toHaveClass('disabled')

        const lastPageButton = screen.getByText(totalPages)
        lastPageButton && fireEvent.click(lastPageButton)
        expect(nextButton).toHaveClass('disabled')
    })

    it('should show the first 2 and last 2 page numbers always', () => {
        const page1 = screen.getByText('1')
        const page2 = screen.getByText('2')
        const lastPreviousPage = screen.getByText(totalPages - 1)
        const lastPage = screen.getByText(totalPages)

        expect(page1).toBeInTheDocument()
        expect(page2).toBeInTheDocument()
        expect(lastPreviousPage).toBeInTheDocument()
        expect(lastPage).toBeInTheDocument()
    })

    it('should make the clicked page number active', () => {
        const clickPage = screen.getByText('2')
        fireEvent.click(clickPage)
        expect(clickPage.parentElement).toHaveClass('active')
    })

    it('should show the next page when the visible page is clicked', () => {
        const secondPage = screen.getByText('2')
        fireEvent.click(secondPage)
        const thirdPage = screen.getByText('3')
        expect(thirdPage).toBeInTheDocument()
    })

})

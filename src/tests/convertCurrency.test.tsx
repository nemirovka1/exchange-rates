import { render, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CurrencyConverter } from '../component/CurrencyConverter'

describe('CurrencyConverter component', () => {
    it('should render without errors', () => {
        const { container } = render(<CurrencyConverter />);
        expect(container).toBeInTheDocument();
    });

    it('should require the input to be non-empty before Convert button click', async () => {
        const { getByText, getByLabelText } = render(<CurrencyConverter />)
        const convertButton = getByText('Convert')
        const inputChange = getByLabelText('Change') as HTMLInputElement

        fireEvent.change(inputChange, { target: { value: '123' } })
        fireEvent.click(convertButton)

        await waitFor(() => {
            expect(inputChange.value.length).toBeGreaterThan(0)
        })
    })

    it('should only allow numbers in the Change input', async () => {
        const { getByLabelText } = render(<CurrencyConverter />)
        const inputChange = getByLabelText('Change') as HTMLInputElement
        fireEvent.change(inputChange, { target: { value: '123' } })

        await waitFor(() => {
            expect(inputChange.value).toBe('123')
        });
        fireEvent.change(inputChange, { target: { value: 'abc' } })

        await waitFor(() => {
            expect(inputChange.value).toBe('')
        })
    })
    it('should swap currencies and update input values on Swap button click', async () => {
        const { getByLabelText, getByTestId } = render(<CurrencyConverter />)
        const inputChange = getByLabelText('Change') as HTMLInputElement
        const getButton = getByLabelText('Get') as HTMLInputElement
        const swapButton = getByTestId('swap-button')

        fireEvent.change(inputChange, { target: { value: '100' } })
        fireEvent.click(swapButton)

        await waitFor(() => {
            expect(inputChange.value).toBe(getButton.value)
        })
    })
    it('should convert currencies on Convert button click', async () => {
        const { getByLabelText, getByRole }: any = render(<CurrencyConverter />)
        const inputChange = getByLabelText('Change') as HTMLInputElement
        const convertButton = getByRole('button', { name: /Convert/i })

        fireEvent.change(inputChange, { target: { value: '100' } })
        fireEvent.click(convertButton)

        await waitFor(() => {
            expect(getByLabelText('Get').value).toBeTruthy()
        })
    })
    it('should display the correct result after conversion', async () => {
        const { getByLabelText, getByRole }: any = render(<CurrencyConverter />)
        const inputChange = getByLabelText('Change') as HTMLInputElement
        const convertButton = getByRole('button', { name: /Convert/i })

        fireEvent.change(inputChange, { target: { value: '100' } })
        fireEvent.click(convertButton)

        await waitFor(() => {
            const result:any = getByLabelText('Get').value
            expect(parseFloat(result)).toBeGreaterThan(0)
        })
    })
    it('should calculate conversion result correctly on button click', async () => {
        const { getByLabelText, getByRole } = render(<CurrencyConverter />);
        const inputChange = getByLabelText('Change') as HTMLInputElement;
        const convertButton = getByRole('button', { name: /Convert/i });

        fireEvent.change(inputChange, { target: { value: '100' } });
        fireEvent.click(convertButton);

        await waitFor(() => {
            const resultElement = getByLabelText('Get') as HTMLInputElement;
            expect(resultElement.value).toBe('4000.67');
        });
    });
});

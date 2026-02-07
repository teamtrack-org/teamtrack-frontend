import { render, screen } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage Component', () => {
    it('renders the error message correctly', () => {
        const message = 'Something went wrong';
        render(<ErrorMessage message={message} />);

        expect(screen.getByText(message)).toBeInTheDocument();
    });

    it('renders with correct styling', () => {
        const message = 'Error';
        const { container } = render(<ErrorMessage message={message} />);

        // Basic check to see if it has the error styles class or inline styles
        // Since we used inline styles, we check the text color in the div's style or a known attribute
        const div = container.firstChild as HTMLElement;
        expect(div).toHaveStyle({ color: '#b91c1c' }); // matches global hex definition in component
    });
});

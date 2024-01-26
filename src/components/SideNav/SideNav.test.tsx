import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import SideNav from './SideNav';
import '@testing-library/jest-dom';

describe('SideNav Component', () => {
    beforeEach(() => {
        render(
            <Router>
                <SideNav />
            </Router>
        );
    });

    it('renders without crashing', () => {
        expect(screen.getByLabelText(/side navigation/i)).toBeInTheDocument();
    });

    it('renders the correct number of navigation links', () => {
        const links = screen.getAllByRole('link');
        expect(links).toHaveLength(5);
    });

    it('renders the correct link text and URLs', () => {
        const expectedLinks = [
            { name: 'Dashboard', url: '/dashboard' },
            { name: 'Businesses', url: '/businesses' },
            { name: 'Certifications', url: '/certifications' },
            { name: 'Loans', url: '/loans' },
            { name: 'Help', url: '/help' }
        ];

        expectedLinks.forEach(link => {
            expect(screen.getByText(link.name).closest('a')).toHaveAttribute('href', link.url);
        });
    });
});

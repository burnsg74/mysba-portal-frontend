import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import SideNav from './SideNav'
import '@testing-library/jest-dom';

type SideNavProps = {
  onNavLinkClick: () => void; forMobile: boolean;
};

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key:string) => key
  })
}));

const renderSideNav = (props:SideNavProps) => {
  return render(
    <Router>
      <SideNav {...props} />
    </Router>
  );
};

describe('SideNav component', () => {
  const onNavLinkClick = jest.fn();
  
  afterEach(() => {
    jest.clearAllMocks();
  });  
  
  it('renders navigation links and responds to click events', () => {
    renderSideNav({ onNavLinkClick, forMobile: false });

    const link = screen.getByTitle('Dashboard');
    fireEvent.click(link);
    expect(onNavLinkClick).toHaveBeenCalled();
    expect(link).toHaveAttribute('data-testid', 'side-nav-link-Dashboard');
  });

  it('applies active class based on current path', () => {

    renderSideNav({ onNavLinkClick, forMobile: false });

    const activeLink = screen.getByTitle('Dashboard');
    expect(activeLink).toHaveClass('rowActive');
    expect(activeLink.querySelector('div')).toHaveClass('colBarActive');
  });

  it('renders different test-ids for mobile links', () => {
    renderSideNav({ onNavLinkClick, forMobile: true });

    const mobileLink = screen.getByTitle('Dashboard');
    expect(mobileLink).toHaveAttribute('data-testid', 'mobile-nav-link-Dashboard');
  });

  
});

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import showNavSlice from 'src/store/showNav/showNavSlice';
import Layout from 'src/components/Layout/Layout';
import { useTranslation } from 'react-i18next';
import "@testing-library/jest-dom";

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/dashboard',
  }),
}));

jest.mock('src/components/Header/Header', () => () => <div>MockHeader</div>);
jest.mock('src/components/SideNav/SideNav', () => () => <div>MockSideNav</div>);
jest.mock('src/components/LearningCenterCard/LearningCenterCard', () => (props: LearningCenterCardProps) => <div>{props.learningCenter.title}</div>);

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key:string) => key,
  }),
}));


const store = configureStore({
  reducer: {
    showNav: showNavSlice,
  },
  preloadedState: {
    showNav: { value: true, showProfile: true },
  },
});

interface WrapperProps {
    children: React.ReactNode;
  }

const wrapper = ({ children }: WrapperProps) => (
  <Provider store={store}>
    <MemoryRouter>
      {children}
    </MemoryRouter>
  </Provider>
);

describe('Layout component tests', () => {
  test('renders correctly with given state from Redux', () => {
    render(<Layout />, { wrapper });
    expect(screen.getByText('MockHeader')).toBeInTheDocument();
    expect(screen.getByText('MockSideNav')).toBeInTheDocument();
  });

  test('renders correct number of LearningCenterCards based on courses', () => {
    
    render(<Layout />, { wrapper });
    expect(screen.getAllByText('Resources for you').length).toBe(2);
  });
});


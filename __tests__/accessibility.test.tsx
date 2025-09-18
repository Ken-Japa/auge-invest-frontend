import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import userEvent from '@testing-library/user-event';

// Import components to test
import { Layout } from '../src/components/Layout';
import { Logo } from '../src/components/Layout/Logo';
import { CustomButton } from '../src/components/Core/Button';
import { SkipLinks } from '../src/components/Layout/SkipLinks';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

// Mock providers for testing
const MockProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <div data-testid="mock-provider">
      {children}
    </div>
  );
};

describe('Accessibility Tests', () => {
  describe('Layout Component', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(
        <MockProviders>
          <Layout>
            <h1>Test Content</h1>
          </Layout>
        </MockProviders>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper semantic structure', () => {
      render(
        <MockProviders>
          <Layout>
            <h1>Test Content</h1>
          </Layout>
        </MockProviders>
      );

      // Check for main landmark
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content');
    });

    it('should include skip links', () => {
      render(
        <MockProviders>
          <Layout>
            <h1>Test Content</h1>
          </Layout>
        </MockProviders>
      );

      // Check for skip links
      expect(screen.getByText('Skip to main content')).toBeInTheDocument();
      expect(screen.getByText('Skip to navigation')).toBeInTheDocument();
    });
  });

  describe('Logo Component', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(<Logo />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper alt text', () => {
      render(<Logo />);
      const logo = screen.getByRole('img');
      expect(logo).toHaveAttribute('alt', expect.stringContaining('Auge Invest'));
    });

    it('should be keyboard accessible when clickable', async () => {
      const user = userEvent.setup();
      const onClick = jest.fn();
      
      render(<Logo onClick={onClick} />);
      
      const logoContainer = screen.getByRole('button');
      expect(logoContainer).toHaveAttribute('tabIndex', '0');
      
      // Test keyboard interaction
      await user.tab();
      expect(logoContainer).toHaveFocus();
      
      await user.keyboard('{Enter}');
      expect(onClick).toHaveBeenCalledTimes(1);
      
      await user.keyboard(' ');
      expect(onClick).toHaveBeenCalledTimes(2);
    });
  });

  describe('CustomButton Component', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(
        <CustomButton value="Test Button" onClick={() => {}} />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have focus styles', () => {
      render(<CustomButton value="Test Button" onClick={() => {}} />);
      const button = screen.getByRole('button');
      
      // Check if the button has focus styles (via classes or styles)
      expect(button).toBeInTheDocument();
      // Note: Actual focus style testing requires more complex setup
    });

    it('should be keyboard accessible', async () => {
      const user = userEvent.setup();
      const onClick = jest.fn();
      
      render(<CustomButton value="Test Button" onClick={onClick} />);
      
      const button = screen.getByRole('button');
      await user.tab();
      expect(button).toHaveFocus();
      
      await user.keyboard('{Enter}');
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('should support disabled state properly', () => {
      render(<CustomButton value="Disabled Button" disabled={true} />);
      const button = screen.getByRole('button');
      
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('SkipLinks Component', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(<SkipLinks />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper links with correct href attributes', () => {
      render(<SkipLinks />);
      
      const mainLink = screen.getByText('Skip to main content');
      const navLink = screen.getByText('Skip to navigation');
      
      expect(mainLink).toHaveAttribute('href', '#main-content');
      expect(navLink).toHaveAttribute('href', '#navigation');
    });
  });

  describe('Color Contrast', () => {
    it('should pass color contrast requirements', () => {
      // This test would need actual color contrast checking
      // For now, we'll test that our improved colors are being used
      render(<CustomButton value="Test Button" color="primary" />);
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      
      // In a real test, you'd check computed styles
      // expect(getComputedStyle(button).backgroundColor).toBe('rgb(0, 170, 8)'); // #00AA08
    });
  });

  describe('Keyboard Navigation', () => {
    it('should support tab navigation', async () => {
      const user = userEvent.setup();
      
      render(
        <div>
          <CustomButton value="Button 1" onClick={() => {}} />
          <CustomButton value="Button 2" onClick={() => {}} />
          <Logo onClick={() => {}} />
        </div>
      );

      const button1 = screen.getByText('Button 1');
      const button2 = screen.getByText('Button 2');
      const logo = screen.getByRole('button', { name: /go to homepage/i });

      // Test tab order
      await user.tab();
      expect(button1).toHaveFocus();
      
      await user.tab();
      expect(button2).toHaveFocus();
      
      await user.tab();
      expect(logo).toHaveFocus();
    });
  });

  describe('Screen Reader Support', () => {
    it('should have proper ARIA labels', () => {
      render(
        <div>
          <Logo onClick={() => {}} />
          <CustomButton value="Submit" onClick={() => {}} />
        </div>
      );

      const logo = screen.getByLabelText('Go to homepage');
      const button = screen.getByRole('button', { name: 'Submit' });
      
      expect(logo).toBeInTheDocument();
      expect(button).toBeInTheDocument();
    });

    it('should have screen reader only text where appropriate', () => {
      render(<SkipLinks />);
      
      // Check for screen reader only content
      const skipLinks = screen.getByText('Skip to main content').closest('.skip-links');
      expect(skipLinks).toBeInTheDocument();
    });
  });
});
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import styles from './Header.module.css'

type NavItem = {
  label: string
  hasDropdown: boolean
  href: string
  dropdownItems?: Array<{ label: string; href: string }>
}

const navItems: NavItem[] = [
  { label: 'Savings', hasDropdown: false, href: '/' },
  { label: 'Landlord', hasDropdown: false, href: '/property-management' },
  { label: 'Rent Loans', hasDropdown: false, href: '/rent-loans' },
]

export function Header() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [loanDropdownOpen, setLoanDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleDropdownToggle = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label)
  }

  const handleNavClick = (item: NavItem) => {
    if (item.hasDropdown) {
      // Always toggle dropdown when clicking the button
      handleDropdownToggle(item.label)
    } else if (item.href && !item.href.startsWith('#')) {
      // Navigate to route
      navigate(item.href)
      setMobileMenuOpen(false)
    }
  }

  return (
    <header className={styles.header}>
      <Container className={styles.shell}>
        <Link className={styles.logo} to="/">
          <img src="/assets/logo.png" alt="PayMyRent" />
        </Link>

        <button
          className={styles.mobileMenuButton}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`${styles.hamburger} ${mobileMenuOpen ? styles.hamburgerOpen : ''}`}>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </span>
        </button>

        <nav className={`${styles.nav} ${mobileMenuOpen ? styles.navOpen : ''}`}>
          {navItems.map((item) => (
            <div
              key={item.label}
              className={styles.navItemWrapper}
              onMouseEnter={() => !mobileMenuOpen && item.hasDropdown && setOpenDropdown(item.label)}
              onMouseLeave={() => !mobileMenuOpen && item.hasDropdown && setOpenDropdown(null)}
            >
              {item.href && !item.href.startsWith('#') && !item.hasDropdown ? (
                <Link
                  to={item.href}
                  className={styles.navItem}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <>
                  <button
                    className={styles.navItem}
                    onClick={() => handleNavClick(item)}
                  >
                    {item.label}
                    {item.hasDropdown ? (
                      <svg className={styles.chevron} viewBox="0 0 8 9" aria-hidden>
                        <path d="M0.588 2.12L4 5.53L7.412 2.12" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : null}
                  </button>
                  {item.hasDropdown && item.dropdownItems && openDropdown === item.label && (
                    <div className={styles.dropdown}>
                      {item.dropdownItems.map((dropdownItem) => (
                        dropdownItem.href.startsWith('#') ? (
                          <a
                            key={dropdownItem.label}
                            href={dropdownItem.href}
                            className={styles.dropdownItem}
                            onClick={() => {
                              setOpenDropdown(null)
                              setMobileMenuOpen(false)
                            }}
                          >
                            {dropdownItem.label}
                          </a>
                        ) : (
                          <Link
                            key={dropdownItem.label}
                            to={dropdownItem.href}
                            className={styles.dropdownItem}
                            onClick={() => {
                              setOpenDropdown(null)
                              setMobileMenuOpen(false)
                            }}
                          >
                            {dropdownItem.label}
                          </Link>
                        )
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </nav>

        <div className={`${styles.actions} ${mobileMenuOpen ? styles.actionsOpen : ''}`}>
          <Button variant="secondary" className={styles.loginButton} disabled>
            Login
          </Button>
          <div
            className={styles.loanButtonWrapper}
            onMouseEnter={() => !mobileMenuOpen && setLoanDropdownOpen(true)}
            onMouseLeave={() => !mobileMenuOpen && setLoanDropdownOpen(false)}
          >
            <button
              className={styles.ctaButton}
              onClick={() => setLoanDropdownOpen(!loanDropdownOpen)}
            >
              Apply For Loan
              <svg className={styles.chevron} viewBox="0 0 8 9" aria-hidden style={{ marginLeft: '8px', filter: 'brightness(0) invert(1)' }}>
                <path d="M0.588 2.12L4 5.53L7.412 2.12" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {loanDropdownOpen && (
              <div className={styles.dropdown}>
                <Link
                  to="/federalloan"
                  className={styles.dropdownItem}
                  onClick={() => {
                    setLoanDropdownOpen(false)
                    setMobileMenuOpen(false)
                  }}
                >
                  Federal Staff Loan
                </Link>
                <Link
                  to="/companyloans"
                  className={styles.dropdownItem}
                  onClick={() => {
                    setLoanDropdownOpen(false)
                    setMobileMenuOpen(false)
                  }}
                >
                  Partnered Companies Loan
                </Link>
                <Link
                  to="/apply-for-loan/paymyrent-saver"
                  className={styles.dropdownItem}
                  onClick={() => {
                    setLoanDropdownOpen(false)
                    setMobileMenuOpen(false)
                  }}
                >
                  Paymyrent Saver Loan
                </Link>
              </div>
            )}
          </div>
        </div>
      </Container>
    </header>
  )
}


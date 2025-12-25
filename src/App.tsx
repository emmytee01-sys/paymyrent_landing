import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { HeroSection } from './components/sections/HeroSection'
import { AutomatedSavingsSection } from './components/sections/AutomatedSavingsSection'
import { FixedDepositSection } from './components/sections/FixedDepositSection'
import { ThirteenthMonthSection } from './components/sections/ThirteenthMonthSection'
import { WealthClubSection } from './components/sections/WealthClubSection'
import { SearchPropertiesSection } from './components/sections/SearchPropertiesSection'
import { RentReportingSection } from './components/sections/RentReportingSection'
import { InvestmentSection } from './components/sections/InvestmentSection'
import { HowItWorksSection } from './components/sections/HowItWorksSection'
import { BenefitsSection } from './components/sections/BenefitsSection'
import { SafeSecureSection } from './components/sections/SafeSecureSection'
import { AwardSection } from './components/sections/AwardSection'
import { CTASection } from './components/sections/CTASection'
import { FooterAwardSection } from './components/sections/FooterAwardSection'
import { LandlordPage } from './components/pages/LandlordPage'
import { PropertyManagementPage } from './components/pages/PropertyManagementPage'
import { TenantScreeningPage } from './components/pages/TenantScreeningPage'
import { RentLoansPage } from './components/pages/RentLoansPage'

function HomePage() {
  return (
    <>
      <HeroSection />
      <AutomatedSavingsSection />
      <FixedDepositSection />
      <ThirteenthMonthSection />
      <WealthClubSection />
      <SearchPropertiesSection 
        heading="Rent Loan"
        body="Save towards your rent for 6 months and access a loan to cover your rent payment in full, with affordable interest rates. This makes it easier to plan and avoid the stress of lump-sum rent payments."
        buttonText="Start Today"
        buttonLink="/rent-loans"
        image="/assets/tenantt.png"
        imageAlt="Rent loan illustration"
      />
      <RentReportingSection />
      <InvestmentSection />
      <HowItWorksSection />
      <BenefitsSection />
      <SafeSecureSection />
      <AwardSection />
      <CTASection />
      <Footer />
      <FooterAwardSection />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/landlord" element={<LandlordPage />} />
            <Route path="/property-management" element={<PropertyManagementPage />} />
            <Route path="/tenant-screening" element={<TenantScreeningPage />} />
            <Route path="/rent-loans" element={<RentLoansPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App

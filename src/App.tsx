import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { HeroSection } from './components/sections/HeroSection'
import { AutomatedSavingsSection } from './components/sections/AutomatedSavingsSection'
import { FixedDepositSection } from './components/sections/FixedDepositSection'
import { ThirteenthMonthSection } from './components/sections/ThirteenthMonthSection'
import { SearchPropertiesSection } from './components/sections/SearchPropertiesSection'
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

function HomePage() {
  return (
    <>
      <HeroSection />
      <AutomatedSavingsSection />
      <FixedDepositSection />
      <ThirteenthMonthSection />
      <SearchPropertiesSection />
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
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App

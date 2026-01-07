import { InvestmentHeroSection } from '../sections/InvestmentHeroSection'
import { AutomatedSavingsSection } from '../sections/AutomatedSavingsSection'
import { FixedDepositSection } from '../sections/FixedDepositSection'
import { ThirteenthMonthSection } from '../sections/ThirteenthMonthSection'
import { WealthClubSection } from '../sections/WealthClubSection'
import { SearchPropertiesSection } from '../sections/SearchPropertiesSection'
import { RentReportingSection } from '../sections/RentReportingSection'
import { InvestmentSection } from '../sections/InvestmentSection'
import { HowItWorksSection } from '../sections/HowItWorksSection'
import { BenefitsSection } from '../sections/BenefitsSection'
import { SafeSecureSection } from '../sections/SafeSecureSection'
import { AwardSection } from '../sections/AwardSection'
import { CTASection } from '../sections/CTASection'
import { Footer } from '../layout/Footer'
import { FooterAwardSection } from '../sections/FooterAwardSection'

export function InvestmentPage() {
  return (
    <>
      <InvestmentHeroSection />
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


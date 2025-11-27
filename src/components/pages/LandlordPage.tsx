import { Footer } from '../layout/Footer'
import { FooterAwardSection } from '../sections/FooterAwardSection'
import { LandlordHeroSection } from '../sections/landlord/LandlordHeroSection'
import { TenantScreeningSection } from '../sections/landlord/TenantScreeningSection'
import { PropertyManagementSection } from '../sections/landlord/PropertyManagementSection'
import { GetTenantSection } from '../sections/landlord/GetTenantSection'
import { LandlordHowItWorksSection } from '../sections/landlord/LandlordHowItWorksSection'
import { LandlordBenefitsSection } from '../sections/landlord/LandlordBenefitsSection'
import { SafeSecureSection } from '../sections/SafeSecureSection'
import { AwardSection } from '../sections/AwardSection'
import { CTASection } from '../sections/CTASection'

export function LandlordPage() {
  return (
    <>
      <LandlordHeroSection />
      <TenantScreeningSection />
      <GetTenantSection />
      <PropertyManagementSection />
      <LandlordHowItWorksSection />
      <LandlordBenefitsSection />
      <SafeSecureSection />
      <AwardSection />
      <CTASection />
      <Footer />
      <FooterAwardSection />
    </>
  )
}




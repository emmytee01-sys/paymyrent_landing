import { Footer } from '../layout/Footer'
import { FooterAwardSection } from '../sections/FooterAwardSection'
import { TenantScreeningHeroSection } from '../sections/tenant-screening/TenantScreeningHeroSection'
import { TenantScreeningSection } from '../sections/landlord/TenantScreeningSection'
import { ExistingTenantScreeningSection } from '../sections/tenant-screening/ExistingTenantScreeningSection'
import { TenantScreeningHowItWorksSection } from '../sections/tenant-screening/TenantScreeningHowItWorksSection'
import { SafeSecureSection } from '../sections/SafeSecureSection'
import { AwardSection } from '../sections/AwardSection'
import { CTASection } from '../sections/CTASection'

export function TenantScreeningPage() {
  return (
    <>
      <TenantScreeningHeroSection />
      <TenantScreeningSection buttonText="Screen a prospective tenant" />
      <ExistingTenantScreeningSection />
      <TenantScreeningHowItWorksSection />
      <SafeSecureSection />
      <AwardSection />
      <CTASection />
      <Footer />
      <FooterAwardSection />
    </>
  )
}


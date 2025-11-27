import { Footer } from '../layout/Footer'
import { FooterAwardSection } from '../sections/FooterAwardSection'
import { PropertyManagementHeroSection } from '../sections/property-management/PropertyManagementHeroSection'
import { TenantScreeningSection } from '../sections/landlord/TenantScreeningSection'
import { EffectiveAdvertisementSection } from '../sections/property-management/EffectiveAdvertisementSection'
import { PrepareRentalAgreementsSection } from '../sections/property-management/PrepareRentalAgreementsSection'
import { RentCollectionSection } from '../sections/property-management/RentCollectionSection'
import { PropertyMaintenanceSection } from '../sections/property-management/PropertyMaintenanceSection'
import { TenantEvictionSection } from '../sections/property-management/TenantEvictionSection'
import { PropertyManagementHowItWorksSection } from '../sections/property-management/PropertyManagementHowItWorksSection'
import { SafeSecureSection } from '../sections/SafeSecureSection'
import { AwardSection } from '../sections/AwardSection'
import { CTASection } from '../sections/CTASection'

export function PropertyManagementPage() {
  return (
    <>
      <PropertyManagementHeroSection />
      <TenantScreeningSection buttonText="Screen a prospective tenant" />
      <EffectiveAdvertisementSection />
      <RentCollectionSection />
      <PropertyMaintenanceSection />
      <PrepareRentalAgreementsSection />
      <TenantEvictionSection />
      <PropertyManagementHowItWorksSection />
      <SafeSecureSection />
      <AwardSection />
      <CTASection />
      <Footer />
      <FooterAwardSection />
    </>
  )
}


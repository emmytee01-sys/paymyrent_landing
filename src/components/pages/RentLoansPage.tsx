import { HeroSection } from '../sections/HeroSection'
import heroStyles from '../sections/HeroSection.module.css'
import { AutomatedSavingsSection } from '../sections/AutomatedSavingsSection'
import autoSavingsStyles from '../sections/AutomatedSavingsSection.module.css'
import { FixedDepositSection } from '../sections/FixedDepositSection'
import { ThirteenthMonthSection } from '../sections/ThirteenthMonthSection'
import { SearchPropertiesSection } from '../sections/SearchPropertiesSection'
import { InvestmentSection } from '../sections/InvestmentSection'
import { HowItWorksSection } from '../sections/HowItWorksSection'
import howItWorksStyles from '../sections/HowItWorksSection.module.css'
import { SafeSecureSection } from '../sections/SafeSecureSection'
import { AwardSection } from '../sections/AwardSection'
import { CTASection } from '../sections/CTASection'
import { Footer } from '../layout/Footer'
import { FooterAwardSection } from '../sections/FooterAwardSection'

export function RentLoansPage() {
  return (
    <>
      <HeroSection 
        heroImage="/assets/rentt.jpeg"
        headingLine1={<><span className={heroStyles.highlight}>Rent Loan</span>,</>}
        headingLine2={<>designed just for <span className={heroStyles.highlight}>you</span></>}
        description="Save consistently for 6 months and qualify for a loan to help cover your rent when it's due."
      />
      <AutomatedSavingsSection 
        heading="Eligibility"
        image="/assets/rent_loan2.png"
        imageAlt="Eligibility requirements"
        body={
          <ul className={autoSavingsStyles.bodyList}>
            <li>19 years +</li>
            <li>Proof of tenancy</li>
            <li>Proof of past rent payment</li>
            <li>Proof of income</li>
            <li>Save on Paymyrent for 6 months</li>
          </ul>
        }
      />
      <FixedDepositSection 
        heading="Low Interest"
        body="Save consistently and enjoy rent loans at interest rates as low as 20%, helping you stay housed without unnecessary financial pressure."
        image="/assets/rent_loan3.png"
        imageAlt="Low interest rent loans"
      />
      <ThirteenthMonthSection 
        heading="Monthly Rent Payment"
        body="Save on Paymyrent for 6months, get a loan to pay your house rent in full. Repay loan monthly for 6 months. With this, we have helped you structure your rent into monthly repayment."
        image="/assets/rent_loan4.png"
        imageAlt="Monthly rent payment"
        showComingSoon={false}
      />
      <SearchPropertiesSection 
        heading="Support Your Employees with Rent Loans"
        body="Partner with PayMyRent to give your staff access to affordable rent loans, helping them pay rent upfront and repay conveniently through monthly deductions."
        buttonText="Start an Employer Partnership"
        image="/assets/fd90ba5a20895b9a3ecb1a551f5e20eb06bc900f.png"
        imageAlt="Employer partnership for rent loans"
      />
      <InvestmentSection 
        heading="Rent Support Program for Civil Servants"
        body="State Governments and public institutions can partner with PayMyRent to provide structured rent loans to employees. Rent is paid upfront, while repayments are deducted monthly through payroll—ensuring accountability, affordability, and workforce stability."
        buttonText="Register Your Agency"
        image="/assets/investt-removebg-preview.png"
        imageAlt="Rent support program for civil servants"
      />
      <HowItWorksSection 
        heading="How Our Lending Platform Works"
        steps={[
          {
            number: '1',
            body: (
              <>
                - <span className={howItWorksStyles.stepBodyBold}>Individuals</span> - Download the PayMyRent app, select Rent Loan, and save monthly for 6 months. Once you qualify, you'll receive a loan application code to complete your rent loan request.
              </>
            ),
          },
          {
            number: '2',
            body: (
              <>
                - <span className={howItWorksStyles.stepBodyBold}>Employer Partnerships</span> - If your employer partners with PayMyRent, simply apply for a rent loan in the app and enter your employer code /Name to access rent support through your workplace.
              </>
            ),
          },
          {
            number: '3',
            body: (
              <>
                - <span className={howItWorksStyles.stepBodyBold}>Repay Monthly</span> - Repay your rent loan in easy, equal monthly instalments, making rent more affordable and reducing financial stress.
              </>
            ),
          },
        ]}
      />
      <SafeSecureSection />
      <AwardSection />
      <CTASection />
      <Footer />
      <FooterAwardSection />
    </>
  )
}


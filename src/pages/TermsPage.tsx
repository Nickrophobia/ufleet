import { useState, useEffect } from 'react';
import Header from '../sections/Header';

const bgImages = [
  '/freight_solutions_truck.jpg',
  '/nationwide_coverage_aerial.jpg',
  '/always_on_driver.jpg',
  '/precision_logistics_warehouse.jpg',
  '/end_to_end_support_office.jpg',
  '/hero_highway.jpg',
  '/industry_agriculture.jpg',
  '/industry_automotive.jpg',
  '/industry_manufacturing.jpg',
];

const TermsPage = () => {
  const [bgImage, setBgImage] = useState<string>('');

  useEffect(() => {
    const idx = Math.floor(Math.random() * bgImages.length);
    setBgImage(bgImages[idx]);
  }, []);

  return (
    <div className="relative min-h-screen text-white">
      {/* background image with blur */}
      <div
        className="absolute inset-0 bg-center bg-cover filter blur-sm"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      {/* overlay to darken a bit */}
      <div className="absolute inset-0 bg-navy/60" />

      <Header />
      <main className="relative pt-24 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto relative">
          <div className="absolute inset-0 bg-white/50 backdrop-blur-md rounded shadow" />
          <div className="relative z-10 text-navy p-8">
            <h1 className="text-2xl font-bold mb-4">Terms and Conditions</h1>
          <p><strong>Effective Date:</strong> April 16, 2023</p>
          <p><strong>Company Name:</strong> United Fleet Corp</p>
          <p><strong>Website:</strong> <a href="https://ufleetcorp.com" className="underline" target="_blank" rel="noreferrer">https://ufleetcorp.com</a></p>

          <h2 className="mt-6 text-xl font-semibold">1. Acceptance of Terms</h2>
          <p>By accessing or using the website <a href="https://ufleetcorp.com" className="underline" target="_blank" rel="noreferrer">https://ufleetcorp.com</a>, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree, please do not use the site.</p>

          <h2 className="mt-6 text-xl font-semibold">2. Use of Website</h2>
          <p>You agree to use this site only for lawful purposes. You may not:</p>
          <ul className="list-disc pl-6">
            <li>Use the site in any way that may damage or impair its functionality or content.</li>
            <li>Attempt to gain unauthorized access to any part of the site or systems.</li>
            <li>Submit false, misleading, or unauthorized information through forms or contact methods.</li>
          </ul>

          <h2 className="mt-6 text-xl font-semibold">3. Intellectual Property</h2>
          <p>All content, logos, text, graphics, and software on this site are the property of United Fleet Corp or its licensors and are protected by copyright and trademark laws. Unauthorized use is strictly prohibited.</p>

          <h2 className="mt-6 text-xl font-semibold">4. Disclaimer</h2>
          <p>The content on this website is for informational purposes only and may be updated or removed at any time. We make no guarantees about the accuracy, completeness, or suitability of the information for your needs.</p>

          <h2 className="mt-6 text-xl font-semibold">5. SMS &amp; Communication Consent</h2>
          <p>By submitting your phone number, you consent to receive communications (including SMS messages) from United Fleet Corp. Message and data rates may apply. Reply <strong>STOP</strong> to opt out or <strong>HELP</strong> for more info. See our <a href="/privacy" className="underline">Privacy Policy</a> for full details.</p>

          <h2 className="mt-6 text-xl font-semibold">6. Limitation of Liability</h2>
          <p>United Fleet Corp is not liable for any direct, indirect, incidental, or consequential damages arising from your use of the site or services, including delays in communication or system failures.</p>

          <h2 className="mt-6 text-xl font-semibold">7. Modifications</h2>
          <p>We reserve the right to change these Terms at any time. Your continued use of the site after changes are posted constitutes your acceptance.</p>

          <h2 className="mt-6 text-xl font-semibold">8. Governing Law</h2>
          <p>These Terms are governed by the laws of the State of Illinois, without regard to its conflict of law principles.</p>

          <h2 className="mt-6 text-xl font-semibold">9. Contact</h2>
          <p>For questions or concerns regarding these Terms, please contact us at:</p>
          <p><strong>Email:</strong> <a href="mailto:hr@ufleetcorp.com" className="underline">hr@ufleetcorp.com</a><br />
          <strong>Phone:</strong> (224) 341-5545<br />
          <strong>Address:</strong> 37 W Briarwood Dr, Streamwood, IL 60107</p>
        </div>
        </div>
      </main>
    </div>
  );
};

export default TermsPage;

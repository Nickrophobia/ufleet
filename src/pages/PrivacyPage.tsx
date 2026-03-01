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

const PrivacyPage = () => {
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
            <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
          <p><strong>Effective Date:</strong> April 16, 2023</p>
          <p><strong>Company Name:</strong> United Fleet Corp</p>
          <p><strong>Address:</strong> 37 W Briarwood Dr, Streamwood, IL 60107</p>
          <p><strong>Website:</strong> <a href="https://ufleetcorp.com" target="_blank" rel="noreferrer" className="underline">https://ufleetcorp.com</a></p>
          <p><strong>Email:</strong> <a href="mailto:hr@ufleetcorp.com" className="underline">hr@ufleetcorp.com</a></p>
          <p><strong>Phone:</strong> (224) 341-5545</p>

          <h2 className="mt-6 text-xl font-semibold">1. Introduction</h2>
          <p>United Fleet Corp ("we", "our", or "us") values your privacy and is committed to protecting your personal information. This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you visit our website and engage with us through digital platforms, including SMS communications.</p>

          <h2 className="mt-6 text-xl font-semibold">2. Information We Collect</h2>
          <p>We may collect personal and business-related information, including but not limited to:</p>
          <ul className="list-disc pl-6">
            <li><strong>Personal Identification Information:</strong> Name, phone number, email address, mailing address, etc.</li>
            <li><strong>Business Information:</strong> Company name, DOT/MC numbers, driver data, equipment details, etc.</li>
            <li><strong>Usage Information:</strong> IP address, browser type, pages visited, device data, and other analytics.</li>
            <li><strong>Communication Preferences:</strong> SMS opt-ins, call logs, email preferences.</li>
          </ul>

          <h2 className="mt-6 text-xl font-semibold">3. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul className="list-disc pl-6">
            <li>Operate and manage our business and services.</li>
            <li>Respond to inquiries and provide customer support.</li>
            <li>Facilitate hiring, onboarding, and HR communications.</li>
            <li>Send updates, alerts, dispatch info, or compliance notifications via email or SMS.</li>
            <li>Comply with legal obligations and regulatory requirements.</li>
          </ul>

          <h2 className="mt-6 text-xl font-semibold">4. SMS Communications (10DLC A2P Compliance)</h2>
          <p>By providing your mobile phone number, you consent to receive text messages from United Fleet Corp regarding company updates, job opportunities, HR notifications, and other operational messages. These messages may be sent via an automated system as part of our registered 10DLC A2P SMS campaigns.</p>
          <p><strong>Message Frequency:</strong> Varies by user.<br />
          <strong>Message &amp; Data Rates May Apply.</strong><br />
          <strong>Opt-Out:</strong> You can opt out at any time by replying STOP to any message.<br />
          <strong>Help:</strong> For assistance, reply HELP or contact us at <a href="mailto:hr@ufleetcorp.com" className="underline">hr@ufleetcorp.com</a> or (224) 341-5545.<br />
          We do not share your phone number or SMS data with third parties for marketing purposes. No mobile opt-in data will be shared with third parties.</p>

          <h2 className="mt-6 text-xl font-semibold">5. Sharing of Information</h2>
          <p>We do not sell, rent, or trade your personal information. We may share it with:</p>
          <ul className="list-disc pl-6">
            <li>Service providers performing work on our behalf (e.g. SMS platforms, web hosting).</li>
            <li>Legal or regulatory authorities when required by law.</li>
            <li>Internal departments (HR, Safety, Dispatch, etc.) for business operations.</li>
          </ul>

          <h2 className="mt-6 text-xl font-semibold">6. Data Security</h2>
          <p>We implement reasonable security measures to protect your data. However, no transmission or storage method is 100% secure. Use our services at your own risk.</p>

          <h2 className="mt-6 text-xl font-semibold">7. Cookies and Tracking Technologies</h2>
          <p>Our website may use cookies and similar tools to improve user experience, analyze traffic, and remember user preferences. You can modify your browser settings to control cookie behavior.</p>

          <h2 className="mt-6 text-xl font-semibold">8. Your Rights</h2>
          <p>You may request access to, correction of, or deletion of your personal data by contacting us at <a href="mailto:hr@ufleetcorp.com" className="underline">hr@ufleetcorp.com</a>.</p>

          <h2 className="mt-6 text-xl font-semibold">9. Changes to This Policy</h2>
          <p>We reserve the right to update this Privacy Policy at any time. Changes will be posted on this page with an updated effective date.</p>
        </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPage;

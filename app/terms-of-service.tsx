import Link from 'next/link';

export default function TermsOfService() {
  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-4">Terms of Service for Credibly</h1>
      <p className="text-gray-500 mb-2">Effective Date: [Insert Date]</p>
      <p className="mb-6">
        Welcome to Credibly, a platform that allows users to rate and review individuals based on
        professional and social traits. By accessing or using our website or app, you agree to be
        bound by these Terms of Service and our{' '}
        <Link href="/privacy" className="text-blue-600 underline">
          Privacy Policy
        </Link>
        .<br />
        Please read them carefully.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">1. Use of the Platform</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Use Credibly for lawful, respectful, and constructive purposes.</li>
        <li>
          Only rate individuals you&apos;ve had real, relevant interactions with (e.g., as a
          coworker, classmate, roommate, or employer).
        </li>
        <li>
          Provide honest, factual information in reviews and avoid false, defamatory, or harassing
          content.
        </li>
        <li>Not post discriminatory, hateful, or offensive material.</li>
      </ul>
      <p className="mb-4">
        We reserve the right to remove any content or suspend accounts that violate these
        guidelines.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">2. Account Responsibilities</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>You must be at least 16 years old to use Credibly.</li>
        <li>
          You are responsible for maintaining the confidentiality of your account credentials.
        </li>
        <li>You may not impersonate others or create fake profiles.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">3. Data and Privacy</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>
          We collect limited personal data (such as email, name, and rating information) to operate
          the platform. We do not sell your data. For more details, refer to our{' '}
          <Link href="/privacy" className="text-blue-600 underline">
            Privacy Policy
          </Link>
          .
        </li>
        <li>
          You may request to have your data or account deleted by contacting us at:{' '}
          <a href="mailto:support@crediblyapp.com" className="text-blue-600 underline">
            support@crediblyapp.com
          </a>
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">4. Content Ownership</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>You retain ownership of the content you create (reviews, ratings, etc.).</li>
        <li>
          By posting on Credibly, you grant us a non-exclusive license to display and distribute
          your content within the app and for promotional purposes.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">5. Limitation of Liability</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Credibly is provided &quot;as is.&quot; We are not liable for:</li>
        <ul className="list-disc ml-6">
          <li>Inaccurate or misleading ratings posted by users</li>
          <li>Any emotional distress or reputational harm caused by platform use</li>
          <li>Service interruptions, bugs, or data loss</li>
        </ul>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">6. Termination</h2>
      <p className="mb-4">
        We may suspend or terminate your access to Credibly if you violate these terms or act in a
        way that harms the platform or its users.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">7. Changes to These Terms</h2>
      <p className="mb-4">
        We may update these Terms of Service at any time. Changes will be posted on this page with
        an updated effective date. Continued use of Credibly after changes means you agree to the
        new terms.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">8. Contact Us</h2>
      <p>
        If you have questions or concerns about these Terms, reach out to us at:
        <br />
        <a href="mailto:support@crediblyapp.com" className="text-blue-600 underline">
          📧 support@crediblyapp.com
        </a>
      </p>
    </div>
  );
}

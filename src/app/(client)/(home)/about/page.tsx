import React from 'react';
import { privacyData } from '@/constants';

const About = () => {

  return (
    <section className="flex-center min-h-screen flex-col pt-20 bg-sand-soft bg-[url(/images/pattern.png)]">
       <div className="container mx-auto max-w-6xl px-6 py-12">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-4 text-center text-home">{privacyData.title}</h1>
      <hr className="my-2" />
      <p className="text-center text-sm text-gray-500 mb-10">Last updated: {privacyData.lastUpdated}</p>

      {/* Introduction */}
      <section className="mb-8">
        {privacyData.introduction.map((paragraph, index) => (
          <p key={index} className="mb-4 text-gray-700">
            {paragraph}
          </p>
        ))}
      </section>

      {/* Definitions */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Definitions</h2>
        <ul className="list-disc pl-6 space-y-2">
          {privacyData.definitions.map((definition, index) => (
            <li key={index} className="text-gray-700">
              <span className="font-medium">{definition.term}</span>: {definition.description}
            </li>
          ))}
        </ul>
      </section>

      {/* Types of Data Collected */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Types of Data Collected</h2>

        {/* Personal Data */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Personal Data</h3>
          <p className="mb-2 text-gray-700">Personally identifiable information includes, but is not limited to:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            {privacyData.typesOfDataCollected.personalData.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Usage Data */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Usage Data</h3>
          <p className="text-gray-700">{privacyData.typesOfDataCollected.usageData.description}</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-2">
            {privacyData.typesOfDataCollected.usageData.details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>

        {/* Tracking Technologies */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Tracking Technologies and Cookies</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            {privacyData.typesOfDataCollected.trackingTechnologies.map((tech, index) => (
              <li key={index}>
                <span className="font-medium">{tech.type}:</span> {tech.description}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Cookies */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
        <p className="mb-4 text-gray-700">{privacyData.cookies.description}</p>
        <ul className="list-none space-y-4">
          {privacyData.cookies.types.map((cookie, index) => (
            <li key={index} className="border border-gray-300 rounded p-4">
              <h3 className="font-semibold text-lg">{cookie.name}</h3>
              <p className="text-grey-1 mb-1">Type: {cookie.type}</p>
              <p className="text-grey-1 mb-1">Administered by: {cookie.admin}</p>
              <p className="text-gray-700">Purpose: {cookie.purpose}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Use of Personal Data */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Use of Your Personal Data</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          {privacyData.useOfPersonalData.map((use, index) => (
            <li key={index}>
              <span className="font-medium">{use.purpose}:</span> {use.description}
            </li>
          ))}
        </ul>
      </section>

      {/* Data Sharing */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Sharing of Your Personal Data</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          {privacyData.dataSharing.map((sharing, index) => (
            <li key={index}>
              <span className="font-medium">{sharing.type}:</span> {sharing.description}
            </li>
          ))}
        </ul>
      </section>

      {/* Retention of Data */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Retention of Your Personal Data</h2>
        <p className="text-gray-700 mb-4">{privacyData.retentionOfData.description}</p>
        <p className="text-gray-700">{privacyData.retentionOfData.usageRetention}</p>
      </section>

      {/* Transfer of Data */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Transfer of Your Personal Data</h2>
        <p className="text-gray-700 mb-4">{privacyData.transferOfData.description}</p>
        <p className="text-gray-700 mb-4">{privacyData.transferOfData.consentStatement}</p>
        <p className="text-gray-700">{privacyData.transferOfData.securityAssurance}</p>
      </section>

      {/* Delete Personal Data */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Delete Your Personal Data</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          {privacyData.deletePersonalData.rights.map((right, index) => (
            <li key={index}>{right}</li>
          ))}
        </ul>
        <p className="text-gray-700 mt-2">{privacyData.deletePersonalData.note}</p>
      </section>

      {/* Data Disclosure */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Disclosure of Your Personal Data</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>
            <span className="font-medium">Business Transactions:</span> {privacyData.dataDisclosure.businessTransactions}
          </li>
          <li>
            <span className="font-medium">Law enforcement:</span> {privacyData.dataDisclosure.lawEnforcement}
          </li>
          <li className="text-gray-700">Other legal requirements:</li>
          <ul className="list-disc pl-10 space-y-2">
            {privacyData.dataDisclosure.legalRequirements.map((requirement, index) => (
              <li key={index}>{requirement}</li>
            ))}
          </ul>
        </ul>
      </section>

      {/* Security of Data */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Security of Your Personal Data</h2>
        <p className="text-gray-700">{privacyData.dataSecurity}</p>
      </section>

      {/* Contact Information */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="text-gray-700">If you have any questions about this Privacy Policy, You can contact us:</p>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Email: {privacyData.contact.email}</li>
          <li>Phone: {privacyData.contact.phone}</li>
        </ul>
      </section>
    </div>
    </section>
  );
};

export default About;

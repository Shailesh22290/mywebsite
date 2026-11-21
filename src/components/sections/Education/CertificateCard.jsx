import React from 'react';
import { Award } from 'lucide-react';
import { certifications } from '@/data/education';

// Only certificates actually held (from the CV). Add a real verify link as `verificationUrl` to show one.
const CertificateCard = () => (
  <ul className="grid gap-4 sm:grid-cols-2">
    {[...certifications]
      .sort((a, b) => new Date(b.issueDate) - new Date(a.issueDate))
      .map((c) => (
        <li key={c.id} className="flex gap-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <Award className="h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400 mt-0.5" />
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">{c.name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {c.issuer} · {new Date(c.issueDate).getFullYear()}
            </p>
            {c.description && <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{c.description}</p>}
            {c.verificationUrl && c.verificationUrl !== '#' && (
              <a href={c.verificationUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm text-blue-600 dark:text-blue-400 hover:underline">
                Verify
              </a>
            )}
          </div>
        </li>
      ))}
  </ul>
);

export default CertificateCard;

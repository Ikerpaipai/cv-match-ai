import type { JobMatchReport } from '../../types/job';

type JobMatchCardProps = {
  title: string;
  company: string;
  location: string;
  matchedRequiredSkills: string[];
  matchedOptionalSkills: string[];
  missingSkills: string[];
  matchScore: number;
  report: JobMatchReport;
  url: string;
};

export default function JobMatchCard({
  title,
  company,
  location,
  matchedRequiredSkills = [],
  matchedOptionalSkills = [],
  missingSkills = [],
  matchScore,
  report = {
    strengths: [],
    weaknesses: [],
    recommendation: 'Aucune recommandation disponible',
  },
  url,
}: JobMatchCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>

          <p className="mt-1 text-sm text-gray-500">{company}</p>

          <p className="mt-1 text-sm text-gray-400">{location}</p>
        </div>

        <div className="shrink-0 text-right">
          <p className="text-sm text-gray-500">Match</p>

          <p className="text-2xl font-bold text-gray-900">{matchScore}%</p>
        </div>
      </div>

      {matchedRequiredSkills.length > 0 && (
        <div className="mt-4">
          <p className="mb-2 text-sm font-medium text-gray-700">
            Compétences requises correspondantes
          </p>

          <div className="flex flex-wrap gap-2">
            {matchedRequiredSkills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-green-50 px-3 py-1 text-sm text-green-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {matchedOptionalSkills.length > 0 && (
        <div className="mt-4">
          <p className="mb-2 text-sm font-medium text-gray-700">
            Compétences optionnelles correspondantes
          </p>

          <div className="flex flex-wrap gap-2">
            {matchedOptionalSkills.map((skill) => (
              <span key={skill} className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {missingSkills.length > 0 && (
        <div className="mt-4">
          <p className="mb-2 text-sm font-medium text-gray-700">Compétences manquantes</p>

          <div className="flex flex-wrap gap-2">
            {missingSkills.map((skill) => (
              <span key={skill} className="rounded-full bg-red-50 px-3 py-1 text-sm text-red-700">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-5 border-t border-gray-100 pt-4">
        <p className="text-sm font-medium text-gray-700">Recommandation</p>

        <p className="mt-1 text-sm text-gray-600">{report.recommendation}</p>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Voir l'offre
        </a>
      </div>
    </div>
  );
}

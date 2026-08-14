import { useCv } from '../context/useCv';
import { useJobMatches } from '../hooks/useJobMatches';

import JobMatchCard from '../components/jobs/JobMatchCard';
import { useImportMatches } from '../hooks/useImportMatches';
import type { JobMatch } from '../types/job';
import { useQueryClient } from '@tanstack/react-query';

export default function Opportunities() {
  const { activeCvId } = useCv();

  const { data: matches, isLoading, isError } = useJobMatches(activeCvId);
  const queryClient = useQueryClient();

  const importMatchesMutation = useImportMatches();

  function handleImportMatches() {
    if (!activeCvId) return;

    importMatchesMutation.mutate(
      {
        candidateId: activeCvId,
        limit: 5,
      },
      {
        onSuccess: (newMatches) => {
          queryClient.setQueryData<JobMatch[]>(
            ['job-matches', activeCvId],
            (currentMatches = []) => [...currentMatches, ...newMatches],
          );
        },
      },
    );
  }

  if (!activeCvId) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Opportunités</h1>

        <p className="mt-2 text-gray-500">Sélectionnez un CV pour voir les offres compatibles.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Opportunités</h1>

        <p className="mt-4 text-gray-500">Analyse des offres en cours...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Opportunités</h1>

        <p className="mt-4 text-red-600">Impossible de récupérer les offres.</p>
      </div>
    );
  }
  console.log('MATCHES:', matches);
  return (
    <div>
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Opportunités</h1>

          <p className="mt-2 text-gray-500">Les offres correspondant à votre CV.</p>
        </div>

        <button
          onClick={handleImportMatches}
          disabled={importMatchesMutation.isPending}
          className="
      shrink-0
      rounded-lg
      border
      border-gray-200
      bg-white
      px-4
      py-2
      text-sm
      font-medium
      text-gray-700
      shadow-sm
      transition
      hover:border-blue-300
      hover:bg-blue-50
      hover:text-blue-700
      disabled:cursor-not-allowed
      disabled:opacity-50
    "
        >
          {importMatchesMutation.isPending ? 'Recherche...' : '+ Trouver 5 offres'}
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {matches?.map((match) => (
          <JobMatchCard
            key={match.job.id}
            title={match.job.title}
            company={match.job.company}
            location={match.job.location}
            matchedRequiredSkills={match.matchedRequiredSkills}
            matchedOptionalSkills={match.matchedOptionalSkills}
            missingSkills={match.missingSkills}
            matchScore={match.score}
            report={match.report}
            url={match.job.url}
          />
        ))}
      </div>
    </div>
  );
}

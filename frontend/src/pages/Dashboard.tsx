import StatCard from '../components/dashboard/StatCard';
import JobMatchCard from '../components/jobs/JobMatchCard';

export default function Dashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

        <p className="mt-2 text-gray-500">Track your CV analysis and job opportunities.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <StatCard title="CV actifs" value={3} />

        <StatCard title="Matchs trouvés" value={24} />

        <StatCard title="Candidatures" value={8} />
      </div>

      <section className="mt-10">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">Dernières opportunités</h2>

        <div className="grid gap-6 lg:grid-cols-2">
          <JobMatchCard
            title="Fullstack Developer"
            company="Tech Company"
            skills={['React', 'Node.js', 'PostgreSQL']}
            matchScore={92}
          />

          <JobMatchCard
            title="Frontend Engineer"
            company="Startup AI"
            skills={['React', 'TypeScript', 'Tailwind']}
            matchScore={87}
          />
        </div>
      </section>
    </div>
  );
}

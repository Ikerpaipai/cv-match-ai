import type { Cv } from '../../types/cv';

type CvCardProps = {
  cv: Cv;
  isActive: boolean;
  onSelect: (id: string) => void;
};

export default function CvCard({ cv, isActive, onSelect }: CvCardProps) {
  return (
    <div
      className={`
        rounded-xl
        border
        bg-white
        p-6
        transition-all
        duration-200
        ${
          isActive ? 'border-blue-500 shadow-md' : 'border-gray-200 shadow-sm hover:border-blue-300'
        }
      `}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{cv.name}</h3>

          <p className="mt-1 text-sm text-gray-500">{cv.experienceYears} ans d'expérience</p>
        </div>

        {isActive && (
          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
            CV actif
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {cv.skills.map((skill) => (
          <span key={skill} className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
            {skill}
          </span>
        ))}
      </div>

      {!isActive && (
        <button
          onClick={() => onSelect(cv.id)}
          className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Sélectionner
        </button>
      )}
    </div>
  );
}

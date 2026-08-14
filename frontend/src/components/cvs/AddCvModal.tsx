import { useState } from 'react';

type AddCvModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, file: File) => void;
  isLoading: boolean;
  isError: boolean;
};

export default function AddCvModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  isError,
}: AddCvModalProps) {
  const [name, setName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  if (!isOpen) {
    return null;
  }

  function handleSubmit() {
    if (!name || !file) {
      return;
    }

    onSubmit(name, file);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Ajouter un CV</h2>

          <p className="mt-1 text-sm text-gray-500">Upload your resume to analyze it.</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Nom du CV</label>

            <input
              type="text"
              placeholder="CV Fullstack"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Fichier PDF</label>

            <input
              type="file"
              accept=".pdf"
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
              className="w-full text-sm"
            />
          </div>
        </div>

        {isError && (
          <p className="mt-4 text-sm text-red-600">
            Impossible d'analyser le CV. Veuillez réessayer.
          </p>
        )}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
          >
            Annuler
          </button>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="
              rounded-lg
              bg-blue-600
              px-4
              py-2
              text-sm
              font-medium
              text-white
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {isLoading ? 'Analyse du CV...' : 'Ajouter'}
          </button>
        </div>
      </div>
    </div>
  );
}

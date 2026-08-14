import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import CvCard from '../components/cvs/CvCard';
import AddCvButton from '../components/cvs/AddCvButton';
import AddCvModal from '../components/cvs/AddCvModal';

import { useUploadCv } from '../hooks/useUploadCv';
import { useCv } from '../context/useCv';
import { useCvs } from '../hooks/useCvs';

export default function Cvs() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { activeCvId, setActiveCvId } = useCv();
  const { data: cvs = [], isLoading, isError } = useCvs();
  const uploadMutation = useUploadCv();

  function handleSelectCv(id: string) {
    setActiveCvId(id);
  }

  function handleAddCv(_: string, file: File) {
    uploadMutation.mutate(file, {
      onSuccess: (data) => {
        console.log('Réponse API CV:', data);

        queryClient.invalidateQueries({
          queryKey: ['cvs'],
        });

        setIsModalOpen(false);
      },
      onError: (error) => {
        console.error('Erreur upload CV:', error);
      },
    });
  }

  if (isLoading) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Mes CV</h1>

        <p className="mt-4 text-gray-500">Chargement de vos CV...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Mes CV</h1>

        <p className="mt-4 text-red-600">Impossible de récupérer vos CV.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Mes CV</h1>

        <p className="mt-2 text-gray-500">
          Manage your resumes and select the one used for matching.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {cvs.map((cv) => (
          <CvCard key={cv.id} cv={cv} isActive={cv.id === activeCvId} onSelect={handleSelectCv} />
        ))}

        <AddCvButton onClick={() => setIsModalOpen(true)} />
      </div>

      <AddCvModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddCv}
        isLoading={uploadMutation.isPending}
        isError={uploadMutation.isError}
      />
    </div>
  );
}

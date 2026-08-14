type AddCvButtonProps = {
  onClick: () => void;
};

export default function AddCvButton({ onClick }: AddCvButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
        rounded-xl
        border
        border-dashed
        border-gray-300
        bg-white
        p-6
        text-sm
        font-medium
        text-gray-600
        transition
        hover:border-blue-400
        hover:text-blue-600
      "
    >
      + Ajouter un CV
    </button>
  );
}

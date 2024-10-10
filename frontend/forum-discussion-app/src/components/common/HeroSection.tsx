export interface HeroSectionProps {
  onPostFormClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onPostFormClick,
}) => (
  <section className="pt-24 text-center py-16 px-8 text-gray-800">
    <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
      Join The Community And Ask Questions!
    </h1>
    <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
      Need answers on anything no-code? Ask away.
    </p>
    <div className="flex justify-center">
      <button
        className="bg-green-500 text-white px-6 py-3 rounded-lg"
        onClick={onPostFormClick}
      >
        Create Post
      </button>
    </div>
  </section>
);

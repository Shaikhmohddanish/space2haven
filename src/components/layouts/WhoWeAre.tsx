import Pattern from "./Pattern";

const WhoWeAre = () => {
  return (
    <section className="section-general-class relative bg-gradient-to-b from-home to-gray-800 min-h-screen">
      {/* Background Pattern */}
      <Pattern />

      {/* Section Content */}
      <div className="relative z-10 flex flex-col items-center py-12 px-4 md:px-8 lg:px-16 gap-6 w-full max-w-6xl mx-auto">
        {/* Section Header */}
        <h1 className="text-sand-soft2 text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">
          Who We Are
        </h1>
        <hr className="bg-sand-soft2 mb-6 w-1/3" />

        {/* Description */}
        <p className="text-sand-soft2 text-center text-lg md:text-xl lg:text-2xl leading-relaxed max-w-4xl">
          At <span className="font-bold text-home">Space2Heaven</span>, we are committed to transforming your property aspirations into reality. With a diverse portfolio of premium properties and interior solutions, we offer comprehensive services that cater to every need of modern homeowners. Our team of experienced professionals ensures that every step of your journey—from finding your dream home to designing the perfect interiors—is seamless and satisfying.
        </p>

        <p className="text-sand-soft2 text-center text-lg md:text-xl lg:text-2xl leading-relaxed max-w-4xl mt-4">
          Our goal is not just to provide properties but to deliver an unmatched lifestyle experience. We believe in a customer-first approach, ensuring transparency, quality, and integrity in every deal. Join us at <span className="font-bold text-home">Space2Heaven</span> and experience the difference of working with a trusted partner who values your dreams as much as you do.
        </p>
      </div>
    </section>
  );
};

export default WhoWeAre;

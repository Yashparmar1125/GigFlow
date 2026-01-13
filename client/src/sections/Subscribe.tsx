
const SubscribeSection = () => {
  return (
    // The outer section with the dark blue background and relative positioning for decorative elements
    <section className="relative w-full bg-indigo-950 py-16 lg:py-24 overflow-hidden">
      
      {/* --- Decorative Vector Images --- */}
      {/* Note: Replace src paths with your actual local vector image assets */}
      
      {/* Orange Squiggly Arrow (Left) */}
      <img
        src="/vectors/Group.svg" // Replace with your asset path
        alt=""
        className="absolute top-1/2 left-10 lg:left-32 -translate-y-1/2 hidden md:block w-24 lg:w-32 pointer-events-none"
      />

      {/* Wireframe Circles (Right Background) */}
      <img
        src="/vectors/Ellipse 42.svg" // Replace with your asset path
        alt=""
        className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 hidden lg:block w-[400px] lg:w-[600px] opacity-40 pointer-events-none"
      />

       {/* Lightbulb (Right Bottom) */}
       <img
        src="/vectors/light.svg" // Replace with your asset path
        alt=""
        className="absolute bottom-8 right-20 lg:right-40 hidden md:block w-12 lg:w-16 pointer-events-none"
      />


      {/* --- Main Content Container --- */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Headline */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-sans tracking-tight">
          Subscribe To Get Discounts, Updates & More
        </h2>
        
        {/* Subheadline */}
        <p className="text-lg text-gray-300 mb-10">
          Monthly product updates, industry news and more!
        </p>

        {/* Subscription Form */}
        {/* Using a relative wrapper to position the button inside the input */}
        <div className="relative max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Enter Your Email"
            className="w-full bg-white rounded-full py-4 pl-8 pr-36 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-lg text-base transition-all duration-300 hover:shadow-xl"
          />
          <button className="absolute top-1/2 right-2 -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 px-8 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95">
            Send
          </button>
        </div>

      </div>
    </section>
  );
};

export default SubscribeSection;
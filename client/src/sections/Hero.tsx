
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="w-full bg-gradient-to-b from-gray-50 to-white py-12 lg:py-20 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          
          <div className="flex-1 w-full text-center lg:text-left animate-fadeInUp">
            <div className="inline-flex items-center gap-2 mb-6 bg-white py-2 px-4 rounded-full shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.005Z" clipRule="evenodd" />
                  </svg>
                ))}
              </div>
              <span className="text-xs font-medium text-gray-700">Trusted by over 2M+ users</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 tracking-tight">
              Get the perfect <br />
              <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-orange-500 bg-clip-text text-transparent">Developers & Projects</span>
            </h1>

            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Connecting you with top-tier freelance talent and exciting projects worldwide. Find your match, collaborate efficiently, and achieve your goals.
            </p>

            <div className="bg-white rounded-2xl shadow-lg p-2 flex flex-col md:flex-row items-center max-w-2xl mx-auto lg:mx-0 mb-8 border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="flex-1 flex items-center px-4 w-full md:w-auto md:border-r border-gray-200 mb-2 md:mb-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-purple-500 mr-3 flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input type="text" placeholder="What are you looking for?" className="w-full py-3 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 focus:placeholder-gray-300 transition-colors" />
              </div>
              
              <div className="hidden md:flex items-center px-4 text-gray-500 cursor-pointer border-r border-gray-200 hover:text-purple-600 transition-colors duration-200">
                 <span className="font-medium text-sm">Category</span>
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </div>

              <Link
                to="/browse-gigs"
                className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-xl transition-all duration-300 md:ml-2 flex-shrink-0 text-sm shadow-md hover:shadow-lg hover:scale-105 active:scale-95 text-center inline-block"
              >
                Search Now
              </Link>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-x-3 gap-y-2 text-xs text-gray-600">
              <span className="font-semibold text-gray-800">Popular:</span>
              <a href="#" className="hover:text-purple-600 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm hover:shadow-md">Web Developer</a>
              <a href="#" className="hover:text-purple-600 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm hover:shadow-md">Mobile App</a>
              <a href="#" className="hover:text-purple-600 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm hover:shadow-md">UI/UX Design</a>
            </div>
          </div>

          <div className="flex-1 w-full flex justify-center lg:justify-end relative">
            <img 
              src="/hero_illustration.png" 
              alt="Freelancer working on laptop illustration" 
              className="w-auto h-auto max-w-full lg:max-w-2xl max-h-[500px] object-contain drop-shadow-2xl z-10 relative animate-float" 
            />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
             <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[250px] h-[250px] bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
import { Link } from 'react-router-dom';

const DownloadAppSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-indigo-950 overflow-hidden relative">
      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-20">
          
          {/* --- Text Content --- */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              Download Our App Today!
            </h2>
            <p className="text-lg text-gray-300 mb-10 max-w-md mx-auto lg:mx-0">
              Seamlessly manage projects, connect with talent, and track payments on the go. Available for iOS and Android.
            </p>

            {/* App Store Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              {/* App Store Button Placeholder */}
              <Link to="#" className="flex items-center gap-3 bg-gray-900 hover:bg-gray-800 text-white px-5 py-3 rounded-xl transition-all duration-300 border border-gray-700 hover:shadow-lg hover:scale-105 active:scale-95">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor" className="w-8 h-8">
                  {/* Font Awesome Icon: apple */}
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-51.9-23.2-92.5-19.5-47.4 3.9-90.2 27.9-114.3 69.2-40.9 70.3-12.1 174.9 27.1 232.5 19.9 28.9 43.7 61.1 76.4 61.1 29.7 0 40.8-19.3 77.3-19.3 35.8 0 45.7 19.3 78.3 19.3 32.6 0 55.8-29.3 75.7-58.5 20.3-30 28.7-59.8 29-61.2-1.4-.8-56.3-21.6-55.7-84.8zM189.9 75.2c21.9-27 36.6-63.9 32.4-102.2-23.4 1.8-51.9 15.7-69.1 36-16.4 19.5-30.9 50.9-27.1 87.4 25.9 1.8 53.1-10.8 63.8-21.2z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs uppercase">Download on the</div>
                  <div className="text-xl font-bold font-sans leading-none">App Store</div>
                </div>
              </Link>

              {/* Google Play Button Placeholder */}
              <Link to="#" className="flex items-center gap-3 bg-gray-900 hover:bg-gray-800 text-white px-5 py-3 rounded-xl transition-all duration-300 border border-gray-700 hover:shadow-lg hover:scale-105 active:scale-95">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-8 h-8">
                    {/* Font Awesome Icon: google-play */}
                  <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l220.7-221.2-220.7-221.2 53.7 53.7 167.1 167.5L104.6 499z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs uppercase">Get it on</div>
                  <div className="text-xl font-bold font-sans leading-none">Google Play</div>
                </div>
              </Link>
            </div>
          </div>

          {/* --- Image Mockup --- */}
          <div className="flex justify-center lg:justify-end relative">
            {/* Using a placeholder for the app mockup */}
            <img
              src="image2.png" 
              alt="Mobile App Mockup"
              className="w-full max-w-md object-contain drop-shadow-2xl relative z-10"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default DownloadAppSection;
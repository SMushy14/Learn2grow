const Hero = () => {
  return (
    <section
      id="home"
      className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Grow Your Skills. Shape Your Future.
            </h1>
            <p className="text-lg md:text-xl mb-8 text-indigo-100">
              Access thousands of high-quality courses taught by industry
              experts. Learn at your own pace and achieve your career goals with
              Learn2Grow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a
                href="#courses"
                className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors shadow-lg"
              >
                Explore Courses
              </a>
              <a
                href="#contact"
                className="bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-800 transition-colors border-2 border-white"
              >
                Get Started
              </a>
            </div>
          </div>

          {/* hero image */}
          <div className="hidden md:flex justify-center items-center">
            <div className="relative">
              <div className="w-full h-80 bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                  alt="Students learning"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-pink-400 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

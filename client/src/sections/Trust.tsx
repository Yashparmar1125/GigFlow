

const companies = [
  {
    name: 'Databricks',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e4/Databricks_logo.svg/2560px-Databricks_logo.svg.png', // Replace with actual logo asset
  },
  {
    name: 'Razorpay',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg', // Replace with actual logo asset
  },
  {
    name: 'GitLab',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/GitLab_logo.svg', // Replace with actual logo asset
  },
  {
    name: 'monday.com',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c6/Monday_logo.svg', // Replace with actual logo asset
  },
  {
    name: 'Grammarly',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Grammarly_logo_2024.svg/2560px-Grammarly_logo_2024.svg.png', // Replace with actual logo asset
  },
  {
    name: 'Asana',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Asana_logo.svg', // Replace with actual logo asset
  },
];

// ==========================================
// Main Section Component
// ==========================================

const TrustedCompaniesSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-indigo-950 relative overflow-hidden">
      {/* Decorative Orange Circle */}
      <div className="absolute -top-32 -right-32 w-64 h-64 lg:w-96 lg:h-96 bg-orange-500 rounded-full hidden md:block"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Trusted by the world’s best
          </h2>
          <p className="text-gray-300 text-lg">
            Top companies
          </p>
        </div>

        {/* Logos Grid */}
        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
          {companies.map((company, index) => (
            <div key={index} className="group">
              <img
                src={company.logo}
                alt={`${company.name} logo`}
                // Applying filters to make logos white and add hover effect
                className="h-8 lg:h-10 w-auto grayscale brightness-0 invert opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedCompaniesSection;
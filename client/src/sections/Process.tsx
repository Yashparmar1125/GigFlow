import type { ReactNode } from 'react';

// ==========================================
// Data Definitions
// ==========================================

interface ProcessStepData {
  title: string;
  description: string;
  iconBg: string;
  icon: ReactNode;
}

interface ProcessStepProps {
  title: string;
  description: string;
  icon: ReactNode;
  iconBg: string;
}

const processSteps: ProcessStepData[] = [
  {
    title: 'Post a Job',
    description: 'Publish the job posting on your selected platforms. Follow the specific submission process for each platform.',
    iconBg: 'bg-purple-100', // Using purple theme
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-purple-600">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    title: 'Hire Freelancers',
    description: 'Depending on the platform, you can either wait for freelancers to apply or invite specific freelancers to submit proposals.',
    iconBg: 'bg-orange-100', // Using orange theme
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-orange-600">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    title: 'Get Work Done',
    description: 'Utilize productivity tools and apps to help you stay organized, manage tasks, and set reminders.',
    iconBg: 'bg-yellow-100', // Using yellow/neutral theme
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-yellow-600">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
];

// ==========================================
// Reusable Component
// ==========================================

const ProcessStep = ({ title, description, icon, iconBg }: ProcessStepProps) => {
  return (
    <div className="flex gap-4 items-start group hover:bg-gray-50 p-4 rounded-xl transition-all duration-300">
      <div className={`h-16 w-16 rounded-2xl flex items-center justify-center shrink-0 ${iconBg} group-hover:scale-110 group-hover:shadow-md transition-all duration-300`}>
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

// ==========================================
// Main Section Component
// ==========================================

const WorkProcessSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* --- Left Column: Image Collage --- */}
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
              alt="Woman working at a desk"
              className="rounded-2xl object-cover h-full row-span-2"
            />
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
              alt="Team collaborating"
              className="rounded-2xl object-cover h-64 w-full"
            />
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
              alt="People in a modern office"
              className="rounded-2xl object-cover h-64 w-full"
            />
          </div>

          {/* --- Right Column: Content & Steps --- */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Get Expert in Less Time and Our Work Process
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              Discover how our streamlined process connects you with top talent quickly and efficiently, so you can focus on what matters most.
            </p>

            <div className="flex flex-col gap-8">
              {processSteps.map((step, index) => (
                <ProcessStep
                  key={index}
                  title={step.title}
                  description={step.description}
                  icon={step.icon}
                  iconBg={step.iconBg}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WorkProcessSection;
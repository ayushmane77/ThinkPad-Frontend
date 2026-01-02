import { ShieldCheck, NotebookPen, Lock, Cloud } from "lucide-react";

const services = [
  {
    icon: <NotebookPen size={32} />,
    title: "Smart Notes",
    description: "Create, edit, and manage your notes effortlessly with a clean and distraction-free interface."
  },
  {
    icon: <Lock size={32} />,
    title: "Secure Access",
    description: "Your notes are protected with JWT authentication and user-based ownership."
  },
  {
    icon: <Cloud size={32} />,
    title: "Cloud Sync",
    description: "Access your notes anytime, anywhere. Everything is securely stored in the cloud."
  },
  {
    icon: <ShieldCheck size={32} />,
    title: "Privacy First",
    description: "Only you can see, update, or delete your notes. Your data stays yours."
  }
];

const Services = () => {
  return (
    <section
      id="Services"
      className="w-full bg-black text-white py-20"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-3">
            What We Offer
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A secure and modern note-taking experience designed for productivity and peace of mind.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-md p-6 rounded-2xl
                         border border-white/10 hover:border-purple-500
                         transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-purple-400 mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {service.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;

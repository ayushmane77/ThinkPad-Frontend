import { Mail, MessageCircle, HelpCircle } from "lucide-react";

const supportOptions = [
  {
    icon: <HelpCircle size={28} />,
    title: "Help Center",
    description: "Find answers to common questions and learn how to use the app effectively."
  },
  {
    icon: <MessageCircle size={28} />,
    title: "Community Support",
    description: "Get help from other users and share ideas to improve productivity."
  },
  {
    icon: <Mail size={28} />,
    title: "Contact Us",
    description: "Reach out directly for personalized support whenever you need assistance."
  }
];

const Support = () => {
  return (
    <section
      id="Support"
      className="w-full bg-black text-white py-20"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-3">
            We’re Here to Help
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Whether you’re stuck, curious, or just exploring — support is always available.
          </p>
        </div>

        {/* Support Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {supportOptions.map((item, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-md p-6 rounded-2xl
                         border border-white/10 hover:border-purple-500
                         transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-purple-400 mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Support;

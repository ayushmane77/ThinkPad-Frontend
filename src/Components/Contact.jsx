// import { Mail, User, MessageSquare } from "lucide-react";
// import { sendContactMessage } from "../API/contactAPI";
// import { toast } from "react-toastify";
// import { useState } from "react";
// const Contact = () => {


//   const [formData, setFormData] = useState({
//   name: "",
//   email: "",
//   subject: "",
//   message: ""
// });

// const handleSubmit = async () => {
//   try {
//     await sendContactMessage(formData);
//     toast.success("Message sent successfully!");
//     setFormData({ name: "", email: "", subject: "", message: "" });
//   } catch (err) {
//     toast.error(err.message);
//   }
// };


//   return (
//     <section
//       id="Contact"
//       className="w-full bg-black text-white py-20"
//     >
//       <div className="max-w-5xl mx-auto px-6">

//         {/* Heading */}
//         <div className="text-center mb-14">
//           <h2 className="text-4xl font-bold mb-3">
//             Get in Touch
//           </h2>
//           <p className="text-gray-400 max-w-2xl mx-auto">
//             Have feedback, questions, or need support?  
//             We’d love to hear from you.
//           </p>
//         </div>

//         {/* Form Container */}
//         <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8">
//           <form className="grid grid-cols-1 md:grid-cols-2 gap-6">

//             {/* Name */}
//             <div className="flex flex-col gap-2">
//               <label className="text-sm text-gray-400">Your Name</label>
//               <div className="flex items-center gap-2 bg-black/40 border border-white/10 rounded-lg px-4 py-3">
//                 <User size={18} className="text-purple-400" />
//                 <input
//                   type="text"
//                   placeholder="Enter your name"
//                   className="bg-transparent outline-none text-white w-full text-sm"
//                 />
//               </div>
//             </div>

//             {/* Email */}
//             <div className="flex flex-col gap-2">
//               <label className="text-sm text-gray-400">Email Address</label>
//               <div className="flex items-center gap-2 bg-black/40 border border-white/10 rounded-lg px-4 py-3">
//                 <Mail size={18} className="text-purple-400" />
//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   className="bg-transparent outline-none text-white w-full text-sm"
//                 />
//               </div>
//             </div>

//             {/* Subject */}
//             <div className="md:col-span-2 flex flex-col gap-2">
//               <label className="text-sm text-gray-400">Subject</label>
//               <input
//                 type="text"
//                 placeholder="Compliment, support, feedback, issue..."
//                 className="bg-black/40 border border-white/10 rounded-lg px-4 py-3
//                            outline-none text-white text-sm"
//               />
//             </div>

//             {/* Message */}
//             <div className="md:col-span-2 flex flex-col gap-2">
//               <label className="text-sm text-gray-400">Message</label>
//               <div className="flex gap-2 bg-black/40 border border-white/10 rounded-lg px-4 py-3">
//                 <MessageSquare size={18} className="text-purple-400 mt-1" />
//                 <textarea
//                   rows="4"
//                   placeholder="Write your message here..."
//                   className="bg-transparent outline-none text-white w-full text-sm resize-none"
//                 />
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div className="md:col-span-2 text-center mt-4">
//               <button
//                 type="button"
//                 className="px-8 py-3 rounded-full font-semibold text-white
//                            bg-gradient-to-r from-purple-500 to-pink-500
//                            hover:opacity-90 transition"
//               onClick={handleSubmit}
//               >
//                 Send Message
//               </button>
//             </div>

//           </form>
//         </div>

//       </div>
//     </section>
//   );
// };

// export default Contact;


import { Mail, User, MessageSquare } from "lucide-react";
import { useState } from "react";
import { sendContactMessage } from "../API/contactAPI";
import { toast } from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await sendContactMessage(formData);
      toast.success("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <section id="Contact" className="w-full bg-black text-white py-20">
      <div className="max-w-5xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-3">Get in Touch</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have feedback, questions, or need support?
            We’d love to hear from you.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Name */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Your Name</label>
              <div className="flex items-center gap-2 bg-black/40 border border-white/10 rounded-lg px-4 py-3">
                <User size={18} className="text-purple-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="bg-transparent outline-none text-white w-full text-sm"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Email Address</label>
              <div className="flex items-center gap-2 bg-black/40 border border-white/10 rounded-lg px-4 py-3">
                <Mail size={18} className="text-purple-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="bg-transparent outline-none text-white w-full text-sm"
                />
              </div>
            </div>

            {/* Subject */}
            <div className="md:col-span-2 flex flex-col gap-2">
              <label className="text-sm text-gray-400">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Compliment, support, feedback, issue..."
                className="bg-black/40 border border-white/10 rounded-lg px-4 py-3 outline-none text-white text-sm"
              />
            </div>

            {/* Message */}
            <div className="md:col-span-2 flex flex-col gap-2">
              <label className="text-sm text-gray-400">Message</label>
              <div className="flex gap-2 bg-black/40 border border-white/10 rounded-lg px-4 py-3">
                <MessageSquare size={18} className="text-purple-400 mt-1" />
                <textarea
                  rows="4"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  className="bg-transparent outline-none text-white w-full text-sm resize-none"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="md:col-span-2 text-center mt-4">
              <button
                type="button"
                onClick={handleSubmit}
                className="px-8 py-3 rounded-full font-semibold text-white
                           bg-gradient-to-r from-purple-500 to-pink-500
                           hover:opacity-90 transition"
              >
                Send Message
              </button>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;


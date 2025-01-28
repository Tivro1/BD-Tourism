import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const SendEmail = () => {
  const form = useRef();
  const [status, setStatus] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('Sending...');

    emailjs
      .sendForm('service_egy2ugt', 'template_7fibnys', form.current, {
        publicKey: 'Ze9GpVTT2H40OXWf0',
      })
      .then(
        () => {
          setStatus('Message sent successfully!');
        },
        (error) => {
          setStatus('Failed to send message. Please try again.');
          console.log('FAILED...', error.text);
        }
      );
  };

  return (
    <div className="bg-transparent border border-white p-6 mt-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-blue-700 mb-4">
        Contact Us
      </h2>
      <form ref={form} onSubmit={sendEmail} className="space-y-4">
        <div>
          <label htmlFor="user_name" className="block font-bold text-xl text-white">
            Name
          </label>
          <input
            type="text"
            name="user_name"
            id="user_name"
            required
            className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label htmlFor="user_email" className="block font-bold text-xl text-white">
            Email
          </label>
          <input
            type="email"
            name="user_email"
            id="user_email"
            required
            className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label htmlFor="message" className="block font-bold text-xl text-white">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            required
            className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="4"
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="w-full p-3 bg-[#f1ecec] text-black text-2xl font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Send Message
          </button>
        </div>
        {status && (
          <p
            className={`text-center mt-4 ${
              status.includes('successfully') ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {status}
          </p>
        )}
      </form>
    </div>
  );
};

export default SendEmail;

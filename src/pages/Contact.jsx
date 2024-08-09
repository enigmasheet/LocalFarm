import { useState } from 'react';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email address is invalid';
    if (!formData.message) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const contactParams = {
      to_name: 'Recipient Name', // Replace with the recipient's name or make it dynamic
      from_name: formData.name,
      reply_to: formData.email, // This will set the sender's email as the reply-to address
      message: formData.message,
    };

    setIsSubmitting(true);

    // Send the contact message
    emailjs.send('service_gb1vq59', 'template_18wla41', contactParams, 'xjteBpsWyHb4ugcsI')
      .then(() => {
        // Send auto-reply to the sender
        emailjs.send('service_gb1vq59', 'template_3ir5vtu', {
          from_name: formData.name,
          to_name: formData.name,
          message: formData.message,
        }, 'xjteBpsWyHb4ugcsI')
          .then((response) => {
            console.log('Auto-reply sent successfully!', response.status, response.text);
            setAlert({ type: 'success', message: 'Message sent successfully!' });
            setFormData({
              name: '',
              email: '',
              message: '',
            });
            setErrors({});
          })
          .catch((error) => {
            console.error('Auto-reply failed...', error);
            setAlert({ type: 'error', message: 'There was an error sending the auto-reply!' });
          });
      })
      .catch((error) => {
        console.error('Contact message failed...', error);
        setAlert({ type: 'error', message: 'There was an error sending the message!' });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
      {alert.message && (
        <div className={`mb-4 p-2 rounded ${alert.type === 'success' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
          {alert.message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
          />
          {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
        </div>
        <button
          type="submit"
          className={`bg-blue-500 text-white p-2 rounded hover:bg-blue-700 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default Contact;

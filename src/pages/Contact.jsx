import { useState } from 'react';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    reason: 'Health Checkup of Crops',
  });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
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
      to_name: 'Recipient Name',
      from_name: formData.name,
      reply_to: formData.email,
      message: formData.message,
      reason: formData.reason,
    };

    setIsSubmitting(true);

    emailjs.send('service_gb1vq59', 'template_18wla41', contactParams, 'xjteBpsWyHb4ugcsI')
      .then(() => {
        return emailjs.send('service_gb1vq59', 'template_3ir5vtu', {
          from_name: formData.name,
          to_name: formData.name,
          message: formData.message,
          reason: formData.reason,
        }, 'xjteBpsWyHb4ugcsI');
      })
      .then((response) => {
        console.log('Auto-reply sent successfully!', response.status, response.text);
        setAlert({ type: 'success', message: 'Message sent successfully!' });
        setFormData({
          name: '',
          email: '',
          message: '',
          reason: 'Health Checkup of Crops',
        });
        setErrors({});
      })
      .catch((error) => {
        console.error('Message sending failed...', error);
        setAlert({ type: 'error', message: 'There was an error sending your message.' });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Contact Us</h1>
      {alert.message && (
        <div className={`mb-4 p-3 rounded ${alert.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} dark:bg-gray-700 dark:text-gray-300`}>
          {alert.message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 font-medium">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-medium">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="reason" className="block text-gray-700 dark:text-gray-300 font-medium">Reason for Contact</label>
          <select
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100"
          >
            <option value="Health Checkup of Crops">Health Checkup of Crops</option>
            <option value="New Device Entry">New Device Entry</option>
            <option value="Maintenance Request">Maintenance Request</option>
            <option value="General Inquiry">General Inquiry</option>
            <option value="Technical Support">Technical Support</option>
            <option value="Product Feedback">Product Feedback</option>
            <option value="Service Cancellation">Service Cancellation</option>
            <option value="Billing Issue">Billing Issue</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 font-medium">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100"
            rows="5"
          />
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
        </div>
        <button
          type="submit"
          className={`bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''} dark:bg-blue-600 dark:hover:bg-blue-700`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default Contact;

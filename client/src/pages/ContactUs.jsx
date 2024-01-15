import React from "react";

function ContactUs() {
  return (
    <div className="bg-gray-100">
      {/* Contact Form Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>

            {/* Contact Form */}
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              {/* Name Field */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Your Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Your Name"
                />
              </div>

              {/* Email Field */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Your Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Your Email"
                />
              </div>

              {/* Message Field */}
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="message"
                >
                  Your Message
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="message"
                  rows="5"
                  placeholder="Your Message"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-center">
                <button
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-600"
                  type="submit"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Details Section */}
      <section className="bg-gray-200 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Contact Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Contact Detail Card - Repeat for each detail */}
            <div className="bg-white rounded-md shadow-md p-6">
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-gray-600">info@example.com</p>
            </div>

            {/* Repeat for other contact details */}
            {/* ...

        {/* Map Section */}
            <div className="col-span-3 mt-8">
              <iframe
                title="Location Map"
                className="w-full h-64 rounded-md shadow-md"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.8435558043637!2d-122.41941518421743!3d37.77492997975376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808f7e1c78bbd54d%3A0xbca7f0b12c6a6cc2!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1638285663437!5m2!1sen!2sus"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactUs;

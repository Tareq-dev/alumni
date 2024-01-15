import React from "react";

function AboutUS() {
  return (
    <div className="container mx-auto bg-gray-100 p-16">
      {/* Hero Section */}
      <section className="bg-blue-500 text-white py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Our Alumni Association
          </h1>
          <p className="text-lg">
            Connecting graduates and fostering lifelong relationships.
          </p>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-12 mb-6 lg:mb-0">
              <h2 className="text-3xl font-bold mb-4">Our History</h2>
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <div className="lg:w-1/2">
              <img
                src="https://placekitten.com/800/600"
                alt="History"
                className="rounded-md shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="bg-gray-200 p-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Our Achievements</h2>
          <p className="text-gray-700">
            Celebrating the successes of our alumni community.
          </p>
          {/* Include a list of achievements or milestones */}
          <div className="flex justify-center">
            <ul className="mt-6 text-left">
              <li className="mb-2">Award for Alumni Excellence, 2020</li>
              <li className="mb-2">1000+ Successful Graduates</li>
              <li className="mb-2">Global Alumni Network Expansion</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Alumni Testimonials
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {/* Alumni Testimonial Card - Repeat for each testimonial */}
            <div className=" p-4">
              <div className="bg-white rounded-md shadow-md p-6">
                <p className="text-gray-600 mb-4">
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua."
                </p>
                <h3 className="text-lg font-semibold">Jane Smith</h3>
                <p className="text-gray-600">Class of 2010</p>
              </div>
            </div>
            <div className=" p-4">
              <div className="bg-white rounded-md shadow-md p-6">
                <p className="text-gray-600 mb-4">
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua."
                </p>
                <h3 className="text-lg font-semibold">Jane Smith</h3>
                <p className="text-gray-600">Class of 2010</p>
              </div>
            </div>
            <div className=" p-4">
              <div className="bg-white rounded-md shadow-md p-6">
                <p className="text-gray-600 mb-4">
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua."
                </p>
                <h3 className="text-lg font-semibold">Jane Smith</h3>
                <p className="text-gray-600">Class of 2010</p>
              </div>
            </div>
            {/* Repeat for other testimonials */}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Get Involved</h2>
          <p className="text-gray-700 mb-8">
            Join our vibrant community and stay connected with fellow alumni.
          </p>
          <a
            href="/contact"
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}

export default AboutUS;

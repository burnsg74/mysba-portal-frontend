import React from "react";
import SBALogo from "../../assets/SBA-Logo-Horizontal.png";

const LandingPage = () => {
  return (
    <div>
      <header className="bg-gray-800 text-white text-center p-4 flex justify-between items-center">
        <a href="/" title="Home" aria-label="Home">
          <img src={SBALogo} alt="Sweet Delights" className="h-8" />
        </a>
        <button className="text-blue-700 bg-blue-100 hover:bg-blue-200 font-semibold py-2 px-4 border border-blue-500 rounded-full mr-5">
          Sign In
        </button>
      </header>

      <section className="hero bg-blue-100 p-8 text-center">
        <h2 className="text-2xl font-bold">Welcome to MyApp</h2>
        <p className="mt-4 text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec
          diam nec lorem placerat elementum.
        </p>
        <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Get Started
        </button>
      </section>

      <section id="features" className="p-8">
        <h2 className="text-xl font-bold">Features</h2>
        <ul className="list-disc pl-5 mt-4">
          <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
          <li>Phasellus vel ligula sit amet nulla iaculis aliquet.</li>
          <li>
            Fusce efficitur, eros sed suscipit porttitor, urna arcu hendrerit
            libero.
          </li>
        </ul>
      </section>

      <section id="about" className="bg-gray-50 p-8">
        <h2 className="text-xl font-bold">About Us</h2>
        <p className="mt-4 text-gray-700">
          Praesent imperdiet enim a nisi commodo, eget accumsan arcu
          scelerisque. Nulla vitae convallis nunc.
        </p>
      </section>

      <section id="contact" className="p-8">
        <h2 className="text-xl font-bold">Contact Us</h2>
        <form className="mt-4 flex flex-col items-center">
          <input
            type="text"
            placeholder="Name"
            className="mt-2 p-2 border rounded"
          />
          <input
            type="email"
            placeholder="Email"
            className="mt-2 p-2 border rounded"
          />
          <textarea
            placeholder="Your message"
            className="mt-2 p-2 border rounded"
          ></textarea>
          <button
            type="submit"
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Send Message
          </button>
        </form>
      </section>
      <footer className="bg-gray-800 text-white text-center p-4">
        <p>MyApp © 2024. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;

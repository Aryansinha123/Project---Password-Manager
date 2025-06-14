import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-3 fixed bottom-0 w-full z-50 mt-3 md:px-12 px-4">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:ml-[55px] xl:ml-[120px]">
                <div className="xl:w-80 w-65 md:p-2">
                    <h3 className="text-lg font-semibold">About Us</h3>
                    <p className="text-sm mt-2">
                        We are committed to providing the best service and creating a positive impact in our community.
                    </p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Quick Links</h3>
                    <ul className="mt-2 flex space-x-4">
                        <li>
                            <a href="#home" className="hover:underline">Home</a>
                        </li>
                        <li>
                            <a href="#services" className="hover:underline">Services</a>
                        </li>
                        <li>
                            <a href="#contact" className="hover:underline">Contact Us</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Follow Us</h3>
                    <div className="mt-2 flex space-x-4">
                        <a href="https://www.facebook.com" aria-label="Facebook" className="hover:text-blue-500">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://www.twitter.com" aria-label="Twitter" className="hover:text-blue-400">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="https://www.instagram.com" aria-label="Instagram" className="hover:text-pink-500">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="https://www.linkedin.com" aria-label="LinkedIn" className="hover:text-blue-600">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div className="text-center mt-6 border-t border-gray-700 pt-4">
                <p className="text-sm">&copy; {new Date().getFullYear()} Your Company. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;

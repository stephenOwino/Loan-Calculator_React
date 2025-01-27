import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className='bg-blue-500 text-white py-8 mt-10'>
			<div className='container mx-auto px-4'>
				<div className='flex flex-col lg:flex-row justify-between items-center'>
					<div className='mb-6 lg:mb-0'>
						<h2 className='text-2xl font-bold'>Loan Calculator</h2>
						<p className='mt-2'>
							Your trusted partner for loan calculations and applications.
						</p>
					</div>
					<div className='flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8'>
						<Link to='/' className='hover:underline'>
							Home
						</Link>
						<Link to='/calculator' className='hover:underline'>
							Loan Calculator
						</Link>
						<Link to='/loan' className='hover:underline'>
							Loan Application
						</Link>
						<Link to='/reports' className='hover:underline'>
							Reports
						</Link>
						<Link to='/about-us' className='hover:underline'>
							About Us
						</Link>
						<Link to='/contact-us' className='hover:underline'>
							Contact Us
						</Link>
					</div>
					<div className='flex space-x-4 mt-6 lg:mt-0'>
						<a
							href='https://facebook.com'
							target='_blank'
							rel='noopener noreferrer'
							className='hover:text-gray-300'
						>
							<FaFacebook size={24} />
						</a>
						<a
							href='https://twitter.com'
							target='_blank'
							rel='noopener noreferrer'
							className='hover:text-gray-300'
						>
							<FaTwitter size={24} />
						</a>
						<a
							href='https://instagram.com'
							target='_blank'
							rel='noopener noreferrer'
							className='hover:text-gray-300'
						>
							<FaInstagram size={24} />
						</a>
						<a
							href='https://linkedin.com'
							target='_blank'
							rel='noopener noreferrer'
							className='hover:text-gray-300'
						>
							<FaLinkedin size={24} />
						</a>
					</div>
				</div>
				<div className='text-center mt-8'>
					<p>
						&copy; {new Date().getFullYear()} Loan Calculator. All rights
						reserved.
					</p>
					<p>Developed by @stephenowinoh</p>
					<p>WhatsApp: +254114825652</p>
					<p>Email: stephenowin233@gmail.com</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;

import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppHelp = () => {
	return (
		<div className='fixed top-1/2 right-4 transform -translate-y-1/2 z-50'>
			<a
				href='https://wa.me/+254114825652?text=Hey%20would%20you%20take%20me%20through%20loan%20application%20process?'
				target='_blank'
				rel='noopener noreferrer'
				className='flex items-center p-2 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600'
			>
				<FaWhatsapp size={24} className='mr-2' />
				Need help about loan?
			</a>
		</div>
	);
};

export default WhatsAppHelp;

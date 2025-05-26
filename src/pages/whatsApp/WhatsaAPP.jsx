import React from 'react';

const WhatsAppButton = ({ product, customMessage, phoneNumber = '201065624727' }) => {
  // الرسالة الأساسية
  let message = '';

  if (product) {
    const imageUrl = `${process.env.REACT_APP_API_URL}${product.images[0]}`;
 message = `
🛋️ *Product Name:* ${product.name}

💰 *Price:* ${product.price} EGP
 🖼️ *View Image:* ${imageUrl}

🟢 I'm interested in this product, please contact me.
`;
  } else if (customMessage) {
    message = customMessage;
  } else {
    message = 'Hello, I would like to get in touch with you!';
  }

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
      <img
        src="https://img.icons8.com/color/48/000000/whatsapp.png"
        alt="WhatsApp"
        className="social-icon"
      />
    </a>
  );
};

export default WhatsAppButton;

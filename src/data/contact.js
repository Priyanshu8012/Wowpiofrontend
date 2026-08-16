export const contactData = {
  brandName: 'WOWPIO',
  supportEmail: 'support@wowpio.com',
  careEmail: 'care@wowpio.com',
  helpline: '05322975853',
  whatsapp: '918001209697',
  address: 'Plot No. 118K, Tilmapur, Ashapur, Varanasi, U.P, 221007',
  instagramHandle: '@aquawow',
  instagramLink: 'https://www.instagram.com/aquawow',
  website: 'wowpio.com',
};

export function telHref(phone = contactData.helpline) {
  return `tel:${String(phone).replace(/\s+/g, '')}`;
}

export function waHref(message = "Hi WOWPIO, I'd like to order packaged drinking water.") {
  const text = encodeURIComponent(message);
  return `https://wa.me/${contactData.whatsapp}?text=${text}`;
}

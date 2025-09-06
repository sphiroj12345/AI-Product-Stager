
import { Template } from './types';

export const TEMPLATES: Template[] = [
  {
    id: 'minimalist-stone',
    name: 'Minimalist Stone',
    thumbnail: 'https://picsum.photos/id/22/200/200',
    prompt: 'Place the product on a flat, minimalist stone slab. The background should be a soft, out-of-focus neutral color. The lighting should be bright and clean, casting a soft shadow.'
  },
  {
    id: 'lush-jungle',
    name: 'Lush Jungle',
    thumbnail: 'https://picsum.photos/id/1015/200/200',
    prompt: 'Position the product in the foreground of a vibrant, lush jungle scene. Add large green leaves and dappled sunlight filtering through the canopy. The product should remain the clear focus.'
  },
  {
    id: 'urban-rooftop',
    name: 'Urban Rooftop',
    thumbnail: 'https://picsum.photos/id/1041/200/200',
    prompt: 'Set the product on a modern urban rooftop at dusk. The background should show a blurred cityscape with warm city lights. The product should be lit professionally.'
  },
  {
    id: 'warm-wood',
    name: 'Warm Wooden Cafe',
    thumbnail: 'https://picsum.photos/id/225/200/200',
    prompt: 'Place the product on a warm, polished wooden table inside a cozy, rustic cafe. The background should be softly blurred, showing hints of cafe ambiance like a coffee cup or plant.'
  },
  {
    id: 'beach-sunset',
    name: 'Beach Sunset',
    thumbnail: 'https://picsum.photos/id/433/200/200',
    prompt: 'Feature the product on clean, white sand at a beach during a golden hour sunset. The ocean in the background should be calm with soft waves. The lighting should be warm and dramatic.'
  },
  {
    id: 'cyberpunk-glow',
    name: 'Cyberpunk Glow',
    thumbnail: 'https://picsum.photos/id/536/200/200',
    prompt: 'Integrate the product into a futuristic cyberpunk setting. The scene should be dark, with vibrant neon lights and reflections on wet ground. The product should be highlighted with a neon glow.'
  },
  {
    id: 'luxury-marble',
    name: 'Luxury Marble',
    thumbnail: 'https://picsum.photos/id/24/200/200',
    prompt: 'Place the product on a luxurious white and gray marble surface. The background should be simple and elegant. Use sophisticated, soft lighting to emphasize the product\'s quality.'
  },
  {
    id: 'cosmic-nebula',
    name: 'Cosmic Nebula',
    thumbnail: 'https://picsum.photos/id/19/200/200',
    prompt: 'Make the product float gracefully in front of a stunning, colorful cosmic nebula. Add subtle stars and a gentle glow around the product to integrate it into the space scene.'
  },
  {
    id: 'luxury-magazine',
    name: 'Luxury Magazine',
    thumbnail: 'https://picsum.photos/id/1080/200/200',
    prompt: 'Authentic shot of a top luxury brand, {brand_name} {product_type}, professional photoshoot for {magazine_name}, a sharp {background_color} background, with exquisite details. Featuring ultra luxury fashion. Designer appeal with a luxury aesthetic. {brand_name} style designs, stylish and high-end atmosphere.',
    fields: [
      { id: 'brand_name', label: 'Brand Name', placeholder: 'e.g., Gucci, Chanel' },
      { id: 'product_type', label: 'Product Type', placeholder: 'e.g., handbag, shoes' },
      { id: 'magazine_name', label: 'Magazine Name', placeholder: 'e.g., Vogue, Elle' },
      { id: 'background_color', label: 'Background Color', placeholder: 'e.g., sharp white, matte black' },
    ]
  },
];

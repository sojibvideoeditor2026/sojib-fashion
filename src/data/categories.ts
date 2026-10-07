export interface CategoryItem {
  id: string;
  key: 'women' | 'skincare' | 'men' | 'shoes' | 'bags' | 'personal-care';
  nameEn: string;
  nameBn: string;
  image: string;
  itemCount: number;
  subcategories: {
    key: string;
    nameEn: string;
    nameBn: string;
  }[];
}

export const categoriesData: CategoryItem[] = [
  {
    id: 'cat-women',
    key: 'women',
    nameEn: "Women's Clothing",
    nameBn: 'নারীদের পোশাক',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
    itemCount: 48,
    subcategories: [
      { key: 'Three Piece', nameEn: 'Three Piece', nameBn: 'থ্রি-পিস' },
      { key: 'Saree', nameEn: 'Saree', nameBn: 'শাড়ি' },
      { key: 'Co-ords', nameEn: 'Co-ords', nameBn: 'কো-অর্ডস' },
      { key: 'Kurti', nameEn: 'Kurti & Tops', nameBn: 'কুর্তি ও টপস' }
    ]
  },
  {
    id: 'cat-skincare',
    key: 'skincare',
    nameEn: 'Skincare & Beauty',
    nameBn: 'স্কিনকেয়ার ও বিউটি',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
    itemCount: 35,
    subcategories: [
      { key: 'Serums', nameEn: 'Serums & Essences', nameBn: 'সিরাম' },
      { key: 'Sunscreen', nameEn: 'Sun Protection (SPF)', nameBn: 'সানস্ক্রিন' },
      { key: 'Moisturizer', nameEn: 'Moisturizers & Creams', nameBn: 'ময়েশ্চারাইজার' },
      { key: 'Face Wash', nameEn: 'Gentle Cleansers', nameBn: 'ফেসওয়াশ' }
    ]
  },
  {
    id: 'cat-shoes',
    key: 'shoes',
    nameEn: 'Ladies Shoes',
    nameBn: 'লেডিস জুতো',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80',
    itemCount: 26,
    subcategories: [
      { key: 'Block Heels', nameEn: 'Block Heels & Mules', nameBn: 'ব্লক হিল' },
      { key: 'Flat Sandals', nameEn: 'Flat & Kolhapuri', nameBn: 'ফ্ল্যাট স্যান্ডেল' },
      { key: 'Slippers', nameEn: 'Comfort Slides', nameBn: 'স্লিপার' }
    ]
  },
  {
    id: 'cat-men',
    key: 'men',
    nameEn: "Men's Clothing",
    nameBn: 'পুরুষদের পোশাক',
    image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=600&q=80',
    itemCount: 32,
    subcategories: [
      { key: 'Premium Panjabi', nameEn: 'Royal Panjabi & Kabli', nameBn: 'পাঞ্জাবি ও কাবলি' },
      { key: 'Casual Shirts', nameEn: 'Executive Shirts', nameBn: 'শার্ট' },
      { key: 'Polo T-shirts', nameEn: 'Combed Cotton Polos', nameBn: 'পোলো টি-শার্ট' }
    ]
  },
  {
    id: 'cat-bags',
    key: 'bags',
    nameEn: 'Designer Bags',
    nameBn: 'ব্যাগ ও পার্স',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80',
    itemCount: 22,
    subcategories: [
      { key: 'Tote Bags', nameEn: 'Structured Tote Bags', nameBn: 'টোট ব্যাগ' },
      { key: 'Party Clutches', nameEn: 'Embroidered Clutches', nameBn: 'পার্টি ক্লাচ' },
      { key: 'Crossbody', nameEn: 'Crossbody Slings', nameBn: 'ক্রসবাডি' }
    ]
  },
  {
    id: 'cat-pc',
    key: 'personal-care',
    nameEn: 'Personal Care',
    nameBn: 'পার্সোনাল কেয়ার',
    image: 'https://images.unsplash.com/photo-1608248597359-5561b369c09c?auto=format&fit=crop&w=600&q=80',
    itemCount: 19,
    subcategories: [
      { key: 'Hair Care', nameEn: 'Ayurvedic Hair Oils', nameBn: 'হেয়ার কেয়ার' },
      { key: 'Body Lotion', nameEn: 'Whipped Body Butters', nameBn: 'বডি কেয়ার' },
      { key: 'Lip Care', nameEn: 'Tinted Lip Balms', nameBn: 'লিপ কেয়ার' }
    ]
  }
];

export const bdDistricts = [
  'Dhaka (ঢাকা)',
  'Gazipur (গাজীপুর)',
  'Narayanganj (নারায়ণগঞ্জ)',
  'Chittagong (চট্টগ্রাম)',
  'Cox’s Bazar (কক্সবাজার)',
  'Comilla (কুমিল্লা)',
  'Sylhet (সিলেট)',
  'Moulvibazar (মৌলভীবাজার)',
  'Rajshahi (রাজশাহী)',
  'Bogra (বগুড়া)',
  'Khulna (খুলনা)',
  'Jessore (যশোর)',
  'Barisal (বরিশাল)',
  'Rangpur (রংপুর)',
  'Dinajpur (দিনাজপুর)',
  'Mymensingh (ময়মনসিংহ)',
  'Tangail (টাঙ্গাইল)',
  'Faridpur (ফরিদপুর)',
  'Kushtia (কুষ্টিয়া)',
  'Noakhali (নোয়াখালী)',
  'Feni (ফেনী)',
  'Brahmanbaria (ব্রাহ্মণবাড়িয়া)',
  'Pabna (পাবনা)',
  'Sirajganj (সিরাজগঞ্জ)'
];

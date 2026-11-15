export type Dialect = 'pow' | 'sakaw';

export type Screen = 
  | 'home'
  | 'categories'
  | 'family'
  | 'food'
  | 'animal'
  | 'body'
  | 'number'
  | 'quiz'
  | 'verbs'
  | 'credits';

export interface Contributor {
  id: string;
  name: string;
  role: string;
  roleBurmese: string;
  description: string;
  icon: string;
  colorTheme: string;
  tagColor: string;
  borderColor: string;
}

export interface FamilyMember {
  id: string;
  name: string; // Burmese name
  image: string;
  sakaw: string;
  pow: string;
  relation: string; // e.g. "အဘိုး"
}

export interface FoodItem {
  id: string;
  name: string;
  thumbnail: string;
  largeImage: string;
  sakaw?: string;
  pow?: string;
  burmese?: string;
}

export interface AnimalItem {
  id: string;
  name: string;
  image: string;
  sakaw: string;
  pow: string;
  sound?: string; // Animal SFX like barking, meowing
  burmese?: string;
}

export interface BodyPart {
  id: string;
  name: string;
  image: string;
  sakaw: string;
  pow: string;
  burmese?: string;
  partIds: string[]; // Hotspot IDs e.g. ['hand1', 'hand2']
}

export interface NumberItem {
  id: string;
  num: number;
  myanmarDigit: string; // e.g. "၁"
  imageClass: string;
  imageSrc: string;
  pow: string;
  sakaw: string;
  burmeseName: string; // "တစ်ခု", "နှစ်ခု"
}

export interface QuizQuestion {
  image1: string;
  image2: string;
  image3: string;
  pow: string;
  sakaw: string;
  burmese: string;
  correct: string;
}

export interface VerbItem {
  id: string;
  name: string;
  pow: string;
  sakaw: string;
  burmese?: string;
  icon: string;
  actionType?: 'brush' | 'sleep' | 'generic';
}

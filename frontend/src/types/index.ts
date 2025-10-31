export interface Experience {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  slots: Slot[];
}

export interface Slot {
  date: string;
  time: string;
  totalSlots: number;
  availableSlots: number;
};
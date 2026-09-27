export interface CarGroup {
  id: string;
  title: string;
  badge: string;
  cars: string[];
}

export const initialCarGroups: CarGroup[] = [
  {
    id: "group-super-sport",
    title: "Süper Spor & Pist Odaklı",
    badge: "Track & Supercar",
    cars: [
      "Porsche 911 GT3 RS (992)",
      "Lamborghini Revuelto",
      "Ferrari SF90 Stradale",
      "McLaren 750S",
      "Lamborghini Huracán STO",
      "Ferrari 296 GTB"
    ]
  },
  {
    id: "group-suv",
    title: "Lüks & Performans SUV",
    badge: "Performance SUV",
    cars: [
      "Lamborghini Urus Performante",
      "Mercedes-AMG G63 (G-Wagon)",
      "Range Rover Sport SV",
      "Porsche Cayenne Turbo GT",
      "Aston Martin DBX707",
      "BMW XM Label Red"
    ]
  },
  {
    id: "group-luxury-gt",
    title: "Ultra Lüks Grand Tourer & Prestij Sedan",
    badge: "Ultra Luxury",
    cars: [
      "Rolls-Royce Spectre",
      "Bentley Continental GT Speed",
      "Mercedes-Maybach S680",
      "Rolls-Royce Cullinan Black Badge"
    ]
  },
  {
    id: "group-street-track",
    title: "Agresif Sokak & Pist Sedan / Coupe",
    badge: "Street & Track",
    cars: [
      "BMW M4 Competition (G82)",
      "Audi RS6 Avant (C8)",
      "Mercedes-AMG GT Black Series",
      "BMW M8 Competition Gran Coupe"
    ]
  },
  {
    id: "group-viral-hyper",
    title: "Yeni Nesil Hiper & Süper Otomobiller (Algoritma Mıknatısları)",
    badge: "Viral Hypercars",
    cars: [
      "Ferrari SF90 XX Stradale",
      "Porsche 911 GT3 RS (992)",
      "Bugatti Tourbillon",
      "Koenigsegg Jesko Absolut",
      "Pagani Utopia"
    ]
  },
  {
    id: "group-spaceship",
    title: "Vahşi / \"Uzay Gemisi\" Tasarımlar (Kaydırmayı Anında Durduranlar)",
    badge: "Spaceship Designs",
    cars: [
      "Apollo Intensa Emozione (Apollo IE)",
      "Lamborghini Veneno / Essenza SCV12",
      "Aston Martin Valkyrie",
      "McLaren Senna"
    ]
  },
  {
    id: "group-widebody",
    title: "Günlük/Agresif \"Widebody\" Canavarlar (Geniş Kitlelerin Favorisi)",
    badge: "Widebody Monsters",
    cars: [
      "Mercedes-AMG GT Black Series",
      "Nissan GT-R Nismo (R35 / Liberty Walk Widebody)",
      "BMW M4 CSL (G82)"
    ]
  }
];

import { EnvironmentPreset, CameraAnglePreset } from "@/types";

export const environmentPresets: EnvironmentPreset[] = [
  {
    id: "env-1",
    name: "Yağmurlu Neon Tokyo Sokağı",
    timeOfDay: "Gece / Neon",
    promptSnippet: "parked on wet dark asphalt in a rainy neon-lit alleyway in Shinjuku Tokyo at midnight, vibrant magenta and cyan neon sign reflections pooling in rainwater puddles, misty atmospheric haze",
    iconName: "CloudRain"
  },
  {
    id: "env-2",
    name: "Kaliforniya Sahil Otoyolu (PCH)",
    timeOfDay: "Altın Saat (Golden Hour)",
    promptSnippet: "cruising on the Pacific Coast Highway in California during golden hour sunset, warm honey-orange sunlight grazing the body contours, Pacific ocean waves crashing in distant soft-focus background",
    iconName: "Sun"
  },
  {
    id: "env-3",
    name: "Ultra-Minimalist Sonsuzluk Stüdyosu",
    timeOfDay: "Stüdyo Işığı",
    promptSnippet: "centered inside a dramatic ultra-minimalist dark obsidian car studio, black glossy mirror floor reflecting the underbody, dual razor-sharp overhead strip rim lights sculpting the silhouette, zero distractions",
    iconName: "Layers"
  },
  {
    id: "env-4",
    name: "İsviçre Alpleri Karlı Dağ Geçidi",
    timeOfDay: "Sisli Şafak Vakti",
    promptSnippet: "carving through a dramatic winding mountain serpentine pass in the Swiss Alps, light dusting of fresh powder snow on pine trees and road shoulders, dramatic low-hanging alpine fog and overcast dramatic sky",
    iconName: "Mountain"
  },
  {
    id: "env-5",
    name: "Fütüristik Yeraltı Siber Garaj",
    timeOfDay: "Siber Gece",
    promptSnippet: "inside a brutalist concrete industrial underground parking facility, vertical linear LED light bars casting sharp reflections on the glossy floor, slight cinematic smoke haze, moody automotive cyber aesthetic",
    iconName: "Warehouse"
  }
];

export const cameraAnglePresets: CameraAnglePreset[] = [
  {
    id: "cam-1",
    name: "Ön 3/4 Alçak Açı (Hero Shot)",
    promptSnippet: "low-angle dynamic front three-quarter hero perspective, wide-angle lens emphasizing the aggressive front splitter, headlights, and front wheel stance, ground-level camera placement"
  },
  {
    id: "cam-2",
    name: "Yüksek Hızlı Rolling Shot (Hareketli Takip)",
    promptSnippet: "high-speed rolling tracking camera shot matching the vehicle speed, extreme motion blur on the asphalt road and spinning multi-piece wheel rims while the car body remains pin-sharp, dynamic side panning angle"
  },
  {
    id: "cam-3",
    name: "Arka Agresif Difüzör & Kanat Açısı",
    promptSnippet: "dramatic rear three-quarter low view focusing on the massive aerodynamic diffuser, wide rear fender haunches, quad exhaust tips, and towering carbon rear wing"
  },
  {
    id: "cam-4",
    name: "Sinematik Kuşbakışı Drone Takibi",
    promptSnippet: "cinematic high-angle bird's-eye drone tracking shot looking down slightly at 45 degrees, revealing the roof aero channels, hood vents, and road trajectory below"
  },
  {
    id: "cam-5",
    name: "Detay Makro Jant & Kaliper Açısı",
    promptSnippet: "tight macro detail focus on the custom forged center-lock wheel, massive carbon ceramic brake rotor with painted caliper, showing intricate metallic flake paint on the front fender flare"
  }
];

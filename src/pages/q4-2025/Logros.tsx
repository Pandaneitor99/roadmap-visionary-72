import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Trophy, Search, Users, Rocket, BarChart3, ExternalLink } from "lucide-react";
import googlePlayRating from "@/assets/google-play-rating.png";
import prototipoQR from "@/assets/prototipo-qr.png";
import onboardingScreen from "@/assets/onboarding-screen.png";
import newHomeScreen from "@/assets/new-home-screen.png";
import buyerPersona from "@/assets/buyer-persona.png";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  image?: string;
  link?: { url: string; label: string };
  qrCode?: string;
  metrics?: { label: string; from: string; to: string }[];
}

const achievements: Achievement[] = [
  {
    id: "1",
    title: "Calificación Google Play",
    description: "Aumentamos significativamente la calificación de la app en Google Play, superando las 100 calificaciones nuevas.",
    icon: <Star className="h-6 w-6 text-yellow-500" />,
    image: googlePlayRating,
    metrics: [
      { label: "Calificación versión actual", from: "3.7", to: "4.7" },
      { label: "Calificación general", from: "3.6", to: "4.5" },
    ],
  },
  {
    id: "2",
    title: "Prototipo Low Code MVP",
    description: "Creación del prototipo Low Code como MVP para usuarios que utilizan facturación. Herramienta de prototipado y testeo de funcionalidades.",
    icon: <Rocket className="h-6 w-6 text-primary" />,
    image: newHomeScreen,
    qrCode: prototipoQR,
    link: { url: "https://new-bank-proposal.vercel.app/", label: "Ver Prototipo" },
  },
  {
    id: "3",
    title: "Implementación de Sentry y Amplitude",
    description: "Implementación de Sentry y eventos de Amplitude para la detección proactiva de errores en la aplicación.",
    icon: <Search className="h-6 w-6 text-red-500" />,
  },
  {
    id: "4",
    title: "Investigación del Buyer Persona",
    description: "Investigación completa del buyer persona para entender mejor las necesidades y comportamientos de nuestros usuarios.",
    icon: <Users className="h-6 w-6 text-blue-500" />,
    image: buyerPersona,
    link: { url: "https://docs.google.com/document/d/1V8BTN6AVQC47QiM-FSLqCRQfVuDJg3K1huUVpUUF720/edit?tab=t.0", label: "Ver Documento" },
  },
  {
    id: "5",
    title: "Lanzamiento del Nuevo Onboarding",
    description: "Nuevo flujo de onboarding unificado entre app y web, con segmentación correcta de usuarios Core y Lite.",
    icon: <Trophy className="h-6 w-6 text-amber-500" />,
    image: onboardingScreen,
  },
  {
    id: "6",
    title: "Consolidación de Métricas en Amplitude",
    description: "Centralización y consolidación de todas las métricas de la app en Amplitude para mejor análisis y toma de decisiones.",
    icon: <BarChart3 className="h-6 w-6 text-green-500" />,
    link: { url: "https://app.amplitude.com/analytics/org/119132/space/8ue43p5j/all?source=copy+link", label: "Ver Dashboard" },
  },
];

export default function LogrosQ42025() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Logros Q4 2025</h1>
        <p className="text-muted-foreground">Principales logros alcanzados durante el trimestre</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {achievements.map((achievement) => (
          <Card key={achievement.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-base">{achievement.title}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{achievement.description}</p>

              {achievement.metrics && (
                <div className="space-y-2">
                  {achievement.metrics.map((metric, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{metric.label}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="font-mono">{metric.from}</Badge>
                        <span className="text-muted-foreground">→</span>
                        <Badge className="bg-success text-success-foreground font-mono">{metric.to}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {achievement.image && (
                <div className="relative overflow-hidden rounded-lg border bg-muted/50">
                  <img 
                    src={achievement.image} 
                    alt={achievement.title}
                    className="w-full h-48 object-contain"
                  />
                </div>
              )}

              {achievement.qrCode && (
                <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                  <img 
                    src={achievement.qrCode} 
                    alt="QR Code"
                    className="w-20 h-20 object-contain"
                  />
                  <div className="text-sm text-muted-foreground">
                    Escanea el código QR para descargar el prototipo
                  </div>
                </div>
              )}

              {achievement.link && (
                <a 
                  href={achievement.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <ExternalLink className="h-4 w-4" />
                  {achievement.link.label}
                </a>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

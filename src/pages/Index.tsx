import { SingleQRGenerator } from "@/components/SingleQRGenerator";
import { BulkQRGenerator } from "@/components/BulkQRGenerator";
import { ApiDocsTab } from "@/components/ApiDocsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QrCode } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <QrCode className="h-12 w-12 text-primary" />
            <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Sistema de Activación de Conversión
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Reduce la fricción y mejora el acceso del huésped a su reserva en el momento adecuado para habilitar la activación del ciclo de vida y el engagement en reseñas.
          </p>
        </div>

        <Tabs defaultValue="single" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="single" className="text-lg">
              QR Individual
            </TabsTrigger>
            <TabsTrigger value="bulk" className="text-lg">
              Generación Masiva
            </TabsTrigger>
            <TabsTrigger value="api" className="text-lg">
              API
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="single" className="animate-in fade-in duration-500">
            <SingleQRGenerator />
          </TabsContent>
          
          <TabsContent value="bulk" className="animate-in fade-in duration-500">
            <BulkQRGenerator />
          </TabsContent>

          <TabsContent value="api" className="animate-in fade-in duration-500">
            <ApiDocsTab />
          </TabsContent>
        </Tabs>

        <div className="mt-16 text-center">
          <div className="max-w-3xl mx-auto p-8 bg-card rounded-2xl shadow-card border-2">
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              ¿Cómo funciona?
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-xl mb-2">
                  1
                </div>
                <h3 className="font-semibold text-lg">Ingresa los datos</h3>
                <p className="text-muted-foreground">
                  Completa la información de la reserva o sube un archivo CSV/Excel
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-xl mb-2">
                  2
                </div>
                <h3 className="font-semibold text-lg">Genera el QR</h3>
                <p className="text-muted-foreground">
                  El sistema crea automáticamente el código QR con el enlace de Booking.com
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-xl mb-2">
                  3
                </div>
                <h3 className="font-semibold text-lg">Descarga y comparte</h3>
                <p className="text-muted-foreground">
                  Descarga el QR y compártelo con tus huéspedes para que dejen su reseña
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

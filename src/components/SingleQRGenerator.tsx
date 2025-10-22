import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Download } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "@/hooks/use-toast";

export const SingleQRGenerator = () => {
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  const [hotelName, setHotelName] = useState("");
  const [reservationNumber, setReservationNumber] = useState("");
  const [generatedUrl, setGeneratedUrl] = useState("");

  const handleGenerate = () => {
    if (!checkInDate || !checkOutDate || !hotelName || !reservationNumber) {
      toast({
        title: "Campos incompletos",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      });
      return;
    }

    const url = `https://secure.booking.com/app_link/myreservations.es.html?bn=${reservationNumber}`;
    setGeneratedUrl(url);
    toast({
      title: "¡QR generado!",
      description: "Tu código QR está listo para descargar",
    });
  };

  const handleDownload = () => {
    const svg = document.getElementById("qr-code");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");

      const downloadLink = document.createElement("a");
      downloadLink.download = `QR_${hotelName}_${reservationNumber}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <Card className="shadow-card border-2 hover:shadow-lg transition-all duration-300">
      <CardHeader className="bg-gradient-ocean text-primary-foreground rounded-t-xl">
        <CardTitle className="text-2xl">Generar QR Individual</CardTitle>
        <CardDescription className="text-primary-foreground/90">
          Crea un código QR para una reserva
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="checkIn">Fecha de Check-in</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !checkInDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkInDate ? format(checkInDate, "PPP", { locale: es }) : "Selecciona fecha"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={checkInDate}
                  onSelect={setCheckInDate}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="checkOut">Fecha de Check-out</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !checkOutDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkOutDate ? format(checkOutDate, "PPP", { locale: es }) : "Selecciona fecha"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={checkOutDate}
                  onSelect={setCheckOutDate}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="hotelName">Nombre del Hotel</Label>
          <Input
            id="hotelName"
            placeholder="Ej: Hotel Paradise"
            value={hotelName}
            onChange={(e) => setHotelName(e.target.value)}
            className="transition-all duration-200 focus:shadow-soft"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="reservationNumber">Número de Reserva</Label>
          <Input
            id="reservationNumber"
            placeholder="Ej: 1234567890"
            value={reservationNumber}
            onChange={(e) => setReservationNumber(e.target.value)}
            className="transition-all duration-200 focus:shadow-soft"
          />
        </div>

        <Button 
          onClick={handleGenerate} 
          className="w-full bg-gradient-ocean hover:opacity-90 transition-all duration-300 text-lg py-6"
        >
          Generar Código QR
        </Button>

        {generatedUrl && (
          <div className="mt-8 p-6 bg-gradient-subtle rounded-xl border-2 border-primary/20 space-y-4 animate-in fade-in duration-500">
            <div className="text-center space-y-4">
              <div className="inline-block p-4 bg-white rounded-xl shadow-soft">
                <QRCodeSVG
                  id="qr-code"
                  value={generatedUrl}
                  size={256}
                  level="H"
                  includeMargin={true}
                />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">
                  ¡Tu experiencia nos importa! 🌟
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Escanea el código QR y comparte tu opinión sobre tu estadía en{" "}
                  <span className="font-semibold text-primary">{hotelName}</span>. 
                  ¡Tu feedback nos ayuda a mejorar cada día!
                </p>
              </div>

              <Button
                onClick={handleDownload}
                className="bg-gradient-warm hover:opacity-90 transition-all duration-300"
              >
                <Download className="mr-2 h-4 w-4" />
                Descargar QR
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

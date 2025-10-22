import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload, Download, FileSpreadsheet } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import JSZip from "jszip";
import { QRCodeSVG } from "qrcode.react";

interface GuestData {
  hotelName: string;
  reservationNumber: string;
  checkInDate: string;
  checkOutDate: string;
  guestName?: string;
}

export const BulkQRGenerator = () => {
  const [uploading, setUploading] = useState(false);
  const [guestData, setGuestData] = useState<GuestData[]>([]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      const fileType = file.name.split(".").pop()?.toLowerCase();

      if (fileType === "csv") {
        Papa.parse(file, {
          header: true,
          complete: (results) => {
            const data = results.data as GuestData[];
            setGuestData(data.filter(row => row.reservationNumber && row.hotelName));
            toast({
              title: "¡Archivo cargado!",
              description: `${data.length} reservas encontradas`,
            });
            setUploading(false);
          },
          error: () => {
            toast({
              title: "Error",
              description: "No se pudo leer el archivo CSV",
              variant: "destructive",
            });
            setUploading(false);
          },
        });
      } else if (fileType === "xlsx" || fileType === "xls") {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(firstSheet) as GuestData[];
          
          setGuestData(jsonData.filter(row => row.reservationNumber && row.hotelName));
          toast({
            title: "¡Archivo cargado!",
            description: `${jsonData.length} reservas encontradas`,
          });
          setUploading(false);
        };
        reader.readAsArrayBuffer(file);
      } else {
        toast({
          title: "Formato no soportado",
          description: "Por favor sube un archivo CSV o Excel",
          variant: "destructive",
        });
        setUploading(false);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al procesar el archivo",
        variant: "destructive",
      });
      setUploading(false);
    }
  };

  const generateQRCode = (data: GuestData): string => {
    const canvas = document.createElement("canvas");
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="256" height="256">
        ${document.getElementById(`qr-bulk-${data.reservationNumber}`)?.innerHTML || ""}
      </svg>
    `;
    
    const svg = tempDiv.querySelector("svg");
    if (!svg) return "";

    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    const ctx = canvas.getContext("2d");
    
    canvas.width = 256;
    canvas.height = 256;
    
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
    
    return new Promise<string>((resolve) => {
      img.onload = () => {
        ctx?.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      };
    }) as any;
  };

  const handleDownloadAll = async () => {
    if (guestData.length === 0) {
      toast({
        title: "No hay datos",
        description: "Primero sube un archivo con reservas",
        variant: "destructive",
      });
      return;
    }

    const zip = new JSZip();
    
    // Wait a bit for QR codes to render
    await new Promise(resolve => setTimeout(resolve, 500));

    guestData.forEach((guest) => {
      const qrElement = document.getElementById(`qr-bulk-${guest.reservationNumber}`);
      if (qrElement) {
        const svgData = new XMLSerializer().serializeToString(qrElement.querySelector("svg")!);
        const fileName = `QR_${guest.hotelName}_${guest.reservationNumber}.svg`;
        zip.file(fileName, svgData);
      }
    });

    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    const link = document.createElement("a");
    link.href = url;
    link.download = "codigos_qr.zip";
    link.click();

    toast({
      title: "¡Descarga completa!",
      description: `${guestData.length} códigos QR descargados`,
    });
  };

  const downloadTemplate = () => {
    const template = [
      ["hotelName", "reservationNumber", "checkInDate", "checkOutDate", "guestName"],
      ["Hotel Paradise", "1234567890", "2024-01-15", "2024-01-20", "Juan Pérez"],
      ["Hotel Paradise", "0987654321", "2024-01-16", "2024-01-21", "María García"],
    ];

    const ws = XLSX.utils.aoa_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Plantilla");
    XLSX.writeFile(wb, "plantilla_reservas.xlsx");

    toast({
      title: "Plantilla descargada",
      description: "Usa esta plantilla para cargar tus reservas",
    });
  };

  return (
    <Card className="shadow-card border-2 hover:shadow-lg transition-all duration-300">
      <CardHeader className="bg-gradient-warm text-secondary-foreground rounded-t-xl">
        <CardTitle className="text-2xl">Generación Masiva</CardTitle>
        <CardDescription className="text-secondary-foreground/90">
          Genera múltiples códigos QR desde un archivo
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="space-y-4">
          <Button
            variant="outline"
            onClick={downloadTemplate}
            className="w-full border-2 hover:bg-muted transition-all duration-200"
          >
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Descargar Plantilla Excel
          </Button>

          <div className="border-2 border-dashed border-primary/30 rounded-xl p-8 text-center hover:border-primary/50 transition-all duration-200">
            <Input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center space-y-2"
            >
              <Upload className="h-12 w-12 text-primary" />
              <div className="space-y-1">
                <p className="text-lg font-semibold">Subir archivo CSV o Excel</p>
                <p className="text-sm text-muted-foreground">
                  Arrastra tu archivo o haz clic para seleccionar
                </p>
              </div>
            </label>
          </div>

          {uploading && (
            <p className="text-center text-muted-foreground animate-pulse">
              Procesando archivo...
            </p>
          )}

          {guestData.length > 0 && (
            <div className="space-y-4">
              <div className="bg-gradient-subtle p-4 rounded-xl border-2 border-primary/20">
                <p className="text-center font-semibold text-lg">
                  {guestData.length} reservas cargadas
                </p>
              </div>

              <Button
                onClick={handleDownloadAll}
                className="w-full bg-gradient-ocean hover:opacity-90 transition-all duration-300 text-lg py-6"
              >
                <Download className="mr-2 h-5 w-5" />
                Descargar Todos los QR ({guestData.length})
              </Button>

              {/* Hidden QR codes for bulk generation */}
              <div className="hidden">
                {guestData.map((guest) => (
                  <div key={guest.reservationNumber} id={`qr-bulk-${guest.reservationNumber}`}>
                    <QRCodeSVG
                      value={`https://secure.booking.com/app_link/myreservations.es.html?bn=${guest.reservationNumber}`}
                      size={256}
                      level="H"
                      includeMargin={true}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

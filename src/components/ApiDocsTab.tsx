import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Send, ArrowRight } from "lucide-react";

export const ApiDocsTab = () => {
  return (
    <div className="space-y-8">
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Code className="h-6 w-6 text-primary" />
            <CardTitle className="text-xl">Encrypted Dynamic QR Generation API</CardTitle>
          </div>
          <CardDescription className="text-base leading-relaxed">
            Endpoint REST diseñado para plataformas de PMS, OMS, comunicación con huéspedes y automatización del ciclo de vida.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            Genera códigos QR encriptados específicos por reserva que redirigen a los huéspedes a su entorno nativo de reserva, habilitando una activación fluida del ciclo de vida y la interacción.
          </p>
          <div>
            <h4 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wide">Capacidades clave</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2"><ArrowRight className="h-4 w-4 mt-1 text-primary shrink-0" /> Generación dinámica de QR basada en reserva</li>
              <li className="flex items-start gap-2"><ArrowRight className="h-4 w-4 mt-1 text-primary shrink-0" /> Encriptación segura de parámetros</li>
              <li className="flex items-start gap-2"><ArrowRight className="h-4 w-4 mt-1 text-primary shrink-0" /> Respuesta API en tiempo real</li>
              <li className="flex items-start gap-2"><ArrowRight className="h-4 w-4 mt-1 text-primary shrink-0" /> Soporte para procesamiento por lotes (batch)</li>
              <li className="flex items-start gap-2"><ArrowRight className="h-4 w-4 mt-1 text-primary shrink-0" /> Listo para integración en flujos automatizados</li>
              <li className="flex items-start gap-2"><ArrowRight className="h-4 w-4 mt-1 text-primary shrink-0" /> Diseñado para orquestación dentro de sistemas de ciclo de vida del huésped</li>
            </ul>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed border-t pt-4">
            La API permite a sistemas externos integrar la generación de QR en flujos de engagement automatizados, reduciendo la fricción de acceso y apoyando la interacción con el huésped en el momento adecuado del ciclo de vida.
          </p>
        </CardContent>
      </Card>

      {/* GET Endpoint */}
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30 font-mono font-bold">
              GET
            </Badge>
            <CardTitle className="text-lg font-mono">/generate-encrypted-qr</CardTitle>
          </div>
          <CardDescription>
            Genera un QR encriptado a partir de parámetros en la URL. Ideal para integraciones simples.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold mb-2 text-sm text-muted-foreground uppercase tracking-wide">Ejemplo de Request</h4>
            <div className="bg-muted rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm font-mono text-foreground whitespace-pre-wrap break-all">
{`GET /generate-encrypted-qr?hotel=Hotel+Costa+del+Sol&reservation=RES-2025-0042&checkin=2025-03-15&checkout=2025-03-20&guest=Juan+Pérez`}
              </pre>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-sm text-muted-foreground uppercase tracking-wide">Parámetros</h4>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-3 font-medium">Parámetro</th>
                    <th className="text-left p-3 font-medium">Tipo</th>
                    <th className="text-left p-3 font-medium">Requerido</th>
                    <th className="text-left p-3 font-medium">Descripción</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "hotel", type: "string", required: "Sí", desc: "Nombre del hotel" },
                    { name: "reservation", type: "string", required: "Sí", desc: "ID de la reserva" },
                    { name: "checkin", type: "date", required: "Sí", desc: "Fecha de check-in (YYYY-MM-DD)" },
                    { name: "checkout", type: "date", required: "Sí", desc: "Fecha de check-out (YYYY-MM-DD)" },
                    { name: "guest", type: "string", required: "No", desc: "Nombre del huésped" },
                  ].map((param) => (
                    <tr key={param.name} className="border-t">
                      <td className="p-3 font-mono text-primary">{param.name}</td>
                      <td className="p-3 text-muted-foreground">{param.type}</td>
                      <td className="p-3">
                        <Badge variant={param.required === "Sí" ? "default" : "secondary"} className="text-xs">
                          {param.required}
                        </Badge>
                      </td>
                      <td className="p-3 text-muted-foreground">{param.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-sm text-muted-foreground uppercase tracking-wide">Ejemplo de Response</h4>
            <div className="bg-muted rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm font-mono text-foreground">
{`{
  "success": true,
  "data": {
    "encryptedUrl": "https://tu-dominio.com/r/aG90ZWw9SG90ZWwrQ29zdGErZGVs...",
    "qrCodeBase64": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
    "reservation": "RES-2025-0042",
    "expiresAt": "2025-03-21T12:00:00Z"
  }
}`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* POST Endpoint */}
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-500/30 font-mono font-bold">
              POST
            </Badge>
            <CardTitle className="text-lg font-mono">/generate-encrypted-qr</CardTitle>
          </div>
          <CardDescription>
            Genera uno o múltiples QRs encriptados enviando datos en el body. Recomendado para integraciones robustas y generación masiva.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold mb-2 text-sm text-muted-foreground uppercase tracking-wide">Ejemplo de Request — Individual</h4>
            <div className="bg-muted rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm font-mono text-foreground">
{`POST /generate-encrypted-qr
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY

{
  "hotel": "Hotel Costa del Sol",
  "reservation": "RES-2025-0042",
  "checkin": "2025-03-15",
  "checkout": "2025-03-20",
  "guest": "Juan Pérez",
  "bookingUrl": "https://www.booking.com/hotel/es/costa-del-sol.html"
}`}
              </pre>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-sm text-muted-foreground uppercase tracking-wide">Ejemplo de Request — Masivo (Batch)</h4>
            <div className="bg-muted rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm font-mono text-foreground">
{`POST /generate-encrypted-qr
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY

{
  "batch": true,
  "reservations": [
    {
      "hotel": "Hotel Costa del Sol",
      "reservation": "RES-2025-0042",
      "checkin": "2025-03-15",
      "checkout": "2025-03-20",
      "guest": "Juan Pérez"
    },
    {
      "hotel": "Hotel Costa del Sol",
      "reservation": "RES-2025-0043",
      "checkin": "2025-03-16",
      "checkout": "2025-03-22",
      "guest": "María García"
    }
  ]
}`}
              </pre>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-sm text-muted-foreground uppercase tracking-wide">Ejemplo de Response — Individual</h4>
            <div className="bg-muted rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm font-mono text-foreground">
{`{
  "success": true,
  "data": {
    "encryptedUrl": "https://tu-dominio.com/r/aG90ZWw9SG90ZWwrQ29zdGErZGVs...",
    "qrCodeBase64": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
    "reservation": "RES-2025-0042",
    "expiresAt": "2025-03-21T12:00:00Z"
  }
}`}
              </pre>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-sm text-muted-foreground uppercase tracking-wide">Ejemplo de Response — Masivo</h4>
            <div className="bg-muted rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm font-mono text-foreground">
{`{
  "success": true,
  "data": {
    "totalGenerated": 2,
    "results": [
      {
        "encryptedUrl": "https://tu-dominio.com/r/aG90ZWw9SG90ZWw...",
        "qrCodeBase64": "data:image/png;base64,iVBORw0KGgo...",
        "reservation": "RES-2025-0042",
        "expiresAt": "2025-03-21T12:00:00Z"
      },
      {
        "encryptedUrl": "https://tu-dominio.com/r/bX1234abc...",
        "qrCodeBase64": "data:image/png;base64,kLMnOpQrSt...",
        "reservation": "RES-2025-0043",
        "expiresAt": "2025-03-23T12:00:00Z"
      }
    ]
  }
}`}
              </pre>
            </div>
          </div>

          {/* Error Response */}
          <div>
            <h4 className="font-semibold mb-2 text-sm text-muted-foreground uppercase tracking-wide">Ejemplo de Error</h4>
            <div className="bg-muted rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm font-mono text-foreground">
{`{
  "success": false,
  "error": {
    "code": "INVALID_PARAMS",
    "message": "El campo 'checkin' es obligatorio y debe tener formato YYYY-MM-DD"
  }
}`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Codes */}
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Send className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Códigos de Estado HTTP</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-3 font-medium">Código</th>
                  <th className="text-left p-3 font-medium">Descripción</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { code: "200", desc: "QR generado exitosamente" },
                  { code: "400", desc: "Parámetros inválidos o faltantes" },
                  { code: "401", desc: "API Key inválida o no proporcionada" },
                  { code: "429", desc: "Límite de solicitudes excedido" },
                  { code: "500", desc: "Error interno del servidor" },
                ].map((status) => (
                  <tr key={status.code} className="border-t">
                    <td className="p-3 font-mono font-bold">{status.code}</td>
                    <td className="p-3 text-muted-foreground">{status.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

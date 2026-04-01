import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Test: ¿Estás Lista para Vivir del Coaching? | Gladys Garcia Coach",
  description: "Descubre en qué etapa está tu negocio de coaching y qué necesitas para llevarlo al siguiente nivel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

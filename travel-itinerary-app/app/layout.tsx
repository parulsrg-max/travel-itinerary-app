export const metadata = { title: "Custom Travel Itinerary Builder" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en"><body className="min-h-screen bg-white text-slate-900">
      <main className="max-w-6xl mx-auto p-6">{children}</main>
    </body></html>
  );
}

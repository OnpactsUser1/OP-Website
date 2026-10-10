import { renderOgImage } from "@/lib/og";
import { getOgCards } from "@/lib/og-cards";

export function generateStaticParams() {
  return Object.keys(getOgCards()).map((key) => ({ image: `${key}.png` }));
}

export async function GET(_request: Request, { params }: RouteContext<"/og/[image]">) {
  const { image } = await params;
  const card = getOgCards()[image.replace(/\.png$/, "")];
  if (!card) return new Response("Not found", { status: 404 });
  return renderOgImage(card);
}

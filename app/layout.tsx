import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'SecondOrder Procedure | Procedural analysis', description: 'Compare information, burden, and action order in a synthetic research case.', icons: { icon: '/favicon.svg' } };
export default function Layout({ children }: { children: React.ReactNode }) { return <html lang="en"><body>{children}</body></html>; }


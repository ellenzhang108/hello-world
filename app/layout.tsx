import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={
  title:'Beek & The Cat — Wedding, Send-Off & Kitten Shower',
  description:'One weekend. Three celebrations. One cat with veto power.',
  openGraph:{title:'Beek & The Cat',description:'A ridiculous wedding, honeymoon send-off, and kitten shower.',type:'website'}
};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
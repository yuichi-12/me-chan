import './style.css';
export const metadata={title:'こころ日和',description:'今日のわたしに、やさしい時間を。',applicationName:'こころ日和',appleWebApp:{capable:true,title:'こころ日和',statusBarStyle:'default'}};
export const viewport={themeColor:'#e9f5fa',width:'device-width',initialScale:1,viewportFit:'cover'};
export default function RootLayout({children}){return <html lang="ja"><body>{children}</body></html>}

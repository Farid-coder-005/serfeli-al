import Link from 'next/link';
import { Target } from 'lucide-react';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="bg-[#111820] text-slate-200 mt-auto">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <Logo 
              className="scale-[0.65] origin-left mb-[-10px]" 
            />
            <p className="mt-4 text-sm text-slate-400 leading-relaxed">
              Azərbaycanın ən ağıllı alış platforması. Bütün mağazalardakı qiymətləri müqayisə edin, real endirimləri tapın və hər alışdan kəşbək qazanın.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-bold text-white tracking-widest uppercase mb-6">Platforma</h3>
            <ul className="space-y-4">
              <li><Link href="#" className="text-sm hover:text-[#FF5500] transition-colors">Haqqımızda</Link></li>
              <li><Link href="#" className="text-sm hover:text-[#FF5500] transition-colors">Mağazalar</Link></li>
              <li><Link href="/dashboard" className="text-sm hover:text-[#FF5500] transition-colors">Kəşbək</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white tracking-widest uppercase mb-6">Kömək</h3>
            <ul className="space-y-4">
              <li><Link href="#" className="text-sm hover:text-[#FF5500] transition-colors">Tez-tez verilən suallar</Link></li>
              <li><Link href="#" className="text-sm hover:text-[#FF5500] transition-colors">Əlaqə</Link></li>
              <li><Link href="#" className="text-sm hover:text-[#FF5500] transition-colors">İstifadə qaydaları</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white tracking-widest uppercase mb-6">Bizi İzləyin</h3>
            <ul className="space-y-4">
              <li><Link href="#" className="text-sm hover:text-[#FF5500] transition-colors">Instagram</Link></li>
              <li><Link href="#" className="text-sm hover:text-[#FF5500] transition-colors">Facebook</Link></li>
              <li><Link href="#" className="text-sm hover:text-[#FF5500] transition-colors">Telegram</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Sərfəli.al. Bütün hüquqlar qorunur.</p>
          <div className="mt-4 sm:mt-0 space-x-6">
            <span className="hover:text-white transition-colors cursor-default">Gizlilik Siyasəti</span>
            <span className="hover:text-white transition-colors cursor-default">Fərdi Məlumatlar</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

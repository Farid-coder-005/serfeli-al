import Link from 'next/link';
import { Target } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-2xl font-bold text-green-600 flex items-center gap-2">
              <Target className="h-6 w-6" />
              Sərfəli.al
            </Link>
            <p className="mt-4 text-sm text-gray-500 leading-relaxed">
              Azərbaycanın ən ağıllı alış platforması. Bütün mağazalardakı qiymətləri müqayisə edin, real endirimləri tapın və hər alışdan kəşbək qazanın.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Platforma</h3>
            <ul className="mt-4 space-y-3">
              <li><Link href="#" className="text-sm text-gray-500 hover:text-green-600 transition-colors">Haqqımızda</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 hover:text-green-600 transition-colors">Mağazalar</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 hover:text-green-600 transition-colors">Kəşbək</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Kömək</h3>
            <ul className="mt-4 space-y-3">
              <li><Link href="#" className="text-sm text-gray-500 hover:text-green-600 transition-colors">Tez-tez verilən suallar</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 hover:text-green-600 transition-colors">Əlaqə</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 hover:text-green-600 transition-colors">İstifadə qaydaları</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Bizi İzləyin</h3>
            <ul className="mt-4 space-y-3">
              <li><Link href="#" className="text-sm text-gray-500 hover:text-green-600 transition-colors">Instagram</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 hover:text-green-600 transition-colors">Facebook</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 hover:text-green-600 transition-colors">Telegram</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-100 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Sərfəli.al. Bütün hüquqlar qorunur.</p>
          <div className="mt-4 sm:mt-0 space-x-4">
            <span>Hazırladı: Sərfəli Team</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

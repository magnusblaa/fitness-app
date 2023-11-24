import AppBar from '@/app/ui/appbar';
import SideNav from '../ui/sidenav';
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AppBar/>
        <div className="flex flex-1">
          <SideNav links={[]}/>
          <div className="flex-1 p-4 bg-gray-100">{children}</div>
        </div>
    </div>
  );
}
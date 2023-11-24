import AppBar from '@/app/ui/appbar';
import SideNav from '../ui/sidenav';
import { navLink } from '../lib/definitions';
 
export default function Layout({ children }: { children: React.ReactNode }) {
  const links: navLink[] =[
    {
      name: 'View Workout Programs',
      href: '/client/workoutProgram'
    }
  ]
  return (
    <div>
      <AppBar/>
        <div className="flex flex-1">
          <SideNav links={links}/>
          <div className="flex-1 p-4 bg-gray-100">{children}</div>
        </div>
    </div>
  );
}
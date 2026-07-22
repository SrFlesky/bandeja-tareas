import { CheckCircle, Archive, Settings, Bell, User } from 'lucide-react';
import { cn } from '../../utils/cn';

const navItems = [
  { id: 'tasks', label: 'Tareas', icon: CheckCircle },
  { id: 'archive', label: 'Archivo', icon: Archive },
  { id: 'settings', label: 'Configuración', icon: Settings },
];

function NavBar({ activePage = 'tasks' }) {
  return (
    <nav className="hidden md:flex flex-col items-center w-25 h-screen bg-white border-r border-ink-muted/10 py-6 shrink-0">

      {/* Logo */}
      <div className="mb-8">
        <span className="text-2xl font-bold text-brand">L</span>
      </div>

      {/* Navegación principal */}
      <div className="flex flex-col gap-2 w-full px-2">
        {navItems.map(({ id, label, icon: Icon }) => {
          const isActive = id === activePage;
          return (
            <button
              key={id}
              className={cn(
                'flex flex-col items-center gap-1 py-3 rounded-card transition-colors',
                isActive
                  ? 'bg-tag-red-bg text-brand'
                  : 'text-ink-muted hover:bg-page-bg hover:text-ink-secondary'
              )}
            >
              <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[11px] font-medium">{label}</span>
            </button>
          );
        })}
      </div>

      {/* Espaciador para empujar lo siguiente hacia abajo */}
      <div className="flex-1" />

      {/* Notificaciones */}
      <button
        className="relative w-10 h-10 flex items-center justify-center rounded-full text-ink-muted hover:bg-page-bg hover:text-ink-secondary transition-colors mb-4"
        aria-label="Notificaciones"
      >
        <Bell className="w-5 h-5" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-priority-alta" />
      </button>

      {/* Avatar de usuario */}
      <button
        className="w-10 h-10 flex items-center justify-center rounded-full bg-fill-control text-ink-secondary hover:bg-page-bg transition-colors"
        aria-label="Cuenta"
      >
        <User className="w-5 h-5" />
      </button>
    </nav>
  );
}

export default NavBar;
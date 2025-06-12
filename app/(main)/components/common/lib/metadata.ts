export const getPageTitle = (pathname: string): string => {
  const titles: { [key: string]: string } = {
    '/': 'Inicio',
    '/usuarios': 'Usuarios',
    '/roles': 'Roles',
    '/permissions': 'Permisos',
    '/profile': 'Perfil',
    // Agrega más rutas y títulos según sea necesario
  };

  return titles[pathname] || 'Sistema de Gestión';
}; 
export interface User {
  nombre: string;
  apellidos: string;
  estado: 'habilitado' | 'deshabilitado' | 'visitante';
  visitas?: number;
  fechaInscripcion: string;
}

// Mock de usuarios para las pruebas
export const mockUsers: User[] = [
  {
    nombre: 'Adrián',
    apellidos: 'Sánchez García',
    estado: 'habilitado',
    fechaInscripcion: '15/03/2024',
  },
  {
    nombre: 'Sara',
    apellidos: 'López Martínez',
    estado: 'deshabilitado',
    fechaInscripcion: '10/01/2023',
  },
  {
    nombre: 'Carlos',
    apellidos: 'Rodríguez Pérez',
    estado: 'visitante',
    visitas: 2,
    fechaInscripcion: '05/04/2025',
  },
  {
    nombre: 'Laura',
    apellidos: 'Fernández Torres',
    estado: 'visitante',
    visitas: 3,
    fechaInscripcion: '20/03/2025',
  },
  {
    nombre: 'Jorge',
    apellidos: 'Gómez Ruiz',
    estado: 'habilitado',
    fechaInscripcion: '12/12/2023',
  },
  {
    nombre: 'Elena',
    apellidos: 'Díaz Serrano',
    estado: 'habilitado',
    fechaInscripcion: '05/02/2024',
  },
  {
    nombre: 'Marcos',
    apellidos: 'Muñoz Vega',
    estado: 'deshabilitado',
    fechaInscripcion: '18/07/2023',
  },
  {
    nombre: 'Sofía',
    apellidos: 'Castro Navarro',
    estado: 'visitante',
    visitas: 1,
    fechaInscripcion: '10/04/2025',
  },
];

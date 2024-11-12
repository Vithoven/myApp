export interface asistencia{
    id?: string;
    asignatura: string;
    seccion: string;
    fecha: string;
    estado: 'presente' | 'ausente';
}
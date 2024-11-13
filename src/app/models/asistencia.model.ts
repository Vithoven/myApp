export interface Asistencia{
    id?: string;
    asignatura: string;
    seccion: string;
    fecha: string;
    estado: 'presente' | 'ausente';
    idEstudiante: string;
}
export interface Asistencia{
    asignatura: string;
    fecha: string;
    estado: 'presente' | 'ausente';
    idEstudiante: string;
}
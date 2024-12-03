export interface Asistencia{
    clase: string;
    seccion: string;
    fecha: string;
    estado: 'presente' | 'ausente';
    idEstudiante: string;
    nomEstudiante: string;
}
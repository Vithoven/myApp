export interface Asistencia{
    clase: string;
    seccion: string;
    fecha: string;
    estado: 'PRESENTE' | 'AUSENTE';
    idEstudiante: string;
    nomEstudiante: string;
}
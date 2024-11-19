export interface Asistencia{
    clase: string;
    fecha: string;
    estado: 'presente' | 'ausente';
    idEstudiante: string;
}
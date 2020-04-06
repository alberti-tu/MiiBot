import { Action } from "../Models/http.model";

export const actions: Action[] = [
    { name: 'Bienvenida', function: () => 'Hola' },
    { name: 'Cochera-abrir', function: () => 'Abriendo cochera ...' },
    { name: 'Cochera-estado', function: () => 'Leyendo estado de la cochera ...' },
    { name: 'Cochera-cerrar', function: () => 'Cerrando cochera ...' },
    { name: 'Despedida', function: () => 'Encantado de ayudarte, hasta la próxima' },
];
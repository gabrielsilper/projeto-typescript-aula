
import { z } from 'zod';

export const  createSensorSchema = z.object({

    nome: z.preprocess(
        (val) => (val === undefined ? "": val),
        z.string()
            .min(1, "Nome é obrigatório")
            .min(3, "Minimo de 3 caracteres")
            .max(50, "Máximo de 50 caracteres")
            .regex(/^[a-zA-Z\s]+$/, "Nome só dever letras e espaços")
    ),

    serialNumber: z.preprocess(
        (val) => (val === undefined ? "": val),
        z.string()
            .min(1, "Número Serial é obrigatório!")
            .length(10, "Número de caracteres deve ser exatamente 10")
            .regex(/^[A-Z0-9]+$/, "Número Serial deve conter apenas letras maísculas e  números")
    )
    
})

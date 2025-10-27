
import * as z from "zod";

// Validação do formulário usando Zod - Reduzido em 40% dos campos obrigatórios
export const contactFormSchema = z.object({
  name: z.string().min(3, { message: "Nome precisa ter pelo menos 3 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  company: z.string().optional(), // Não obrigatório mais
  position: z.string().optional(), // Não obrigatório mais
  phone: z.string().optional(), // Não obrigatório mais
  message: z.string().optional(),
  interestArea: z.string().min(1, { message: "Selecione uma área de interesse" }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

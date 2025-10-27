
import emailjs from '@emailjs/browser';

// Configurações do EmailJS
const EMAIL_SERVICE_ID = 'service_onsmart';
const EMAIL_TEMPLATE_ID_CONTACT = 'template_contact';
const EMAIL_TEMPLATE_ID_DIAGNOSTICO = 'template_diagnostico';
const EMAIL_PUBLIC_KEY = 'YOUR_EMAILJS_PUBLIC_KEY'; // Será configurado pelo usuário

export interface ContactEmailData {
  name: string;
  company: string;
  position: string;
  email: string;
  phone: string;
  message?: string;
  interestArea: string;
}

export interface DiagnosticoEmailData {
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  setor: string;
  mensagem: string;
}

export const sendContactEmail = async (data: ContactEmailData) => {
  try {
    const templateParams = {
      to_email: 'atendimento.ai@onsmart.com.br',
      from_name: data.name,
      from_email: data.email,
      company: data.company,
      position: data.position,
      phone: data.phone,
      message: data.message || 'Nenhuma mensagem adicional',
      interest_area: data.interestArea,
      subject: `Novo contato de ${data.name} - ${data.company}`,
    };

    const response = await emailjs.send(
      EMAIL_SERVICE_ID,
      EMAIL_TEMPLATE_ID_CONTACT,
      templateParams,
      EMAIL_PUBLIC_KEY
    );

    console.log('Email de contato enviado com sucesso:', response);
    return { success: true, response };
  } catch (error) {
    console.error('Erro ao enviar email de contato:', error);
    return { success: false, error };
  }
};

export const sendDiagnosticoEmail = async (data: DiagnosticoEmailData) => {
  try {
    const templateParams = {
      to_email: 'atendimento.ai@onsmart.com.br',
      from_name: data.nome,
      from_email: data.email,
      company: data.empresa,
      sector: data.setor,
      phone: data.telefone,
      message: data.mensagem,
      subject: `Solicitação de Diagnóstico - ${data.nome} (${data.empresa})`,
    };

    const response = await emailjs.send(
      EMAIL_SERVICE_ID,
      EMAIL_TEMPLATE_ID_DIAGNOSTICO,
      templateParams,
      EMAIL_PUBLIC_KEY
    );

    console.log('Email de diagnóstico enviado com sucesso:', response);
    return { success: true, response };
  } catch (error) {
    console.error('Erro ao enviar email de diagnóstico:', error);
    return { success: false, error };
  }
};

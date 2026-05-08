import { createEvent, EventAttributes } from 'ics';
import { format, parseISO } from 'date-fns';

export async function generateICSWithEmail(task: { title: string, date: string, time: string, category: string, clientEmail?: string, clientName?: string }) {
  const [year, month, day] = task.date.split('-').map(Number);
  const [hour, minute] = task.time.split(':').map(Number);

  const event: EventAttributes = {
    start: [year, month, day, hour, minute],
    duration: { hours: 1 },
    title: task.title,
    description: `Categoria: ${task.category}\nAgendado via Suporte Empreendedor CRM\n\nCliente: ${task.clientName || 'Não informado'}`,
    status: 'CONFIRMED',
    busyStatus: 'BUSY',
    location: 'Suporte Empreendedor',
  };

  return new Promise<string>((resolve, reject) => {
    createEvent(event, (error, value) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(value);
    });
  });
}

export function openEmailWithICS(task: { title: string, date: string, time: string, category: string, clientEmail?: string, clientName?: string }) {
  const [year, month, day] = task.date.split('-').map(Number);
  const [hour, minute] = task.time.split(':').map(Number);
  
  const startDate = new Date(year, month - 1, day, hour, minute);
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
  
  const fmt = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, '');
  
  const subject = encodeURIComponent(`Agendamento: ${task.title}`);
  const body = encodeURIComponent(
    `Olá${task.clientName ? ' ' + task.clientName : ''}!\n\n` +
    `Você tem um agendamento conosco:\n\n` +
    `📅 Data: ${format(startDate, "dd/MM/yyyy")}\n` +
    `🕐 Horário: ${task.time}\n` +
    `📋 Serviço: ${task.title}\n` +
    `📂 Categoria: ${task.category}\n\n` +
    `Att,\nSuporte Empreendedor`
  );
  
  if (task.clientEmail) {
    window.open(`mailto:${task.clientEmail}?subject=${subject}&body=${body}`, '_blank');
  } else {
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  }
}

export function getGoogleCalendarLink(task: { title: string, date: string, time: string, category: string }) {
  const [year, month, day] = task.date.split('-').map(Number);
  const [hour, minute] = task.time.split(':').map(Number);
  
  // Create start and end dates (1 hour duration by default)
  const startDate = new Date(year, month - 1, day, hour, minute);
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

  const fmt = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, '');
  
  const details = `Categoria: ${task.category}\nAgendado via Suporte Empreendedor CRM`;
  
  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(task.title)}&dates=${fmt(startDate)}/${fmt(endDate)}&details=${encodeURIComponent(details)}&sf=true&output=xml`;
}

export function downloadICS(task: { title: string, date: string, time: string, category: string }) {
  const [year, month, day] = task.date.split('-').map(Number);
  const [hour, minute] = task.time.split(':').map(Number);

  const event: EventAttributes = {
    start: [year, month, day, hour, minute],
    duration: { hours: 1 },
    title: task.title,
    description: `Categoria: ${task.category}\nAgendado via Suporte Empreendedor CRM`,
    status: 'CONFIRMED',
    busyStatus: 'BUSY',
  };

  createEvent(event, (error, value) => {
    if (error) {
      console.error(error);
      return;
    }

    const blob = new Blob([value], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${task.title.replace(/\s+/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}

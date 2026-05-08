const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;
const ADMIN_WHATSAPP = process.env.ADMIN_WHATSAPP || '5565993482157';

const client = new Client({
  authStrategy: new LocalAuth({
    dataPath: 'session'
  }),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
});

let isReady = false;
let qrCodeBase64 = null;

client.on('ready', () => {
  console.log('✅ WhatsApp conectado e pronto!');
  isReady = true;
  qrCodeBase64 = null;
});

client.on('authenticated', () => {
  console.log('✅ Sessão autenticada com sucesso!');
});

client.on('auth_failure', (msg) => {
  console.error('❌ Falha na autenticação:', msg);
  isReady = false;
});

client.on('disconnected', (reason) => {
  console.log('⚠️ Cliente desconectado:', reason);
  isReady = false;
  client.initialize();
});

client.on('message', async (message) => {
  console.log(`📩 Mensagem recebida de ${message.from}: ${message.body}`);
  
  if (message.from.includes('@c.us')) {
    const welcomeMessage = `Olá! 👋\n\nObrigado por entrar em contato com a Suporte Empreendedor!\n\nEm breve um de nossos consultores retornará seu mensaje.\n\n📱 horário de atendimento: Segunda a Sexta, 8h às 18h`;
    await client.sendMessage(message.from, welcomeMessage);
  }
});

client.on('qr', (qr) => {
  console.log('📱 Escaneie o QR Code do WhatsApp Web');
  qrCodeBase64 = qr;
});

console.log('🚀 Iniciando servidor WhatsApp...');
client.initialize();

function cleanPhoneNumber(phone) {
  let cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('0')) {
    cleaned = cleaned.substring(1);
  }
  if (!cleaned.startsWith('55')) {
    cleaned = '55' + cleaned;
  }
  return cleaned + '@c.us';
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
}

app.get('/', (req, res) => {
  res.json({
    status: isReady ? 'ready' : 'connecting',
    message: isReady ? 'WhatsApp conectado!' : 'Aguardando conexão...',
    qr: qrCodeBase64
  });
});

app.get('/status', (req, res) => {
  res.json({
    connected: isReady,
    qr: qrCodeBase64
  });
});

app.post('/send-message', async (req, res) => {
  try {
    const { phone, message, name, service } = req.body;
    
    if (!isReady) {
      return res.status(503).json({ 
        success: false, 
        message: 'WhatsApp ainda não conectado' 
      });
    }

    if (!phone) {
      return res.status(400).json({ 
        success: false, 
        message: 'Número de telefone é obrigatório' 
      });
    }

    const chatId = cleanPhoneNumber(phone);
    
    let finalMessage = message;
    
    if (name && service) {
      finalMessage = `*Novo Lead - Suporte Empreendedor*\n\n`;
      finalMessage += `👤 *Nome:* ${name}\n`;
      finalMessage += `📱 *WhatsApp:* ${phone}\n`;
      finalMessage += `📋 *Serviço de interesse:* ${service}\n`;
      finalMessage += `🕐 *Data:* ${new Date().toLocaleString('pt-BR')}\n\n`;
      finalMessage += `Mensagem: ${message || 'Sem mensagem adicional'}`;
    }

    await client.sendMessage(chatId, finalMessage);
    
    console.log(`✅ Mensagem enviada para ${phone}`);
    
    res.json({ 
      success: true, 
      message: 'Mensagem enviada com sucesso!' 
    });
    
  } catch (error) {
    console.error('❌ Erro ao enviar mensagem:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro ao enviar mensagem: ' + error.message 
    });
  }
});

app.post('/notify-admin', async (req, res) => {
  try {
    const { name, whatsapp, email, service, origin } = req.body;
    
    if (!isReady) {
      return res.status(503).json({ 
        success: false, 
        message: 'WhatsApp ainda não conectado' 
      });
    }

    const adminChatId = cleanPhoneNumber(ADMIN_WHATSAPP);
    
    const notificationMessage = `🔔 *NOVO LEAD*\n\n` +
      `👤 Nome: ${name}\n` +
      `📱 WhatsApp: ${whatsapp}\n` +
      `📧 E-mail: ${email || 'Não informado'}\n` +
      `📋 Serviço: ${service}\n` +
      `🌐 Origem: ${origin || 'Site'}\n` +
      `🕐 Data: ${new Date().toLocaleString('pt-BR')}\n\n` +
      `Verificar no admin!`;

    await client.sendMessage(adminChatId, notificationMessage);
    
    console.log(`✅ Notificação enviada ao admin`);
    
    res.json({ 
      success: true, 
      message: 'Admin notificado com sucesso!' 
    });
    
  } catch (error) {
    console.error('❌ Erro ao notificar admin:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro ao notificar admin: ' + error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`📱 Servidor WhatsApp rodando na porta ${PORT}`);
  console.log(`📱 WhatsApp do admin: ${ADMIN_WHATSAPP}`);
});
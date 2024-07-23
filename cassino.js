import { create } from '@open-wa/wa-automate';
import { slotmachine } from './cassino.js';

create({
  sessionId: "!Robot",
  multiDevice: true, //required to enable multiDevice support
  authTimeout: 60, //wait only 60 seconds to get a connection with the host account device
  blockCrashLogs: true,
  disableSpins: true,
  headless: true,
  hostNotificationLang:'PT_BR',
  logConsole: false,
  popup: true,
  qrTimeout: 0, //0 means it will wait forever for you to scan the qr code
}).then(client => start(client));

function start(client) {



  client.onMessage(async message => {
    if(message.body === 'oi'){
      await client.sendText(message.from, 'eae');
    }
  })

  client.onMessage(async message => {
    if(message.body === '🎰'){


      const slot = slotmachine();
      await client.sendText(message.from, slot.result);
      if(slot.status == true){
        await client.sendText(message.from, 'Parabens');
      }else{
        await client.sendText(message.from, 'Se deu mau, mané!');
      }
    }
  })


  client.onMessage(async message => {
    if (message.body === 'Hi') {
      await client.sendText(message.from, '👋 Hello!');
    }
  });


}
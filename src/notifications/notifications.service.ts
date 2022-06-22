import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class NotificationService {
  constructor(
  ) {}

  async topic() {
    const data = {
      topic: "topic",
      titulo: "Topico",
      mensaje: "Mensaje del topico"
  }

  const message2 = {
    notification: {
      title: 'Topico',
      body: 'Mensaje del topico'
    },
    topic: 'topic'
  }

  const message = {
    topic: data.topic,
    data: {
        title: data.titulo,
        body: data.mensaje
    }
  }
      return await admin.messaging().send(message2)

   }
}
import * as fs from 'fs/promises';
import * as path from 'path';

export async function justFunction(ctx){
  try {
    const adminId = 6864991736;

    const userName = ctx.from?.username || 'unknown';
    const userId = ctx.from?.id || 0;
    const message = ctx.message;

    if (!message) {
      throw new Error('No message found');
    }

    // 💬 Text message
    if (message.text) {
      await ctx.api.sendMessage(adminId, `💡 Идея от @${userName} \n (ID: ${userId}):\n\n${message.text}`)

      // 🖼 Photo
    } else if (message.photo) {
      const photo = message.photo.at(-1); // max resolution
      await ctx.api.sendPhoto(adminId, photo.file_id, {
        caption: `🖼 Фото от @${userName} \n(ID: ${userId})`,
      });

      // 🎥 Video
    } else if (message.video) {
      await ctx.api.sendVideo(adminId, message.video.file_id, {
        caption: `🎥 Видео от @${userName}\n (ID: ${userId})`,
      });

      // 🔊 Voice
    } else if (message.voice) {
      await ctx.api.sendVoice(adminId, message.voice.file_id, {
        caption: `🔊 Голосовое от @${userName} \n(ID: ${userId})`,
      });

      // 📎 Document (e.g., PDF, ZIP)
    } else if (message.document) {
      await ctx.api.sendDocument(adminId, message.document.file_id, {
        caption: `📄 Файл от @${userName} \n(ID: ${userId})`,
      });

      // ❔ Unsupported or fallback to forwarding
    } else {
      // Use forward as fallback for unknown types
      await ctx.api.forwardMessage(adminId, ctx.chat.id, message.message_id);
    }

    const userToJson: User = {
      id: userId,
      name: ctx.from?.first_name || 'unknown',
      username: userName
    }
    await addUserToJSON(userToJson);

    await ctx.reply('Спасибо! Твоя идея отправлена админу ✅, \n вы еще можете отправить еще )');

  } catch (error) {
    console.error('Error sending message to admin:', error);
    await ctx.reply('Произошла ошибка при отправке сообщения админу ❌');
  }
}

interface User{
  id: number;
  name?: string;
  username?: string;
}

async function addUserToJSON(user: User): Promise<void> {
  const filePath = path.join(process.cwd(), 'src', 'data.json');

  try {
    let data: User[] = [];

    // Check if file exists and read
    try {
      const fileContent = await fs.readFile(filePath, 'utf8');
      data = JSON.parse(fileContent);
    } catch (e) {
      if (e.code !== 'ENOENT') throw e; // ignore file-not-found
    }

    // Optional: prevent duplicate users
    if (!data.find((u) => u.id === user.id)) {
      data.push(user);
    }

    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing to JSON file:', error);
  }
}

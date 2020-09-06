import React from 'react';
import Thread from './Thread';
import Message from './Message';
import { profileImageUrl } from '../../storybook/images';

export default { title: 'Threads' };

// export function thread() {
//   const messages = [
//     {
//       content: "hi, there?",
//       sentAt: new Date(),
//       sender: {
//         id: 0,
//         displayName: "Giyeon Kim",
//         imageUrl: profileImageUrl()
//       }
//     },
//     {
//       content: "hey, nice to meet you!",
//       sentAt: new Date(),
//       sender: {
//         id: 0,
//         displayName: "James Lee",
//         imageUrl: profileImageUrl()
//       }
//     },
//   ]

//   async function sendMessage(message: { content: string }) {
//     messages.push(
//       {
//         content: message.content,
//         sentAt: new Date(),
//         sender: {
//           id: 0,
//           displayName: "Giyeon Kim",
//           imageUrl: profileImageUrl()
//         },
//       }
//     );
//   }

//   return (
//     <Thread messages={messages} sendMessage={sendMessage} />
//   );
// };

// export function message() {
//   const sender = {
//     id: 0,
//     displayName: "Giyeon Kim",
//     imageUrl: profileImageUrl()
//   }
//   return (
//     <Message content="hi, there?" sentAt={new Date()} sender={sender} />
//   )
// }

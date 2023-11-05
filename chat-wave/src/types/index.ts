interface MessageProps {
  message: string;
  issuer: string;
  messageTime: string;
}

interface ParticipantProps {
  socket: string;
}

interface ParticipantsProps {
  participants: ParticipantProps[];
}

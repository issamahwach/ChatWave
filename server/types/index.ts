export interface SocketProps {
  id: string;
  emit(event: string, data: any): void;
  on(event: string, callback: (data: any) => void): void;
  disconnect(): void;
  join(data: string): void;
  handshake?: any;
  recovered?: boolean;
}

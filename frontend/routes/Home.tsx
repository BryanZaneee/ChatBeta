import Chat from '@/frontend/components/Chat';
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  return <Chat threadId={uuidv4()} initialMessages={[]} />;
}

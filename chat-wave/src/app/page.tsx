import CreateChat from "./components/CreateChat";
import JoinChat from "./components/JoinChat";

export default function Home() {
  return (
    <div className="h-screen bg-gray-100 flex flex-col justify-center items-center">
      <CreateChat />
      <JoinChat />
    </div>
  );
}

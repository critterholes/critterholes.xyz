
import { useFarcasterAccount } from "./useFarcasterAccount";

export default function Account() {
  const { data: account } = useFarcasterAccount();

  if (!account) return null;

  return (
    <div className="absolute top-5 left-5 flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-3xl z-50">
      <img 
        src={account.pfpUrl} 
        alt="User Avatar" 
        className="w-6 h-6 rounded-full border border-white" 
      />
      <span className="text-white text-sm font-medium">@{account.username}</span>
    </div>
  );
}

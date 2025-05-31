"use client";

import MembersList from "@/components/dashboard/members-list";
import { useMembers } from "@/hooks/use-members";
import { useTeam } from "@/hooks/use-team";
import { Copy } from "lucide-react";
import { useState } from "react";

const Page = () => {
  const [copied, setCopied] = useState(false);
  const { data: team, isLoading, error } = useTeam();
  const teamId = team?.data?.team?.id;
  const { data: members } = useMembers(teamId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const handleCopy = () => {
    navigator.clipboard.writeText(team.data.team.invite_link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <div>
      {team && members && (
        <div className="flex flex-col-reverse gap-6 md:flex-row">
          <MembersList members={members} ownerId={team.data.team.owner_id} />
          <div className="w-full h-40 bg-gray-100 rounded-xl p-4 shadow-md">
            <div className="text-lg text-gray-600 mb-5">
              Invite members to your team via invite code
            </div>
            <div className="flex justify-between items-center text-lg font-mono font-semibold text-blue-700 bg-white px-3 py-2 rounded-lg border border-blue-300 select-all cursor-pointer">
              {copied ? "Copied!" : team.data.team.invite_link}
              <Copy onClick={handleCopy} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;

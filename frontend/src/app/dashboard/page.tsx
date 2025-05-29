"use client";

import MembersList from "@/components/dashboard/members-list";
import { useTeam } from "@/hooks/use-team";

const Page = () => {
  const { data: team } = useTeam();
  console.log(team.data.team);
  return (
    <div>
      {team && (
        <MembersList
          members={team.data.team.members}
          ownerId={team.data.team.owner_id}
        />
      )}
    </div>
  );
};

export default Page;

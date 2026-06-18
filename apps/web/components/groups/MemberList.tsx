"use client";

import RemoveMemberButton from "./RemoveMemberButton";

interface Member {
  id: string;

  user: {
    id: string;
    name: string;
    email: string;
  };
}

interface Props {
  members: Member[];
  groupId: string;
  onRefresh: () => void;
}

export default function MemberList({
  members,
  groupId,
  onRefresh,
}: Props) {
  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-3xl font-bold">
          👥 Members
        </h2>

        <span className="bg-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
          {members.length} Member{members.length !== 1 ? "s" : ""}
        </span>

      </div>

      {members.length === 0 ? (

        <div className="py-12 text-center text-slate-400">

          No members found.

        </div>

      ) : (

        <div className="space-y-4">

          {members.map((member, index) => (

            <div
              key={member.id}
              className="flex justify-between items-center bg-slate-800 rounded-2xl p-5 hover:bg-slate-700 transition-all"
            >

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-lg">

                  {member.user.name?.charAt(0).toUpperCase() || "U"}

                </div>

                <div>

                  <h3 className="text-xl font-semibold">

                    {member.user.name}

                  </h3>

                  <p className="text-slate-400">

                    {member.user.email}

                  </p>

                </div>

              </div>

              {index === 0 ? (

                <span className="bg-yellow-500 text-black px-3 py-2 rounded-xl font-semibold">

                  👑 Admin

                </span>

              ) : (

                <RemoveMemberButton
                  groupId={groupId}
                  userId={member.user.id}
                  onSuccess={onRefresh}
                />

              )}

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

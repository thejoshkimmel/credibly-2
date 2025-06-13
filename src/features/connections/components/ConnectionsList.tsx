import React from 'react';
import Image from 'next/image';
import { Connection, User } from '@/types';

interface ConnectionsListProps {
  connections: Connection[];
  users: Record<string, User>;
  onAccept?: (connectionId: string) => void;
  onReject?: (connectionId: string) => void;
}

export function ConnectionsList({
  connections,
  users,
  onAccept,
  onReject
}: ConnectionsListProps) {
  return (
    <ul className="space-y-4">
      {connections.map((connection) => {
        const user = users[connection.connectedUserId];
        if (!user) return null;

        return (
          <li
            key={connection.id}
            className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <div className="relative w-12 h-12">
                {user.profilePic ? (
                  <Image
                    src={user.profilePic}
                    alt={user.name}
                    fill
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-lg text-gray-500">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900">{user.name}</h3>
                <p className="text-sm text-gray-500">
                  {connection.status.charAt(0).toUpperCase() + connection.status.slice(1)}
                </p>
              </div>
            </div>

            {connection.status === 'pending' && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onAccept?.(connection.id)}
                  className="px-3 py-1 text-sm text-green-600 hover:text-green-700"
                >
                  Accept
                </button>
                <button
                  onClick={() => onReject?.(connection.id)}
                  className="px-3 py-1 text-sm text-red-600 hover:text-red-700"
                >
                  Reject
                </button>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
} 
"use client"

import Laboratory from "~/types/laboratory"

export default async function LabInfo({
  labName,
  labDescription,
  labDuration,
  labQueueLimit,
  labCreatedAt,
  labOwnerId,
}: Laboratory) {
  return (
    <h1>Laboratório: {labName}</h1>
  );
}

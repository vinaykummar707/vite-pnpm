"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { gql, useQuery, useSubscription } from "@apollo/client";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useOrganizationStore,
  type Organization,
} from "@/store/useOrganizationStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { GET_ALL_ORGANIZATIONS } from "@/gql/organizations.gql";

export function OrganizationSelect() {
  const { selectedOrganization, setSelectedOrganization } =
    useOrganizationStore();

  const { data, loading, error } = useSubscription(GET_ALL_ORGANIZATIONS);

  const organizations: Organization[] = data?.organizations || [];

  const handleChange = (id: string) => {
    const org = organizations.find((o) => o.id === id);
    if (org) setSelectedOrganization(org);
  };

  if (loading) return <Skeleton className="w-full h-10 rounded-md" />;

  if (error) {
    return (
      <div className="w-full p-2 text-sm text-red-500 border border-red-200 rounded-md">
        Error loading organizations: {error.message}
      </div>
    );
  }

  return (
    <div className="w-full space-y-2">
      <Select
        onValueChange={handleChange}
        value={selectedOrganization?.id ?? ""}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choose an organization" />
        </SelectTrigger>
        <SelectContent>
          {organizations.map((org) => (
            <SelectItem key={org.id} value={org.id}>
              {/* Display logo if present. Adjust style as needed. */}
              {org.logo && (
                <Avatar className="size-6">
                  <AvatarImage src={org.logo} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              )}
              {org.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {organizations.length === 0 && !loading && (
        <p className="text-sm text-muted-foreground">No organizations found</p>
      )}
    </div>
  );
}

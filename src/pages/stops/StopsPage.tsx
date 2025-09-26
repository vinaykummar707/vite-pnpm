import React from "react";
import { AddStopsDialog } from "./AddStopDialog";
import { useQuery, useSubscription } from "@apollo/client";
import { GET_ALL_STOPS } from "@/gql/stops.gql";

const StopsPage: React.FC = () => {
  const { data, loading, error } = useQuery(GET_ALL_STOPS);

  if (loading) return <div>Loading stops...</div>;
  if (error) return <div>Error loading stops: {error.message}</div>;
  return (
    <div className="flex h-full w-full flex-col items-start gap-4 bg-default-background px-12 py-12">
      <span className="text-heading-2 font-heading-2 text-default-font">
        Stops
      </span>

      {
        
      }
    </div>
  );
};

export default StopsPage;

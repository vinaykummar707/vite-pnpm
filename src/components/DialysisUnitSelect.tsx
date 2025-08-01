'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { gql, useSubscription, useQuery } from '@apollo/client';
import { Skeleton } from '@/components/ui/skeleton';
import { useDialysisUnitStore } from '@/store/useDialysisUnitStore';
import { useEffect, useState } from 'react';

const GET_DIALYSIS_UNITS = gql`
  subscription GetDialysisUnits {
    dialysis_units(order_by: { name: asc }) {
      id
      name
      location
    }
  }
`;

const GET_DIALYSIS_UNITS_QUERY = gql`
  query GetDialysisUnitsQuery {
    dialysis_units(order_by: { name: asc }) {
      id
      name
      location
    }
  }
`;

export function DialysisUnitSelect() {
  const [useQueryFallback, setUseQueryFallback] = useState(false);
  const { data: subData, loading: subLoading, error: subError } = useSubscription(GET_DIALYSIS_UNITS);
  const { data: queryData, loading: queryLoading, error: queryError } = useQuery(GET_DIALYSIS_UNITS_QUERY, {
    skip: !useQueryFallback,
  });
  
  const { selectedUnit, setSelectedUnit } = useDialysisUnitStore();

  // Use subscription data by default, fallback to query if subscription fails
  const data = useQueryFallback ? queryData : subData;
  const loading = useQueryFallback ? queryLoading : subLoading;
  const error = useQueryFallback ? queryError : subError;

  // Debug logging
  useEffect(() => {
    console.log('DialysisUnitSelect - Subscription Data:', subData);
    console.log('DialysisUnitSelect - Subscription Loading:', subLoading);
    console.log('DialysisUnitSelect - Subscription Error:', subError);
    console.log('DialysisUnitSelect - Using Query Fallback:', useQueryFallback);
  }, [subData, subLoading, subError, useQueryFallback]);

  // Fallback to query if subscription fails
  useEffect(() => {
    if (subError && !useQueryFallback) {
      console.log('Subscription failed, falling back to query');
      setUseQueryFallback(true);
    }
  }, [subError, useQueryFallback]);

  const handleChange = (id: string) => {
    const units = data?.dialysis_units || [];
    const unit = units.find((u: any) => u.id === id);
    if (unit) setSelectedUnit(unit);
  };

  if (loading) return <Skeleton className="w-full h-10 rounded-md" />;

  if (error) {
    console.error('Data loading error:', error);
    return (
      <div className="w-full p-2 text-sm text-red-500 border border-red-200 rounded-md">
        Error loading dialysis units: {error.message}
        {!useQueryFallback && (
          <button 
            onClick={() => setUseQueryFallback(true)}
            className="ml-2 underline"
          >
            Try query instead
          </button>
        )}
      </div>
    );
  }

  const units = data?.dialysis_units || [];

  return (
    <div className="w-full space-y-2">
      <Select
        onValueChange={handleChange}
        value={selectedUnit?.id ?? ''}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choose a dialysis unit" />
        </SelectTrigger>
        <SelectContent>
          {units.map((unit: any) => (
            <SelectItem key={unit.id} value={unit.id}>
              {unit.name} – {unit.location}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {units.length === 0 && !loading && (
        <p className="text-sm text-muted-foreground">No dialysis units found</p>
      )}
      {useQueryFallback && (
        <p className="text-xs text-muted-foreground">Using query fallback (subscription unavailable)</p>
      )}
    </div>
  );
}

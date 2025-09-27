import {useQuery} from "@apollo/client";
import {GET_STOP_AUDIOS_BY_STOP_ID_AND_CATEGORY} from "@/gql/stop_audios.gql.ts";
import React from "react";
import {languages} from "@/languages.ts";
import {AnnouncementListItem} from "@/ui/components/AnnouncementListItem.tsx";

export  default function CurrentStopAnnouncements({stopId}:{stopId:string}) {
    const { data, loading, error } = useQuery(
        GET_STOP_AUDIOS_BY_STOP_ID_AND_CATEGORY,
        {
            variables: { stop_id: stopId, category:'current' },
        }

    );

    const audios: any[] = React.useMemo(() => {
        if (data?.stop_audios) {
            return data.stop_audios.filter((a: any) => !a.deleted);
        }
        return [];
    }, [data]);

    if (loading) return <div>Loading audios...</div>;
    if (error) return <div>Error loading audios.</div>;
    return <>
        {languages.map((lang) => {
            const audio = audios.find((a) => a.language_code === lang.code);
            return <AnnouncementListItem stopInfo={`${stopId}`} langCode={lang.code} language={lang.label} audio={audio}/>

        })}

    </>

}
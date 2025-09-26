import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { languages } from "../../languages";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useQuery, useSubscription } from "@apollo/client";
import { GET_STOP_AUDIOS_BY_STOP_ID_AND_CATEGORY } from "@/gql/stop_audios.gql";
import React from "react";

type Audio = {
  category: string;
  created_at: string;
  deleted: boolean;
  duration: number;
  file_name: string;
  file_size: number;
  id: string;
  language_code: string;
  stop_id: string;
  text: string;
  url: string;
};
type RegionalAudioAccordionProps = {
  stopId: string;
  category: string;
};

function AudioCard({ audio }: { audio: Audio }) {
  return (
    <div className="border rounded-md p-3 my-3 flex items-center gap-4">
      <div className="flex-1">
        <div className="font-semibold">{audio.file_name}</div>
        <div className="text-xs text-muted-foreground mb-1">{audio.text}</div>
        <div className="flex items-center text-xs gap-4">
          <span>Size: {audio.file_size} bytes</span>
          <span>Duration: {audio.duration}s</span>
        </div>
      </div>
      <audio controls src={audio.url} className="h-7" />
    </div>
  );
}

function RegionalAudioAccordion({
  stopId,
  category,
}: RegionalAudioAccordionProps) {
  const { data, loading, error } = useQuery(
    GET_STOP_AUDIOS_BY_STOP_ID_AND_CATEGORY,
    {
      variables: { stop_id: stopId, category },
    }
  
  );

  const audios: Audio[] = React.useMemo(() => {
    if (data?.stop_audios) {
      return data.stop_audios.filter((a: Audio) => !a.deleted);
    }
    return [];
  }, [data]);

  if (loading) return <div>Loading audios...</div>;
  if (error) return <div>Error loading audios.</div>;

  return (
    <Accordion type="multiple" className="grid grid-cols-1 my-4 gap-4">
      {languages.map((lang) => {
        const audio = audios.find((a) => a.language_code === lang.code);
        return (
          <AccordionItem
            className="border px-4 rounded-lg"
            key={lang.code}
            value={lang.code}
          >
            <AccordionTrigger>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback className="uppercase text-xs">
                    {lang.code}
                  </AvatarFallback>
                </Avatar>
                {lang.label}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {audio ? <AudioCard audio={audio} /> : null}
              <Select>
                <SelectTrigger>Select Option</SelectTrigger>
                <SelectContent>
                  <SelectItem value="upload">Upload Audio File</SelectItem>
                  <SelectItem value="generate">Generate Audio</SelectItem>
                </SelectContent>
              </Select>
              {/* Conditional render area for selected option */}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

export default RegionalAudioAccordion;

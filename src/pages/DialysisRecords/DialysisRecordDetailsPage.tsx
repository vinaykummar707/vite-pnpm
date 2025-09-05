import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GET_DIALYSIS_RECORD_DETAILS_BY_ID } from '@/gql/records/records.gql';
import { useSubscription } from '@apollo/client';
import { ChevronLeft, Weight } from 'lucide-react';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const DialysisRecordDetailsPage: React.FC = () => {
  const { recordId } = useParams<{ recordId: string }>();
  const navigate = useNavigate();

  const { data: record } = useSubscription(GET_DIALYSIS_RECORD_DETAILS_BY_ID, {
    variables: { recordId: recordId },
  })



  useEffect(() => {
    console.log('Record ID:', record?.dialysis_records_by_pk);
  }, [record]);

  return (
    <div className='space-y-4'>
     <Button onClick={() => navigate(-1)} variant={'default'}>
        <ChevronLeft/>
        Back {recordId}
     </Button>

     <Card className='shadow-none'>
        <CardContent className='grid gap-8 grid-cols-4'>

            <div className="flex flex-col    gap-1">
                <div className='flex text-xs text-muted-foreground items-center gap-1.5'>
                    <Weight size={14}/>
                    Pre-Weight
                </div>
                <span className='text-lg font-semibold'>45 KG</span>
            </div>

            <div className="flex flex-col gap-1   ">
                <div className='flex text-xs text-muted-foreground items-center gap-1.5'>
                    <Weight size={14}/>
                    Pre-Weight
                </div>
                <span className='text-lg font-semibold'>45 KG</span>
            </div>

            <div className="flex flex-col gap-1   ">
                <div className='flex text-xs text-muted-foreground items-center gap-1.5'>
                    <Weight size={14}/>
                    Pre-Weight
                </div>
                <span className='text-lg font-semibold'>45 KG</span>
            </div>

            <div className="flex flex-col gap-1 ">
                <div className='flex text-xs text-muted-foreground items-center gap-1.5'>
                    <Weight size={14}/>
                    Pre-Weight
                </div>
                <span className='text-lg font-semibold'>45 KG</span>
            </div>

            <div className="flex flex-col  gap-1">
                <div className='flex text-xs text-muted-foreground items-center gap-1.5'>
                    <Weight size={14}/>
                    Pre-Weight
                </div>
                <span className='text-lg font-semibold'>45 KG</span>
            </div>

            <div className="flex flex-col gap-1 ">
                <div className='flex text-xs text-muted-foreground items-center gap-1.5'>
                    <Weight size={14}/>
                    Pre-Weight
                </div>
                <span className='text-lg font-semibold'>45 KG</span>
            </div>

            <div className="flex flex-col gap-1 ">
                <div className='flex text-xs text-muted-foreground items-center gap-1.5'>
                    <Weight size={14}/>
                    Pre-Weight
                </div>
                <span className='text-lg font-semibold'>45 KG</span>
            </div>

            <div className="flex flex-col gap-1 ">
                <div className='flex text-xs text-muted-foreground items-center gap-1.5'>
                    <Weight size={14}/>
                    Pre-Weight
                </div>
                <span className='text-lg font-semibold'>45 KG</span>
            </div>

           

        </CardContent>
     </Card>

    </div>
  );
};

export default DialysisRecordDetailsPage;

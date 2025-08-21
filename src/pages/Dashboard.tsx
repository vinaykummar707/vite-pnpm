import Stats01 from "@/components/grid";
import  { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/providers/AuthProvider"
import type { User } from "@supabase/supabase-js";
import { OctagonAlert, TriangleAlertIcon } from "lucide-react";


export default function Dashboard() {

    const auth = useAuth();
    const user = auth?.user as User | null;

    if (user) {
      const {
        id,
        email,
        created_at,
        user_metadata: { full_name = '', avatar_url = '' } = {},
      } = user
    
      console.log("User ID:", id)
      console.log("Email:", email)
      console.log("Name:", full_name)
      console.log("Avatar:", avatar_url)
      console.log("c:", created_at)
    }
 
    
    
    return (
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-medium">Dashboard</h2>
       
        <Card className="h-[200px]">

        </Card>
      </div>
    )
  }
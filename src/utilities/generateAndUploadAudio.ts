// utils/generateAndUploadAudio.ts
import { supabase } from "@/lib/supabase";
import { fetchTTS } from "./fetchTTS";

export async function generateAudio(
    text: string,
    lang: string,
    speaker: string
) {
    // 1. Get base64 audio from Sarvam API
    const base64Audio = await fetchTTS(text, lang, speaker);
    console.log(base64Audio)

    // 2. Convert base64 → File
    const audioBlob = base64ToBlob(base64Audio, "audio/wav");
    const fileName = `tts-${Date.now()}.wav`;
    const file = new File([audioBlob], fileName, { type: "audio/wav" });

    console.log(file);


    // 3. Upload to Supabase
    // const { fileUrl, duration, size } = await uploadAudio(file);
    // return { fileUrl, duration, size };
    return file;
}

// Convert base64 → Blob
function base64ToBlob(base64: string, mimeType: string): Blob {
    const byteChars = atob(base64);
    const byteNumbers = new Array(byteChars.length);
    for (let i = 0; i < byteChars.length; i++) {
        byteNumbers[i] = byteChars.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
}

// Upload audio to Supabase
export async function uploadAudio(file: File, audio:any,category:string, stopInfo,lang:String) {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${stopInfo}/${category}/${lang}/${fileName}`;

    // Upload
    const { error: uploadError } = await supabase.storage
        .from("audios")
        .upload(filePath, file);

    if (uploadError) throw uploadError;

    // Get public URL
    const { data } = supabase.storage.from("audios").getPublicUrl(filePath);
    const fileUrl = data.publicUrl;

    // Metadata
    const size = file.size;

//   // Insert into DB
//   const { error: dbError } = await supabase.from("audio_files").insert([
//     {
//       file_name: file.name,
//       file_url: fileUrl,
//       duration,
//       size,
//     },
//   ]);
//   if (dbError) throw dbError;

    return { fileUrl, size };
}


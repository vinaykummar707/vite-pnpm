// utils/fetchTTS.ts
export async function fetchTTS(
    text: string,
    lang: string,
    speaker: string
): Promise<string> {
    const response = await fetch("https://api.sarvam.ai/text-to-speech", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "api-subscription-key": 'sk_ub6tmck1_GssLt4xToCdAjQGEgh3BJQKk', // from .env
        },
        body: JSON.stringify({
            text,
            model: "bulbul:v2",
            speaker,
            target_language_code: lang,
            pace: 0.8
        }),
    });

    if (!response.ok) {
        throw new Error("TTS request failed");
    }

    const data = await response.json();
    console.log(data.audios[0])
    return data.audios[0]; // base64 string
}
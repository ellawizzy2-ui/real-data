
import { GoogleGenAI, Modality } from "@google/genai";
import type { EnhancementType } from '../types';
import { EnhancementType as EnhancementTypeEnum } from '../types';


// This function is a browser-specific utility.
const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result.split(',')[1]);
      } else {
        // Fallback for ArrayBuffer case, though less common with readAsDataURL
        // This part might need adjustment depending on exact file types handled
        const arrayBuffer = reader.result as ArrayBuffer;
        const bytes = new Uint8Array(arrayBuffer);
        let binary = '';
        bytes.forEach((byte) => binary += String.fromCharCode(byte));
        resolve(window.btoa(binary));
      }
    };
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

const getPromptForEnhancement = (type: EnhancementType): string => {
    switch (type) {
        case EnhancementTypeEnum.AUTO:
            return "Perform a general, automatic enhancement on this image. Improve sharpness, reduce noise, correct colors, and enhance overall details to make it look professionally edited, while keeping the result natural.";
        case EnhancementTypeEnum.UPSCALE:
            return "Upscale this image to twice its original resolution. Add plausible details intelligently and ensure the result is sharp and clear without introducing artifacts.";
        case EnhancementTypeEnum.DENOISE:
            return "Remove noise, grain, and artifacts from this image. Prioritize preserving fine details and textures while achieving a clean, smooth result.";
        case EnhancementTypeEnum.DEBLUR:
            return "Deblur this image. Correct for motion blur or out-of-focus issues to make the subject matter sharp and clear.";
        case EnhancementTypeEnum.FACE_RESTORE:
            return "Focus specifically on restoring any faces in this image. Improve clarity, resolution, and detail of facial features. Fix compression artifacts on faces and blend the restored faces seamlessly with the rest of the image.";
        case EnhancementTypeEnum.COLOR_CORRECTION:
            return "Perform color correction on this image. Adjust white balance, improve contrast, and enhance vibrance to make the colors look natural and appealing.";
        default:
            return "Enhance this image.";
    }
}


export const enhanceImage = async (file: File, type: EnhancementType): Promise<string> => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable is not set.");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const imagePart = await fileToGenerativePart(file);
    const textPart = { text: getPromptForEnhancement(type) };

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image-preview',
        contents: {
            parts: [imagePart, textPart],
        },
        config: {
            responseModalities: [Modality.IMAGE, Modality.TEXT],
        },
    });

    for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
            return part.inlineData.data;
        }
    }

    throw new Error("No image was returned from the AI. The model may have refused the request.");
};
